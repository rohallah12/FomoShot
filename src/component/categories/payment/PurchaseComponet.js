import { useEffect, useState } from "react";
import { FaKey, FaPiggyBank, FaRegQuestionCircle } from "react-icons/fa";
import GameRuleTutorial from "../../utils/GameRuleTutorial";
import { ethers } from "ethers";
import io from "socket.io-client";
import {
  chainID,
  gameABI,
  gameContract,
  tokenContract,
  ercABI,
} from "../../chainUtils/constants";

const PurchaseComponet = (props) => {
  /* global BigInt */
  const [modal, setModal] = useState(false);
  const [inputValue, setInputValue] = useState(600000);
  const [keystb, setKeystob] = useState(1);
  const [bnbPrice, setBNBPrice] = useState(0);
  const [bnbBought, setBnbBought] = useState(0);
  const [AccountBalance, setAccountbalance] = useState("0");
  const [mainPrice, setMainPrice] = useState(600000);

  //socket.io
  // const socket = io.connect(`wss://fomo.herokuapp.com`); //127.0.0.1:8000  //fomo.herokuapp.com

  const getGameContract = () => {
    const temporalProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signertemp = temporalProvider.getSigner(props.signerAddress);
    return new ethers.Contract(gameContract, gameABI, signertemp);
  };

  const gettokenContract = () => {
    const temporalProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signertemp = temporalProvider.getSigner(props.signerAddress);
    return new ethers.Contract(tokenContract, ercABI, signertemp);
  };

  const addToValue = (value) => {
    let added;
    if (typeof keystb == "string") {
      added = parseInt(keystb) + value;
    } else {
      added = keystb + value;
    }
    setKeystob(added);
    const converted = (added / 1) * bnbPrice;
    setBnbBought(converted);
    setInputValue(converted);
  };

  //get balance
  const getBalance = async () => {
    const tokenContractInstance = await gettokenContract();
    setAccountbalance(
      String(await tokenContractInstance.balanceOf(props.signerAddress))
    );
  };

  const buyKey = async () => {
    //check that user is registered
    if (!props.signerAddress) {
      props.setWarnType("FFCC00");
      props.setWarnMessage("Connect wallet");
      props.setWarnNotify(true);
      return;
    }

    if (parseInt(AccountBalance) < inputValue) {
      props.setWarnType("FFCC00");
      props.setWarnMessage("Insufficient SOS Amount");
      props.setWarnNotify(true);
      return;
    }

    try {
      props.setLoading(true);
      const contractInstance = getGameContract();
      const tokenContractInstance = gettokenContract();
      const fees = ethers.utils.parseEther(String(inputValue));
      const keys = ethers.utils.parseEther(String(keystb));

      const allowance = await tokenContractInstance.allowance(
        props.signerAddress,
        contractInstance.address
      );

      if (!allowance.eq(ethers.constants.MaxUint256)) {
        //approving
        const approve = await tokenContractInstance.approve(
          gameContract,
          ethers.constants.MaxUint256
        );
        await approve.wait(1);
      }

      const payforKey = await contractInstance.transferSOS(fees);
      await payforKey.wait(1);

      if (props.affcode) {
        const buy = await contractInstance.buyXid(props.affcode, fees, keys, {
          gasLimit: 1000000,
          nonce: 105 || undefined,
        });
        await buy.wait();
        // socket.emit("message", props.signerAddress);
      } else {
        const affcode = 100000000000;

        const buy = await contractInstance.buyXid(affcode, fees, keys, {
          gasLimit: 1000000,
          nonce: 105 || undefined,
        });
        await buy.wait();
        // socket.emit("message", props.signerAddress);
      }

      props.setNotifystate(true);
      props.setNotifyMessage(
        `${props.signerAddress} Bought and just Got hold of the key`
      );
      //getTime();

      props.setLoading(false);
    } catch (error) {
      console.log(error);
      props.setWarnType("FFCC00");
      props.setWarnMessage("User canceled Transaction");
      props.setWarnNotify(true);
      props.setLoading(false);
    }
  };

  const getapiatabnb = async () => {
    /*
        const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD");
        var data = await response.json();
        */

    const Contract = await getGameContract();
    const boughtbnb = await Contract.getBuyp();
    const setPrice = ((Math.round(boughtbnb / 10) * 10) / 10 ** 18).toFixed(4);
    setBNBPrice(setPrice);
    setBnbBought(setPrice);
    setMainPrice(setPrice);
  };

  const setValue = (e) => {
    //setInputValue(e.target.value);
    const converted = (e.target.value / 1) * bnbPrice;
    setBnbBought(converted);
    setInputValue(converted);
    setKeystob(e.target.value);
  };

  const changeTeam = (value) => {
    props.setSelectedTheme(value);
  };

  //Buy keys with earned points
  const usevault = async () => {
    if (props.playerWinnings < inputValue) {
      props.setWarnType("FFCC00");
      props.setWarnMessage("Insufficient Vault Amount");
      props.setWarnNotify(true);
      return;
    }

    const Contract = await getGameContract();
    const keys = ethers.utils.parseEther(String(keystb));

    props.setLoading(true);
    try {
      if (props.affcode) {
        const usev = await Contract.reLoadXid(
          props.affcode,
          ethers.utils.parseEther(String(inputValue)),
          keys,
          {
            gasLimit: 10000000,
            nonce: 105 || undefined,
          }
        );
        await usev.wait();
        // socket.emit("message", props.signerAddress);
      } else {
        const affcode = 100000000000;
        const usev = await Contract.reLoadXid(
          affcode,
          ethers.utils.parseEther(String(inputValue)),
          keys,
          {
            gasLimit: 10000000,
            nonce: 105 || undefined,
          }
        );
        await usev.wait();
        // socket.emit("message", props.signerAddress);
      }
      props.setNotifystate(true);
      props.setNotifyMessage(
        `${props.signerAddress} Bought and just Got hold of the key`
      );
      //getTime();
      props.setLoading(false);
    } catch (error) {
      props.setWarnType("FFCC00");
      props.setWarnMessage("User canceled Transaction");
      props.setWarnNotify(true);
      props.setLoading(false);
    }
  };

  useEffect(() => {
    if (props.signerAddress) {
      getapiatabnb();
      getBalance();
    }
  }, [props.signerAddress, props.loading]);

  return (
    <div className="bg-[#212529] font-fomofont w-[46vw] sm:w-full p-4 sm:p-3 rounded-b-2xl rounded-r-2xl">
      <p className="text-base my-1 font-light mb-5 font-fomofont">
        Purchases of 1 key for {mainPrice} SOS{" "}
      </p>

      <div className="flex ">
        <div className="text-[#212529] font-fomofont  rounded-l-md bg-[#e9ecef] border-[#ced4da] border px-3 py-2">
          <FaKey className="text-xl" />{" "}
        </div>
        <input
          className="w-full text-center text-black outline-none"
          value={keystb}
          onChange={(e) => setValue(e)}
          type="number"
        />
        <div
          className="w-full rounded-r-md bg-[#e9ecef] text-[#c6cbd0] pl-4 text-center pt-2"
          disabled
        >
          @ {bnbBought}SOS
        </div>
      </div>

      <div className="flex items-center text-sm font-fomofont font-normal my-3 sm:my-5">
        <button
          className="border border-[#ffc107] w-full   h-16 hover:bg-[#ffc107] rounded-l-md hover:text-black  py-2  border-r-0 text-[#ffc107] sm:text-[1rem]"
          onClick={() => addToValue(1)}
        >
          + 1 Key
        </button>
        <button
          className="border border-[#ffc107] w-full   h-16 hover:bg-[#ffc107] hover:text-black  border-r-0  py-2  text-[#ffc107] sm:text-[1rem]"
          onClick={() => addToValue(2)}
        >
          + 2 Keys
        </button>
        <button
          className="border border-[#ffc107] h-16 hover:bg-[#ffc107] hover:text-black px-11 sm:px-5 py-2 border-r-0 text-[#ffc107] sm:text-[1rem]"
          onClick={() => addToValue(5)}
        >
          + <br />5
        </button>
        <button
          className="border border-[#ffc107] h-16 hover:bg-[#ffc107] hover:text-black px-11 sm:px-5 py-2 border-r-0 text-[#ffc107] sm:text-[1rem]"
          onClick={() => addToValue(10)}
        >
          + <br />
          10
        </button>
        <button
          className="border border-[#ffc107] h-16 hover:bg-[#ffc107] rounded-r-md hover:text-black px-12 sm:px-6 py-2 text-[#ffc107] sm:text-[1rem]"
          onClick={() => addToValue(100)}
        >
          + <br />
          100
        </button>
      </div>
      <div className="flex justify-between text-[1rem] font-fomofont my-5 px-1">
        {!props.signerAddress ? (
          <button
            disabled
            className="flex opacity-50 items-center border  border-[#f000f0] w-full justify-center rounded-xl mr-6  bg-[#f000f0] p-1.5"
          >
            <img
              src="/images/bnbiconhq.png"
              className="h-10 mr-1"
              alt="logo btn"
            />
            Send SOS
          </button>
        ) : (
          <button
            className="flex items-center border  border-fomopink w-full justify-center rounded-xl mr-6  bg-fomopink p-1.5"
            onClick={buyKey}
          >
            <img
              src="/images/bnbiconhq.png"
              className="h-10 mr-1"
              alt="logo btn"
            />
            Send SOS
          </button>
        )}

        {!props.signerAddress ? (
          <button
            disabled
            className="flex opacity-50 items-center border  border-[#f000f0] w-full justify-center rounded-xl  px- p-1.5"
          >
            <FaPiggyBank className="mr-2" />
            Use Vault{" "}
          </button>
        ) : (
          <button
            className="flex  items-center border  border-[#f000f0] w-full justify-center rounded-xl  px- p-1.5 cursor-pointer"
            onClick={usevault}
          >
            <FaPiggyBank className="mr-2" />
            Use Vault
          </button>
        )}
      </div>

      <div className="flex justify-between items-center  mt-10 px-4 sm:px-1">
        {/*  <FaRegQuestionCircle onClick={() => setModal(true)} className="text-3xl text-[#ff0] cursor-pointer" /> */}
      </div>
      {/* 
            <div className="flex items-start justify-between">
              <div className="flex flex-col px-1 py-5 justify-between border-r-2 border-[#696969] items-center" onClick={() => changeTeam(2)}>
                <img src={props.selectedTheme == 2 ? "/images/snakeglow.png" : "/images/snaket.png" } alt="snake" className="h-32"/>
                  <h3 className="text-2xl font-fomofont font-medium my-2">Snake</h3>
                  <p className="text-base text-center  font-light font-fomofont ">Trickle down Divinomics</p>
                  <span className="text-base text-center text-[#32cd32] mt-5 font-light font-fomofont">++ Most dividends</span>
              </div>
              <div className="flex flex-col px-1 py-5 justify-between border-r-2 border-[#696969] items-center" onClick={() => changeTeam(0)}>
                <img src={props.selectedTheme == 0 ? "/images/whaleglow.png" : "/images/whalet.png" } alt="whale" className="h-32"/>
                  <h3 className="text-2xl font-fomofont font-medium my-2">Whale</h3>
                  <p className="text-base text-center  font-light font-fomofont ">Feed on the greed of others.</p>
                  <span className="text-base text-center text-[#32cd32] mt-5 font-light font-fomofont">++ Most eth to <br /> pot</span>
              </div>
              <div className="flex flex-col px-1 py-5 justify-between border-r-2 border-[#696969] items-center" onClick={() => changeTeam(3)}>
                <img src={props.selectedTheme == 3 ? "/images/cowglow.png" : "/images/cowt.png" } alt="bull" className="h-32"/>
                  <h3 className="text-2xl font-fomofont font-medium my-2">Bull</h3>
                  <p className="text-base text-center  font-light font-fomofont ">Break upwards, never stagnate.</p>
                  <span className="text-base text-center text-[#32cd32] mt-5 font-light font-fomofont">+ Balanced distribution</span>
              </div>
              <div className="flex flex-col px-1 py-5 justify-between  items-center" onClick={() => changeTeam(1)}>
                <img src={props.selectedTheme == 1 ? "/images/bearglow.png" : "/images/beart.png" } alt="bear" className="h-32"/>
                  <h3 className="text-2xl font-fomofont font-medium my-2">Bear</h3>
                  <p className="text-base text-center  font-light font-fomofont ">Stand alone, fight alone.</p>
                  <span className="text-base text-center text-[#32cd32] mt-5 font-light font-fomofont">++ Maximize eth to current round</span>
              </div>
            </div>
              */}
      {modal && <GameRuleTutorial setModal={setModal} />}
    </div>
  );
};

export default PurchaseComponet;
