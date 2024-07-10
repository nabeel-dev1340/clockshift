"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LogoutIcon from "@/public/log-out-exit-svgrepo-com.svg";
import FavouritesIcon from "@/public/favourites-filled-star-symbol-svgrepo-com.svg";
import ProfileIcon from "@/public/profile-svgrepo-com.svg";
import ShiftIcon from "@/public/shift-svgrepo-com.svg";
import { signOut } from "next-auth/react";

interface AvatarDropdownProps {
  avatarURL: string;
  name: string;
  email: string;
}

const AvatarDropdown = ({ avatarURL, name, email }: AvatarDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="relative cursor-pointer mr-2" ref={dropdownRef}>
      <Image
        src={avatarURL as string}
        alt="User Avatar"
        width={45}
        height={45}
        className="shadow-md rounded-full object-cover border border-blue-100"
        onClick={toggleDropdown}
      />
      {showDropdown && (
        <div className="flex flex-col gap-1 absolute right-0 top-0 mt-14 mr-2 bg-white shadow-lg rounded-md border border-solid border-transparent p-4 w-[224px]">
          <div className="flex flex-col cursor-default">
            <p>{name}</p>
            <p className="text-sm text-slate-500">{email}</p>
            <hr className="mt-2 mb-2" />
          </div>
          <a
            href="/profile"
            className="flex space-x-2 items-center justify-start hover:bg-gray-200 p-1 rounded"
          >
            <Image src={ProfileIcon} alt="star icon" width={20} height={20} />
            <div className="text-gray-700 text-sm text-left hover:text-gray-900">
              Profile
            </div>
          </a>
          <a
            href="/shift"
            className="flex space-x-2 items-center justify-start hover:bg-gray-200 p-1 rounded"
          >
            <Image src={ShiftIcon} alt="star icon" width={20} height={20} />
            <div className="text-gray-700 text-sm text-left hover:text-gray-900">
              Shift
            </div>
          </a>
          <a
            href="/favourites"
            className="flex space-x-2 items-center justify-start hover:bg-gray-200 p-1 rounded"
          >
            <Image
              src={FavouritesIcon}
              alt="star icon"
              width={20}
              height={20}
            />
            <div className="text-gray-700 text-sm text-left hover:text-gray-900">
              Favourites
            </div>
          </a>
          <div
            className="flex space-x-2 items-center justify-start hover:bg-gray-200 p-1 rounded"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <Image
              src={LogoutIcon}
              alt="sign out icon"
              width={20}
              height={20}
            />
            <span className="text-gray-700 text-sm text-left hover:text-gray-900">
              Sign Out
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
