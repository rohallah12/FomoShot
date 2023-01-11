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
import { Fragment, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
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

function Stake() {
  const cryptoBalance = 6048.543;
  const stakeAmountRef = useRef();
  const [stake_amount, SetStakeAmount] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit", stake_amount);
  };
  const [stakeQuivalent_in_USD, setStakeQuivalentInUSD] = useState(0);
  useEffect(() => {
    const equivalent = stake_amount * 530.396;
    setStakeQuivalentInUSD(equivalent);
  }, [stake_amount]);

  const Select = ({ nQNT }) => {
    const [selected, setSelected] = useState(nQNT ? tokens[1] : tokens[0]);
    return (
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <button
              onClick={() => {
                stakeAmountRef.current.value = cryptoBalance;
                SetStakeAmount(cryptoBalance);
              }}
              className="bg-black p-2 text-[10px] text-white text-center rounded-full mr-2"
            >
              MAX
            </button>

            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default border-l border-gray-300 py-2 pl-3 pr-10 text-left shadow-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white sm:text-sm">
                <span className="flex items-center">
                  <Image
                    src={selected.icon}
                    alt="icon"
                    className={`h-6 w-6 flex-shrink-0 rounded-full ${
                      selected.name === "nQNT" && "hue-rotate-180"
                    }`}
                  />
                  <span className="ml-3 block truncate">{selected.name}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {tokens.map((token) => (
                    <Listbox.Option
                      key={token.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-indigo-600" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={token}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <Image
                              src={token.icon}
                              alt="icon"
                              className={classNames(
                                token.name === "nQNT" && "hue-rotate-180",
                                "h-6 w-6 flex-shrink-0 rounded-full"
                              )}
                            />
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block"
                              )}
                            >
                              {token.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    );
  };

  return (
    <>
      <div className="mx-auto mt-5 grid glassmorphic max-w-3xl grid-cols-1 py-6 sm:rounded-lg sm:px-6 lg:max-w-5xl lg:grid-flow-col-dense lg:grid-cols-3">
        <section
          className="space-y-6 lg:col-span-2 lg:col-start-1"
          aria-labelledby="stake-form"
        >
          <div className="bg-white p-2 sm:p-5 shadow sm:rounded-lg min-h-[70vh]">
            <div className="flex items-end flex-wrap gap-3 justify-between px-4 py-5 sm:px-6 max-w-xl mx-auto">
              <span>
                <h2
                  id="applicant-information-title"
                  className="text-3xl font-bold leading-6 "
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
            <div className=" px-4 py-5 sm:px-6 max-w-xl mx-auto">
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
                    <span>You Pay</span>
                    <span>
                      Balance:{" "}
                      <span className="text-gray-600 font-bold">
                        {cryptoBalance}
                      </span>
                    </span>
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute bottom-1 left-0 flex pl-4 text-md">
                      <p className="text-gray-600 truncate">
                        ~${stakeQuivalent_in_USD}
                      </p>
                    </div>

                    <input
                      ref={stakeAmountRef}
                      id="stake_amount"
                      name="stake_amount"
                      type="mumber"
                      autoComplete="stake_amount"
                      required
                      placeholder={"0.00"}
                      onChange={(e) => {
                        SetStakeAmount(e.target.value);
                      }}
                      className="block w-full font-bold appearance-none rounded-md border-black border-2 bg-gray-100 px-5 pt-2 pb-4 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-black text-2xl sm:text-3xl md:text-5xl"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <Select />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    className=" flex-shrink-0 rounded-md  p-2 text-gray-600"
                  >
                    <span className="sr-only">switch</span>
                    <ArrowsUpDownIcon className="h-8 w-8 " aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <label
                    htmlFor="stake_amount"
                    className="flex justify-between items-center text-sm font-medium text-gray-600"
                  >
                    <span>You Earn</span>
                    <span>
                      Balance:{" "}
                      <span className="text-gray-600 font-bold">
                        {cryptoBalance}
                      </span>
                    </span>
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute bottom-1 left-0 flex pl-4 text-md">
                      <p className="text-gray-600 truncate">
                        ~${stakeQuivalent_in_USD * 3.3334}
                      </p>
                    </div>

                    <input
                      ref={stakeAmountRef}
                      id="stake_amount"
                      name="stake_amount"
                      type="mumber"
                      autoComplete="stake_amount"
                      required
                      placeholder="0.00"
                      defaultValue={stake_amount * 3.3334}
                      className="block w-full pointer-events-none font-bold text-gray-600 appearance-none rounded-md px-5 pt-2 pb-4 bg-gray-100 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-black text-2xl sm:text-3xl md:text-5xl"
                    />
                    <div className=" pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                      <Select nQNT={true} />
                    </div>
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

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-black  py-6 px-12 text-lg font-bold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  >
                    Connect wallet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* <section
          aria-labelledby="stake-overview"
          className="lg:col-span-1 lg:col-start-3 h-full"
        >
          <div className="bg-[#0a0a0a] px-4 py-5 shadow sm:rounded-lg sm:px-6 min-h-full">
            <div className="border-b border-white/25  py-5 max-w-xl mx-auto">
              <h2 className="text-2xl uppercase font-bold leading-6 text-white">
                Overview
              </h2>
            </div>
            <div className="flex items-center pt-10 pb-5">
              <div className=" p-3 ring-1 ring-white/25 rounded-lg">
                <Image
                  className="h-7 w-7  rounded-full hue-rotate-180"
                  src={ETH}
                  alt="icon"
                />
              </div>
              <div className="ml-3 text-sm font-normal text-gray-500">
                <p className="text-white">nQNT</p>
                <p className="text-white font-bold">0.000</p>
                <p className="text-white/50 font-thin text-[10px]">
                  ~${stakeQuivalent_in_USD * 3.3334}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start py-5 border-b border-white/25 ">
              <p className="block mb-4 text-white/25 text-sm ">Staked</p>
              <div className="flex items-center ">
                <div className=" p-3 ring-1 ring-white/25 rounded-lg">
                  <Image className="h-7 w-7  rounded-full" src={ETH} alt="" />
                </div>
                <div className="ml-3 text-sm font-normal text-gray-500">
                  <p className="text-white">QNT</p>
                  <p className="text-white font-bold">0.000</p>
                  <p className="text-white/50 font-thin text-[10px]">
                    ~${stakeQuivalent_in_USD * 3.3334}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start pt-5 pb-10 ">
              <p className="block mb-4 text-white/25 text-sm ">Balance</p>
              <div className="flex items-center ">
                <div className=" p-3 ring-1 ring-white/25 rounded-lg">
                  <Image
                    className="h-7 w-7  rounded-full hue-rotate-180"
                    src={ETH}
                    alt="icon"
                  />
                </div>
                <div className="ml-3 text-sm font-normal text-gray-500">
                  <p className="text-white">nQNT</p>
                  <p className="text-white font-bold">0.000</p>
                  <p className="text-white/50 font-thin text-[10px]">
                    ~${stakeQuivalent_in_USD * 3.3334}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col  rounded-md gap-3  justify-between shadow-xl">
              <span className=" flex justify-between items-center max-w-2xl text-sm text-white/50 p-2 rounded-sm ring-1 ring-gray-700">
                <span>Approximate Staking APR</span>
                <span className="text-white font-bold">14.90%</span>
              </span>
              <span className=" flex justify-between items-center max-w-2xl text-sm text-white/50 p-2 rounded-sm ring-1 ring-gray-700">
                <span>Total QNT Locked</span>
                <span className="text-white font-bold">14,536,373.3</span>
              </span>
              <span className=" flex justify-between items-center max-w-2xl text-sm text-white/50 p-2 rounded-sm ring-1 ring-gray-700">
                <span>Staked Protocol Fees</span>
                <span className="text-white font-bold">$1,434,544</span>
              </span>
            </div>
          </div>
        </section> */}
      </div>
    </>
  );
}

export default Stake;
