"use client";

import useRoutes from "@/app/hooks/useRoutes";
import React, { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";

interface DesktopSidebarProps {
  currentUser: {
    name: string | null;
    id: string;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    hashedPassword: string | null;
    createdAt: Date;
    updatedAt: Date;
    conversationIds: string[];
    seenMessageIds: string[];
  } | null;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const router = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  console.log(currentUser);
  return (
    <>
      <div
        className="
    hidden
    lg:fixed
    lg:inset-y-0
    lg:left-0
    lg:z-40
    lg:w-20
    xl:px-6
    lg:overflow-y-auto
    lg:bg-white
    lg:border-r-[1px]
    lg:pb-4
    lg:flex
    lg:flex-col
    justify-between
  "
      >
        <nav
          className="
      mt-4
      flex
      flex-col
      justify-between
    "
        >
          <ul
            role="list"
            className="
        flex
        flex-col
        items-center
        space-y-1
      "
          >
            {router.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            {currentUser ? <Avatar user={currentUser} /> : <p>Loading...</p>}
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
