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
import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import avatar from "../../assets/logos/ethereum-eth.svg";
import logo from "../../assets/logos/logo2.svg";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ConnectButton } from "web3uikit";

const user = {
  name: "Omimi Dev",
  email: "omimi@example.com",
  imageUrl: avatar,
};
const navigation = [];

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
  { name: "Sign out", href: "/sign-out" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Header() {
  const location = useRouter().pathname;
  return (
    <header className="bg-transparent shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <Popover className="flex h-24 justify-between items-center">
          <div className="flex px-2 lg:px-0 items-center">
            <div className="inline-block flex-shrink-0 items-center">
              <Link href="/" className="font-black text-5xl">
                <Image src={logo} alt="logo" className="w-40 h-full md:w-64 bg-white" />
              </Link>
            </div>
          </div>
          <div className="lg:ml-4 lg:flex lg:items-center">
            <ConnectButton></ConnectButton>
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-4 flex-shrink-0">
              <div>
                <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <a
                          href={item.href}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </Popover>
      </div>
    </header>
  );
}
