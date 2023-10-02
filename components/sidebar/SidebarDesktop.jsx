import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Typography } from "@material-tailwind/react";
import {
  HiOutlineViewGrid,
  HiOutlineUser,
  HiOutlineHome,
  HiOutlineClock,
  HiOutlineLogout,
} from "react-icons/hi";

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="hidden h-full w-[300px] flex-col border-r border-gray-100 bg-white md:flex">
      <div className="inline-flex min-h-[64px] items-center justify-center gap-[6px]">
        <Image
          src="/assets/ponic-icon.svg"
          alt="icon"
          width={1000}
          height={1000}
          className="h-8 w-8 rounded-full"
        />
        <Typography className="text-[20px] font-extrabold text-gray-900">
          Ponic.
        </Typography>
      </div>

      <div className="flex flex-1 flex-col justify-between border-t border-gray-100 p-6">
        <div className="flex flex-col gap-[6px]">
          {[
            ["Dashboard", <HiOutlineViewGrid />, "/"],
            ["Users", <HiOutlineUser />, "/users"],
            ["Rooms", <HiOutlineHome />, "/rooms"],
            ["Log", <HiOutlineClock />, "/log"],
          ].map(([text, icon, path], index) => {
            return (
              <Link
                key={index}
                href={path}
                className={`sidebar-active inline-flex h-12 items-center gap-2 rounded-md px-6 text-gray-500 hover:bg-gray-200 ${
                  router.pathname === path
                    ? "active hover:bg-pink-500 hover:text-white"
                    : null
                }`}
              >
                <div className="text-[24px]">{icon}</div>
                <span className="font-semibold">{text}</span>
              </Link>
            );
          })}
        </div>

        <Button
          variant="text"
          color="red"
          className="inline-flex h-12 items-center justify-center gap-2 bg-red-50 hover:bg-red-100"
        >
          <HiOutlineLogout className="text-[24px]" />
          <Typography className="font-semibold capitalize">Sign Out</Typography>
        </Button>
      </div>
    </aside>
  );
}
