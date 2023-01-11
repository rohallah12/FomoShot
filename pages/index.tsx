// @ts-nocheck
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useEffect, useRef } from "react";
import { useState } from "react";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";
import { useMoralis } from "react-moralis";
import { useWeb3Contract } from "react-moralis";
import Staking from "../constants/WStaking.json";
import Token from "../constants/WToken.json";
import { setTimeout } from "timers";

export default function Home() {
  const [stakeAmount, setStakeAmount] = useState("0");
  const [emission, setEmission] = useState(ethers.utils.parseEther("0"));
  let [remainingTime, setRemainingTime] = useState(0);
  let [timer, setTimer] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(
    ethers.utils.parseEther("0")
  );
  const [userStaked, setUserStaked] = useState(ethers.utils.parseEther("0"));
  const [totalStaked, setTotalStaked] = useState(ethers.utils.parseEther("0"));
  const [earned, setEarned] = useState(ethers.utils.parseEther("0"));
  const [approved, setApproved] = useState("false");
  const dispatch = useNotification();
  const { isWeb3Enabled, account } = useMoralis();

  const { runContractFunction: updateTotalStaked } = useWeb3Contract({
    abi: Staking.abi,
    contractAddress: Staking.address,
    functionName: "totalStaked",
    params: {},
  });

  const { runContractFunction: updateUserStaked } = useWeb3Contract({
    abi: Staking.abi,
    contractAddress: Staking.address,
    functionName: "getTotalStaked",
    params: { staker: account },
  });

  const { runContractFunction: getRemainingTime } = useWeb3Contract({
    abi: Staking.abi,
    contractAddress: Staking.address,
    functionName: "nextRewardIn",
    params: { staker: account },
  });

  const { runContractFunction: getAvailableSpace } = useWeb3Contract({
    abi: Token.abi,
    contractAddress: Token.address,
    functionName: "balanceOf",
    params: { account: account },
  });

  const { runContractFunction: getRewards } = useWeb3Contract({
    abi: Staking.abi,
    contractAddress: Staking.address,
    functionName: "getRewards",
    params: { staker: account },
  });

  const { runContractFunction: stake } = useWeb3Contract({
    abi: Staking.abi,
    contractAddress: Staking.address,
    functionName: "stake",
    params: {
      amount: ethers.utils.parseEther(stakeAmount ? stakeAmount : "0"),
    },
  });

  const { runContractFunction: unstake } = useWeb3Contract({
    abi: Staking.abi,
    contractAddress: Staking.address,
    functionName: "unstake",
    params: {
      amount: ethers.utils.parseEther(stakeAmount ? stakeAmount : "0"),
    },
  });

  const { runContractFunction: approve } = useWeb3Contract({
    abi: Token.abi,
    contractAddress: Token.address,
    functionName: "approve",
    params: {
      spender: Staking.address,
      amount: ethers.constants.MaxUint256,
    },
  });

  const { runContractFunction: allowance } = useWeb3Contract({
    abi: Token.abi,
    contractAddress: Token.address,
    functionName: "allowance",
    params: {
      owner: account,
      spender: Staking.address,
    },
  });

  const { runContractFunction: getEmission } = useWeb3Contract({
    abi: Staking.abi,
    contractAddress: Staking.address,
    functionName: "tokensPerDay",
    params: {},
  });

  const updateUI = () => {
    updateTotalStaked().then((r) => {
      if (r) {
        setTotalStaked(r);
      }
    });
    if (account) {
      getAvailableSpace().then((r) => {
        if (r) {
          console.log("balance : " + r.toString());
          console.log(account);
          console.log(Token.address);
          setTokenBalance(r);
        }
      });
      getRewards().then((r) => {
        if (r) {
          setEarned(r);
        }
      });
      getEmission().then((r) => {
        if (r) {
          setEmission(r);
        }
      });
      updateUserStaked().then((r) => {
        if (r) {
          console.log("staked : " + r.toString());
          setUserStaked(r);
        }
      });
      allowance().then((r) => {
        if (r.eq(ethers.constants.MaxUint256)) {
          setApproved(true);
          localStorage.setItem("approved" + account, "true");
        } else {
          setApproved(false);
        }
      });
      setApproved(localStorage.getItem("approved" + account));
    }
  };

  const action_submited = (e) => {
    e.preventDefault();
    if (e.target.id == "Stake") {
      if (stakeAmount == "0") {
        return dispatch({
          type: "warning",
          message: "Please input staking amount!",
          title: "Stake",
          position: "topR",
        });
      }
      stake({
        onError: (error) => console.log(error),
        onSuccess: handleStakeSuccess,
      });
    } else if (e.target.id == "Unstake") {
      unstake({
        onError: (error) => {
          setStakeAmount("0");
        },
        onSuccess: handleUnstakeSuccess,
      });
    }
  };

  const approveStaking = (e) => {
    e.preventDefault();
    approve({
      onError: (error) => console.log(error),
      onSuccess: handleApproveSuccess,
    });
  };

  const handleApproveSuccess = async (tx) => {
    await tx.wait(1);
    dispatch({
      type: "success",
      message: "Approved Staking Contract!",
      title: "Approval",
      position: "topR",
    });
    localStorage.setItem("approved" + account, "true");
    setApproved(true);
  };

  const handleStakeSuccess = async (tx) => {
    await tx.wait(1);
    dispatch({
      type: "success",
      message: "Successfuly Staked!",
      title: "Staking",
      position: "topR",
    });
    updateUI();
    setStakeAmount("0");
  };

  const handleUnstakeSuccess = async (tx) => {
    await tx.wait(1);
    dispatch({
      type: "success",
      message: "Successfuly Unstaked!",
      title: "Unstaking",
      position: "topR",
    });
    updateUI();
    setStakeAmount("0");
  };

  function secondsToDate(time) {
    console.log(time);
    if (time == 0) {
      return "---";
    }
    let t = parseInt(time);
    let days = Math.floor(t / 86400);
    t = t - days * 86400;
    let hours = Math.floor(t / 3600);
    t = t - hours * 3600;
    let minutes = Math.floor(t / 60);
    t = t - minutes * 60;
    let seconds = t;
    let times = [days, hours, minutes, seconds];
    let times_name = ["D", "H", "M", "S"];
    let finalStr = "";
    for (let i = 0; i < times.length; i++) {
      if (times[i] != 0) {
        finalStr +=
          times[i] + " " + times_name[i] + (i == times.length - 1 ? "" : ", ");
      }
    }
    return finalStr;
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled, account]);

  return (
    <>
      <div className="mx-auto mt-5 glassmorphic max-w-2xl p-6 rounded-lg">
        <section aria-labelledby="stake-form">
          <div className="bg-white p-2 sm:p-5 shadow rounded-lg min-h-[70vh] flex flex-col">
            <div className="flex items-end flex-wrap gap-3 justify-between px-4 py-5 sm:px-6 max-w-xl mx-auto">
              <span>
                <h2
                  id="applicant-information-title"
                  className="text-3xl text-black font-bold leading-6 "
                >
                  Stake to earn
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-600">
                  Buy native token and proceed to stake
                </p>
              </span>
              <span className="ring-2 ring-white/50 px-4 py-2 rounded-full">
                <p className="mt-1 max-w-2xl text-sm text-white/50">
                  1 nQNT = <span className="text-white/75">3.3334 QNT</span>
                </p>
              </span>
            </div>
            <div className="px-4 py-5 sm:px-6 max-w-xl mx-auto flex flex-col flex-grow">
              <form
                className="space-y-6"
                action="#"
                method="POST"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div>
                  <label
                    htmlFor="stake_amount"
                    className="flex justify-between items-center text-sm font-medium text-gray-600"
                  >
                    <span>Stake/Unstake Amount:</span>
                    <span>
                      Balance:{" "}
                      <span className="text-gray-600 font-bold">
                        {ethers.utils.formatEther(tokenBalance)}
                      </span>
                    </span>
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="stake_amount"
                      name="stake_amount"
                      type="mumber"
                      autoComplete="stake_amount"
                      required
                      placeholder={"0.00"}
                      onChange={(e) => {
                        setStakeAmount(e.target.value);
                      }}
                      className="block w-full font-bold appearance-none rounded-md border-black border-2 bg-gray-100 px-5 pt-2 pb-4 placeholder-gray-500 text-black shadow-sm focus:border-black focus:outline-none focus:ring-black text-2xl sm:text-3xl md:text-5xl"
                    />
                  </div>
                </div>

                {/* <div className="flex flex-col p-4 rounded-md gap-3  justify-between bg-black shadow-xl">
                  <span className=" max-w-2xl text-sm text-white/50 p-2 rounded-sm ring-1 ring-gray-700">
                    option 1 - No lock up : 10% APY
                  </span>
                  <span className=" max-w-2xl text-sm text-white/50 p-2 rounded-sm ring-1 ring-gray-700">
                    option 2 - 7 days : 30% APY
                  </span>
                  <span className=" max-w-2xl text-sm text-white/50 p-2 rounded-sm ring-1 ring-gray-700">
                    option 3 - 30 days : 100% APY
                  </span>
                </div> */}
                <div className="flex flex-col gap-y-2">
                  <span
                    type="Stake"
                    id="Stake"
                    className="flex w-full justify-start rounded-md text-lg font-bold text-black bg-white"
                  >
                    Total staked:{" "}
                    <small className="ml-2 text-neutral-500">
                      {ethers.utils.formatEther(totalStaked)} $W
                    </small>
                  </span>
                  <span
                    type="Stake"
                    id="Stake"
                    className="flex w-full justify-start rounded-md mb-2 text-lg font-bold text-black bg-white"
                  >
                    Emission per day:
                    <small className="ml-2 text-neutral-500">
                      {ethers.utils.formatEther(emission)} tokens
                    </small>
                  </span>
                  {!approved && (
                    <button
                      type="approve"
                      onClick={approveStaking}
                      className="flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 py-6 px-12 text-lg font-bold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 mb-2"
                    >
                      Approve Staking
                    </button>
                  )}
                  <button
                    onClick={action_submited}
                    type="Stake"
                    id="Stake"
                    className="hover:bg-white hover:text-black flex w-full justify-center rounded-md hover:border-[2px] hover:border-black py-6 px-12 text-lg font-bold text-white bg-black shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  >
                    Stake
                  </button>
                  <button
                    onClick={action_submited}
                    type="Unstake"
                    id="Unstake"
                    className="hover:bg-white hover:text-black flex w-full justify-center rounded-md hover:border-[2px] hover:border-black py-6 px-12 text-lg font-bold text-white bg-black shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  >
                    Unstake
                  </button>
                </div>
              </form>
              <div className="flex-grow flex flex-row items-center justify-center h-full p-10 gap-x-4">
                <div className="flex flex-col items-center justify-center border-[1px] border-black p-5 rounded-full bg-black text-white shadow-lg shadow-neutral-800">
                  <b>Your Staked</b>
                  <span className="text-neutral-300">
                    {ethers.utils.formatEther(userStaked)} $W
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center border-[1px] border-black p-5 rounded-full bg-black text-white shadow-lg shadow-neutral-800">
                  <b>Your Rewards</b>
                  <span className="text-neutral-300">
                    {ethers.utils.formatEther(earned)} $W
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
