import React, { useEffect, useState } from "react";
import Menu from "./component/categories";
import Home from "./component/home/Home";
import NavBar from "./component/nav/NavBar";
import Notify from "./component/utils/Notify";
import WarnNotify from "./component/utils/WarnNotify";
import { ethers } from "ethers";
import BeatLoader from "react-spinners/BeatLoader";
import io from "socket.io-client";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import Wiki from "./component/utils/Wiki";
import Congratulate from "./component/utils/Congratulate";
import {
  balanceABI,
  balanceContract,
  chainID,
  gameABI,
  gameContract,
} from "./component/chainUtils/constants";

function App() {
  /* global BigInt */
  //variables
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  //notification messages
  const [notify, setNotify] = useState(undefined);
  //amount to get
  const [getdata, setGetdata] = useState(0);
  //chain
  const [chain, setChain] = useState(undefined);

  //fomo data info
  const [cbalance, setCBalance] = useState();
  //timeleft
  const [timeleft, SetTimeleft] = useState();
  //user details
  const [playerInfo, setPlayerInfo] = useState();
  //round info
  const [roundInfo, setRoundInfo] = useState();
  //more round info
  //current round
  const [currentRound, setCurrentRound] = useState();
  //current pot
  const [currentPot, setCurrentPot] = useState();

  //playerkeys
  const [playerKeys, setPlayerKeys] = useState();
  //player winning
  const [playerWinnings, setPlayerWinning] = useState();
  //player affiliate earning
  const [affearn, setAffearn] = useState();
  //player affilliate code
  const [affcode, setAffcode] = useState();
  //general vault
  const [gen, setGen] = useState();
  //player name
  const [playerName, setPlayerName] = useState();
  //player round eth
  const [playerRoundEth, setPlayerRoundEth] = useState();
  //selected theme
  const [selectedTheme, setSelectedTheme] = useState(2);
  //notification
  const [notifystate, setNotifystate] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  //refresh timer
  const [callAgain, setCallAgain] = useState(false);
  //warning notification
  const [warnnotify, setWarnNotify] = useState(false);
  const [warnMessage, setWarnMessage] = useState("");
  const [warnType, setWarnType] = useState();
  //player registered
  const [registered, setRegistered] = useState(false);
  //Preloader
  const [loading, setLoading] = useState(false);
  const [congrats, setCongrats] = useState(false);
  const [earnings, setEarnings] = useState(0);

  //socket.io
  const socket = io.connect(`wss://fomo.herokuapp.com`); //127.0.0.1:8000  //fomo.herokuapp.com

  //id for affiliate
  const id = useMatch("/:id");

  //for contract 1
  const getGameContract = async () => {
    const temporalProvider = await new ethers.providers.Web3Provider(
      window.ethereum
    );
    const signertemp = temporalProvider.getSigner();
    return new ethers.Contract(gameContract, gameABI, signertemp);
  };

  //getRoundInfo
  const getRoundInfo = async () => {
    const Contract = await getGameContract();
    const roundInfo = await Contract.getCurrentRoundInfo();
    console.log(roundInfo);

    const fix = parseInt(roundInfo[1]);
    //const fix = (Math.round(roundInfo[1]/10) * 10 ) / 10**18;
    let timeLeft = parseInt(roundInfo[3]);

    SetTimeleft(timeLeft);
    setRoundInfo(fix);
    //setting other datas
    //current pot
    setCurrentPot(((Math.round(roundInfo[5] / 10) * 10) / 10 ** 18).toFixed(4));
    //get total value in contract
    setCBalance(((Math.round(roundInfo[5] / 10) * 10) / 10 ** 18).toFixed(4));
  };

  //getPlayerInfo
  const getPlayerInfo = async () => {
    const Contract = await getGameContract();
    const playerInfo = await Contract.getPlayerInfoByAddress(signerAddress);
    const getPlayerBalaneInfo = await Contract.plyr_(playerInfo[0]);
    let earnings = getPlayerBalaneInfo.win
      .add(getPlayerBalaneInfo.gen)
      .add(getPlayerBalaneInfo.aff);

    earnings = parseInt(ethers.utils.formatEther(earnings).toString()).toFixed(
      3
    );
    setEarnings(earnings);

    console.log(getPlayerBalaneInfo);
    setPlayerInfo(playerInfo);
    //set if registered
    if ((Math.round(playerInfo[0] / 10) * 10) / 10 == 0) {
      setRegistered(false);
    } else {
      setRegistered(true);
    }
    //player keys
    setPlayerKeys(
      ((Math.round(playerInfo[2] / 10) * 10) / 10 ** 18).toFixed(4)
    );
    //winning pot amount
    setPlayerWinning((parseInt(playerInfo[3]) / 1e18).toFixed(4));
    //total sos invested for this round
    setPlayerRoundEth((Math.round(playerInfo[6] / 10) * 10) / 10 ** 18);
    //affiliate vault
    setAffearn((Math.round(playerInfo[5] / 10) * 10) / 10 ** 18);
    //general vault
    setGen((Math.round(playerInfo[4] / 10) * 10) / 10 ** 18);
  };

  //congratulate winner
  const congratulate = async () => {
    const Contract = await getGameContract();
    const winner = await Contract.getRoundWinner(signerAddress);
    const roundInfo = await Contract.getCurrentRoundInfo();
    //call ui to show all those things
    const showedWinner =
      localStorage.getItem(
        "won" + signerAddress + (parseInt(roundInfo[1]) - 1)
      ) != null;
    if (winner && !showedWinner) {
      localStorage.setItem(
        "won" + signerAddress + (parseInt(roundInfo[1]) - 1),
        parseInt(roundInfo[1]) - 1
      );
      setCongrats(true);
    }
  };

  //get
  const clearNotify = () => {
    setNotifystate(false);
    setNotifyMessage("");
  };

  //get affcode
  const setAffiliatecode = async (addr) => {
    const Contract = await getGameContract();
    const getaff = await Contract.pIDxAddr_(addr);
    setAffcode(parseInt(getaff));
  };

  useEffect(() => {
    if (signerAddress) {
      //getBalance();
      //getTime();
      getRoundInfo().then((r) => {
        congratulate();
      });
      getPlayerInfo();

      if (id?.params.id) {
        setAffiliatecode(id.params.id);
      }

      if (warnnotify) {
        setTimeout(() => {
          setWarnNotify();
        }, 5000);
      }

      if (notifystate) {
        setTimeout(() => {
          clearNotify();
        }, 30000);
      }
    }

    //console.log(playerInfo);
  }, [signerAddress, warnnotify, notifystate]);

  //useEffect two
  useEffect(() => {
    if (notifystate) {
      setTimeout(() => {
        clearNotify();
      }, 30000);
    }

    socket.on("response", (data) => {
      setNotifystate(true);
      setNotifyMessage(`${data} Bought and just Got hold of the key`);
    });
  }, [notifystate]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div
              className="h-auto pb-24 bg-cover bg-no-repeat relative"
              style={{
                backgroundImage: "url('/images/uwfomo3dbackground.jpg')",
                backgroundAttachment: "fixed",
              }}
            >
              {loading && (
                <div className="absolute flex flex-col justify-center items-center w-full h-[100%] bg-fomoGrey">
                  <div className="text-[#f000f0] font- text-lg ">
                    Note this will take three calls, Please do not leave page.
                  </div>
                  <BeatLoader
                    color={"#FFFFFF"}
                    loading={loading}
                    size={25}
                    className="abolute top-[33%]"
                  />
                </div>
              )}

              <NavBar
                signer={signer}
                setSigner={setSigner}
                signerAddress={signerAddress}
                setSignerAddress={setSignerAddress}
                provider={provider}
                setProvider={setProvider}
                chain={chain}
                setChain={setChain}
              />
              <Home
                signer={signer}
                setSigner={setSigner}
                signerAddress={signerAddress}
                setSignerAddress={setSignerAddress}
                cbalance={cbalance}
                timeleft={timeleft}
                callAgain={callAgain}
                setCallAgain={setCallAgain}
                roundInfo={roundInfo}
              />
              {warnnotify && (
                <WarnNotify
                  warnMessage={warnMessage}
                  setWarnMessage={setWarnMessage}
                  warnType={warnType}
                  setWarnType={setWarnType}
                />
              )}

              <Menu
                signer={signer}
                earnings={earnings}
                setSigner={setSigner}
                signerAddress={signerAddress}
                setSignerAddress={setSignerAddress}
                roundInfo={roundInfo}
                currentPot={currentPot}
                playerKeys={playerKeys}
                playerWinnings={playerWinnings}
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
                notifystate={notifystate}
                setNotifystate={setNotifystate}
                notifyMessage={notifyMessage}
                setNotifyMessage={setNotifyMessage}
                callAgain={callAgain}
                setCallAgain={setCallAgain}
                timeleft={timeleft}
                SetTimeleft={SetTimeleft}
                affcode={affcode}
                setAffcode={setAffcode}
                playerName={playerName}
                setPlayerName={setPlayerName}
                playerRoundEth={playerRoundEth}
                affearn={affearn}
                setPlayerRoundEth={setPlayerRoundEth}
                gen={gen}
                setWarnType={setWarnType}
                setWarnMessage={setWarnMessage}
                setWarnNotify={setWarnNotify}
                registered={registered}
                loading={loading}
                setLoading={setLoading}
              />

              {notifystate && (
                <Notify
                  notifyMessage={notifyMessage}
                  setNotifyMessage={setNotifyMessage}
                />
              )}

              {congrats && <Congratulate setCongrats={setCongrats} />}
            </div>
          }
        />

        <Route
          path="/:id"
          element={
            <div
              className="h-auto pb-24 bg-cover bg-no-repeat relative"
              style={{
                backgroundImage: "url('/images/uwfomo3dbackground.jpg')",
                backgroundAttachment: "fixed",
              }}
            >
              {loading && (
                <div className="absolute flex flex-col justify-center items-center w-full h-[100%] bg-fomoGrey">
                  <div className="text-[#f000f0] font- text-lg ">
                    Note this will take a bit of time , as this is our security
                    measure against hacks, Please do not leave page.
                  </div>
                  <BeatLoader
                    color={"#FFFFFF"}
                    loading={loading}
                    size={25}
                    className="abolute top-[33%]"
                  />
                </div>
              )}

              <NavBar
                signer={signer}
                setSigner={setSigner}
                signerAddress={signerAddress}
                setSignerAddress={setSignerAddress}
                provider={provider}
                setProvider={setProvider}
                chain={chain}
                setChain={setChain}
              />
              <Home
                signer={signer}
                setSigner={setSigner}
                signerAddress={signerAddress}
                setSignerAddress={setSignerAddress}
                cbalance={cbalance}
                timeleft={timeleft}
                callAgain={callAgain}
                setCallAgain={setCallAgain}
                roundInfo={roundInfo}
              />
              {warnnotify && (
                <WarnNotify
                  warnMessage={warnMessage}
                  setWarnMessage={setWarnMessage}
                  warnType={warnType}
                  setWarnType={setWarnType}
                />
              )}

              <Menu
                signer={signer}
                setSigner={setSigner}
                signerAddress={signerAddress}
                setSignerAddress={setSignerAddress}
                roundInfo={roundInfo}
                earnings={earnings}
                currentPot={currentPot}
                playerKeys={playerKeys}
                playerWinnings={playerWinnings}
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
                notifystate={notifystate}
                setNotifystate={setNotifystate}
                notifyMessage={notifyMessage}
                setNotifyMessage={setNotifyMessage}
                callAgain={callAgain}
                setCallAgain={setCallAgain}
                timeleft={timeleft}
                SetTimeleft={SetTimeleft}
                affcode={affcode}
                setAffcode={setAffcode}
                playerName={playerName}
                setPlayerName={setPlayerName}
                playerRoundEth={playerRoundEth}
                affearn={affearn}
                setPlayerRoundEth={setPlayerRoundEth}
                gen={gen}
                setWarnType={setWarnType}
                setWarnMessage={setWarnMessage}
                setWarnNotify={setWarnNotify}
                registered={registered}
                loading={loading}
                setLoading={setLoading}
              />

              {notifystate && (
                <Notify
                  notifyMessage={notifyMessage}
                  setNotifyMessage={setNotifyMessage}
                />
              )}
            </div>
          }
        />

        <Route path="/wiki" element={<Wiki />} />
      </Routes>
    </>
  );
}

export default App;
