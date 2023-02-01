import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import ConnectWallet from "../utils/ConnectWallet";
import TutorialModal from "../utils/TutorialModal";
import { chainID } from "../chainUtils/constants";
import { ethers } from "ethers";
import { shortenAddress } from "../chainUtils/trauncate";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal, { local } from "web3modal";
import { useNavigate } from "react-router-dom";

export default function NavBar(props) {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [nav, setNav] = useState(false);
  const [modalWallet, setModalWallet] = useState(false);
  const [getInstance, setgetInstance] = useState();

  //web3 functions

  //check for correct chain
  const correctChain = async () => {
    //await ethereum.request({ method: "eth_requestAccounts" });
    const chainId = await props.provider.getNetwork();
    if (chainId.chainId !== chainID) {
      try {
        //switch chain
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: `0x${Number(97).toString(16)}`,
            },
          ],
        });
        return;
      } catch (error) {
        if (error === 4902) {
          //add the token or currency to metamask
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${Number(97).toString(16)}`,
                rpcUrls: [" https://data-seed-prebsc-1-s1.binance.org:8545"],
                chainName: "BSC testnet",
                nativeCurrency: {
                  name: "BSC",
                  symbol: "BNB",
                  decimals: 18,
                },
                blockExplorerUrls: [
                  "https://explorer.binance.org/smart-testnet",
                ],
              },
            ],
          });
          return;
        }
      }
    }
  };

  //connect wallet
  const connect = async (providerarg) => {
    if (window.ethereum) {
      await providerarg?.send("eth_requestAccounts", []);
    }
    //set and get signer
    const signer = await providerarg.getSigner();
    props.setSigner(signer);
    //get and set address
    const address = await signer.getAddress();
    props.setSignerAddress(address);
    //set chain
    props.setChain(await signer.getChainId());
    setModalWallet(false);
    localStorage.setItem("WEB3_CONNECTED", address);
    return;
  };

  //onload with metamask
  const onLoad = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    props.setProvider(provider);
    await connect(new ethers.providers.Web3Provider(window.ethereum));
  };

  //onload without metamask
  const onLoadTwo = async () => {
    const customNetworkOptions = {
      rpcUrl: "https://bsc-dataseed.binance.org/",
      chainId: 56,
    };

    // Example for Polygon/Matic:
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: {
            56: "https://bsc-dataseed.binance.org/",
          }, // required

          network: "binance",
          chainId: 56,
        },
      },
    };

    const web3Modal = new Web3Modal({
      network: "binance",
      cacheProvider: true, // optional
      providerOptions, // required
    });

    const instance = await web3Modal.connect();
    setgetInstance(instance);
    const gettingprovider = await new ethers.providers.Web3Provider(instance);
    props.setProvider(gettingprovider);
    connect(gettingprovider);
    setModalWallet(false);
  };

  const wiki = () => {
    navigate(`/wiki`);
    return;
  };

  /*
      const community = () => {
        window.open = `https://www.theopendao.com/`;
      }
      */
  const handleNavigate = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  //useEffect
  useEffect(() => {
    //console.log("Entered");
    if (props.signerAddress) {
      connect();
    }

    if (!window.ethereum) {
      //use wallet connect
      //onLoadTwo();
    } else {
      onLoad();
    }
  }, [props.signerAddress, props.chain]);

  //on account changed

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", function (accounts) {
      // Time to reload your interface with accounts[0]!
      props.setSignerAddress(accounts[0]);
    });
  }

  if (props.provider) {
    if (!window.ethereum) {
      // Subscribe to accounts change
      getInstance.on("accountsChanged", async (accounts) => {
        props.setSignerAddress(accounts[0]);
      });
    }
  }

  return (
    <div
      className={`flex relative px-20 sm:px-5  sm:justify-start sm:overflow-hidden  sm:items-start justify-evenly text-xl font-fomofont  items-center bg-[#212529] mx-5 sm:mx-2 py-4 rounded-b-2xl ${
        !nav ? "sm:h-[15vw]" : "sm:h-[46vh]"
      }`}
      style={{ transition: "height .5s" }}
    >
      <span
        className="text-white font-sans font-[300]"
        style={{ textShadow: "0 0 2px #690069, 0 0 25px #c0c, 0 0 5px #f0f" }}
      >
        SOS3D
      </span>
      <ul className="flex sm:flex-col sm:mt-16  sm:items-center justify-between items-center ml-16 sm:ml-[-27px] w-full ">
        <li>
          <button
            onClick={() => setModal(true)}
            className="p-2 text-white sm:mb-4 rounded-md text-sm hover:border hover:bg-transparent hover:border-[#f000f0] bg-fomopink"
          >
            Tutorial
          </button>
        </li>
        <li>
          <a>
            <button
              className="text-white sm:mb-4"
              style={{
                textShadow: "0 0 2px #690069, 0 0 25px #c0c, 0 0 5px #f0f",
              }}
              onClick={() => handleNavigate("https://www.theopendao.com/")}
            >
              Community
            </button>
          </a>
        </li>
        <li>
          <a>
            <button
              className="text-white sm:mb-4"
              style={{ textShadow: " 0 0 10px #0078f0, 0 0 10px #0034ca" }}
              onClick={wiki}
            >
              SOS3D Wiki
            </button>
          </a>
        </li>
        <li>
          <p className="text-[#6c757d] text-sm 2xl:hidden sm:block my-4 font-thin">
            {props.signerAddress
              ? "Connected"
              : "You're not connected to SOS3D"}
          </p>
        </li>

        <li>
          <button
            onClick={() => setModalWallet(true)}
            className="border p-2 text-white text-sm rounded-md px-6 hover:bg-fomopink hover:text-black border-[#f000f0]"
          >
            {" "}
            {!props.signerAddress
              ? "Connect"
              : shortenAddress(props.signerAddress)}{" "}
          </button>
        </li>
      </ul>
      {!nav ? (
        <button className="border rounded-md border-[#ffffff1a] p-1">
          {" "}
          <img
            src="/images/icons8-menu-rounded-50.png"
            alt="menu"
            className="2xl:hidden h-6 w-12 sm:block"
            onClick={() => setNav(true)}
          />{" "}
        </button>
      ) : (
        <button
          className="border rounded-md border-[#ffffff1a] p-1"
          onClick={() => setNav(!true)}
        >
          {" "}
          <img
            src="/images/icons8-menu-rounded-50.png"
            alt="menu"
            className="2xl:hidden h-6 w-12 sm:block"
          />
        </button>
      )}

      {modal && <TutorialModal setModal={setModal} />}
      {modalWallet && (
        <ConnectWallet
          provider={props.provider}
          connect={connect}
          onLoadTwo={onLoadTwo}
          modalWallet={modalWallet}
          setModalWallet={setModalWallet}
        />
      )}
    </div>
  );
}
