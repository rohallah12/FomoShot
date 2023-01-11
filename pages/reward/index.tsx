// @ts-nocheck
/*
  This example requires some changes to your config:
  
  
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  
*/
import { Fragment, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import {
  ArrowDownRightIcon,
  ArrowsUpDownIcon,
  BellIcon,
  ChevronRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import BTC from "../../assets/logos/bitcoin-color-icon.svg";
import ETH from "../../assets/logos/ethereum-eth.svg";
import Image from "next/image";

const tokens = [
  {
    id: 1,
    name: "ETH",
    icon: ETH,
  },
  {
    id: 2,
    name: "nQNT",
    icon: ETH,
  },
  {
    id: 3,
    name: "BTC",
    icon: BTC,
  },
  {
    id: 4,
    name: "QNT",
    icon: ETH,
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const cryptoBalance = 6048.543;
  const stakeAmountRef = useRef();
  const [stake_amount, SetStakeAmount] = useState(0);
  const [stakeQuivalent_in_USD, setStakeQuivalentInUSD] = useState(0);
  useEffect(() => {
    const equivalent = stake_amount * 530.396;
    setStakeQuivalentInUSD(equivalent);
  }, [stake_amount]);

  return (
    <div className="max-w-5xl mx-auto mt-5 glassmorphic p-6  rounded-lg ">
      <section
        className="bg-white flex flex-col  gap-10 sm:flex-row justify-between items-start rounded-lg p-4 sm:p-10 "
        aria-labelledby="stake-form"
      >
        <div className="flex flex-col w-full justify-center">
          <div className="flex flex-col gap-10 items-center shadow-md rounded-xl p-8 ">
            <div className="relative">
              <div className=" rounded-full flex items-center justify-center w-60  h-60 ring-4 ring-black ">
                <div className="bg-black flex items-center justify-center border-2 border-spacing-4 border-gray-400 rounded-full w-20 h-20 ">
                  <SparklesIcon className="text-white w-10 h-10" />
                </div>
              </div>
              <span className="bg-white  p-4 text-center w-full absolute -bottom-10 translate-x-0">
                <h1 className="text-gray-600 text-sm">Your rewards</h1>
                <h2 className="text-3xl text-black font-bold">563.233</h2>
              </span>
            </div>

            <div className="flex justify-between bg-gray-200  text-black  p-4 rounded-xl shadow-md  w-full">
              <div>
                <span className="flex gap-2 items-center">
                  <div className="h-2 w-2 bg-black " />
                  <h1 className="font-semibold text-xs ">Available</h1>
                </span>
                <span className="font-bold text-xl inline">233 CRPT</span>
                <p className="text-gray-600 text-sm">$544.343</p>
              </div>

              <div className=" text-end ">
                <div className="flex items-center gap-2 justify-end">
                  <h1 className="font-semibold text-xs">Staked</h1>
                  <div className="h-2 w-2 bg-black " />
                </div>
                <h2 className="font-bold text-xl inline">233 CRPT</h2>
                <p className="text-gray-600 text-sm">$544.343</p>
              </div>
            </div>

            <div className="flex justify-between items-center py-5 px-3 gap-5 w-full text-black">
              <div className="flex  items-center gap-3">
                <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center">
                  <BellIcon className="text-white h-6 w-6" />
                </div>
                <div>
                  <h1 className="font-semibold text-xs">Updates</h1>
                  <h2 className="font-bold text-xs truncate w-24">
                    Nuxt, Premium, Star, Gold
                  </h2>
                </div>
              </div>

              <div className=" flex justify-between gap-2 items-center ">
                <p className="text-gray-600 text-xs inline">6 orders</p>
                <ChevronRightIcon className="w-3 h-3 text-black font-bold" />
              </div>
            </div>
          </div>
          <button className="w-full mt-10 text-center bg-black text-white rounded-lg  py-4 px-12">
            Stake
          </button>
        </div>

        {/* stats */}
        <div className="flex flex-col w-full  text-black">
          <div className="flex flex-col items-start  border-b border-gray-100 pb-14  text-black">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center justify-center h-10 w-10 bg-black rounded-full">
                <BellIcon className="text-white h-8 w-8" />
              </div>
              <span className="gap-3">
                <h1 className="text-5xl font-bold tracking-tight leading-[1rem]">
                  CRPT
                </h1>

                <p className="font-semibold text-black/25 mt-3">Ethereum</p>
              </span>
            </div>
          </div>

          <div className="flex mt-10  justify-between text-black p-4 w-full">
            <div>
              <h3 className="font-bold text-md inline">$152.425</h3>
              <p className="text-gray-600 text-sm">update</p>
            </div>

            <div className=" text-end ">
              <h3 className="font-bold text-md inline">$152.425</h3>
              <p className="text-gray-600 text-sm">update</p>
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-100 rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-center gap-2">
              <div>
                <BellIcon className="text-white h-6 w-6 bg-black  rounded-full ring-4 ring-white" />
              </div>
              <div>
                <h1 className="font-semibold text-xs text-gray-600">
                  Total Balance
                </h1>
                <h2 className="font-bold text-xs">$16,937</h2>
                <p className="text-gray-600 text-xs">1,237</p>
              </div>
            </div>

            <div className="flex justify-between items-center gap-3">
              <button className="text-xs font-bold shadow-md px-4 py-2 rounded-lg bg-white text-black">
                Buy
              </button>
              <button className="text-xs font-bold shadow-md  px-4 py-2 rounded-lg bg-white text-black">
                Receive
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
