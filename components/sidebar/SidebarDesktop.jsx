import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Typography } from "@material-tailwind/react";
import {
  IconContext,
  SquaresFour,
  User,
  House,
  ClockCounterClockwise,
  SignOut,
} from "@phosphor-icons/react";

import Cookies from "js-cookie";

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="hidden h-full w-[300px] flex-col border-r border-gray-100 bg-white dark:border-blue-gray-800 dark:bg-blue-gray-900 md:flex">
      <div className="inline-flex min-h-[64px] items-center justify-center gap-[6px]">
        <Image
          src="/assets/ponic-icon.svg"
          alt="icon"
          width={1000}
          height={1000}
          className="h-8 w-8 rounded-full"
        />
        <Typography className="text-[20px] font-extrabold text-gray-900 dark:text-white">
          Ponic.
        </Typography>
      </div>

      <div className="flex flex-1 flex-col justify-between border-t border-gray-100 p-6 dark:border-blue-gray-800">
        <div className="flex flex-col gap-[6px]">
          {[
            ["Dashboard", <SquaresFour key="icon-1" />, "/"],
            ["Users", <User key="icon-2" />, "/users"],
            ["Rooms", <House key="icon-3" />, "/rooms"],
            ["Logs", <ClockCounterClockwise key="icon-4" />, "/logs"],
          ].map(([text, icon, path], index) => {
            return (
              <Link
                key={index}
                href={path}
                className={`sidebar-active inline-flex h-12 items-center gap-2 rounded-md px-6 text-gray-500 hover:bg-gray-200 dark:hover:bg-blue-gray-800 ${
                  router.pathname === path
                    ? "active hover:bg-pink-500 hover:text-white"
                    : null
                }`}
              >
                <IconContext.Provider
                  value={{
                    size: 24,
                    weight: `${router.pathname === path ? "fill" : "bold"}`,
                  }}
                >
                  {icon}
                </IconContext.Provider>
                <span className="font-semibold">{text}</span>
              </Link>
            );
          })}
        </div>

        <Button
          variant="text"
          className="inline-flex h-12 items-center justify-center gap-2 bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-500 dark:text-white dark:hover:bg-red-400"
          onClick={() => {
            if (confirm("apakah anda yakin?")) {
              Cookies.remove("token");
              Cookies.remove("fullname");
              Cookies.remove("api_token");
              Cookies.remove("email");
              return (window.location.href = "/auth/login");
            }
          }}
        >
          <SignOut size={24} weight="bold" />
          <Typography className="font-semibold capitalize">Sign Out</Typography>
        </Button>
      </div>
    </aside>
  );
}
