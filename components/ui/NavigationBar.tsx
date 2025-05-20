"use client";
import Link from "next/link";
import Image from "next/image";
import Links from "@/data/links.json";
import { IoNotifications } from "react-icons/io5";
import { IoMdPerson, IoMdSettings } from "react-icons/io";
import { HiMenu, HiMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import { Button } from "./button";

export default function NavigationBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { NavbarLinks, AccountLinks } = Links;
  const iconMap: { [key: string]: JSX.Element } = {
    IoMdPerson: <IoMdPerson className="mr-2" />,
    IoSettings: <IoMdSettings className="mr-2" />,
  };

  const handleDropdownClick = () => {
    setShowDropdown((prev) => !prev);
    setIsMenuOpen(false);
  };
  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
    setShowDropdown(false);
  };
  const handleLogout = () => {
    // insert logic for logout here...
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center text-gray-600 px-4 py-2">
        {/* left section */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <div className="p-2">
              <Image
                src="/images/Logo.png"
                alt="Adto Logo"
                width={70}
                height={70}
              />
            </div>
          </Link>

          <div className="hidden md:block">
            {NavbarLinks.map((value, index) => (
              <Link
                key={index}
                href={value.link}
                className="p-2 hover:text-gray-800"
              >
                {value.title}
              </Link>
            ))}
          </div>
        </div>

        {/* right section*/}
        <div className="flex">
          <button className="block md:hidden" onClick={handleMenuClick}>
            {isMenuOpen ? (
              <HiMenuAlt3 size={25} className="hover:text-gray-800" />
            ) : (
              <HiMenu size={25} className="hover:text-gray-800" />
            )}
            {isMenuOpen && (
              <div className="absolute top-full right-2 mt-2 w-48 bg-white border rounded-lg shadow-lg p-5 flex flex-col justify-center z-50">
                <div className="flex flex-col space-y-2">
                  {NavbarLinks.map((value, index) => {
                    return (
                      <div key={index} className="flex items-center">
                        <Link
                          href={`${value.link}`}
                          className="p-2 rounded flex items-center"
                        >
                          {value.title}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </button>
          <button className="p-2 hover:text-gray-800">
            <IoNotifications size={24} />
          </button>
          <button onClick={handleDropdownClick}>
            <Image
              src="/images/Avatar.png"
              alt={"Avatar Photo"}
              width={25}
              height={25}
            />
          </button>
          {showDropdown && (
            <div className="absolute top-full right-2 mt-2 w-48 bg-white border rounded-lg shadow-lg p-5 flex flex-col justify-center z-50">
              <div className="flex flex-col space-y-2">
                {AccountLinks.map((value, index) => {
                  return (
                    <div key={index} className="flex items-center">
                      <Link
                        href={`${value.link}`}
                        className="p-2 rounded flex items-center"
                      >
                        {iconMap[value.icon]}
                        {value.title}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className="border-t mt-2 pt-2">
                <Button
                  variant={"destructive"}
                  className="p-2 rounded w-full text-left"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
