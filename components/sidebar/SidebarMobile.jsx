import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Drawer, Typography } from "@material-tailwind/react";
import {
  IconContext,
  SquaresFour,
  User,
  House,
  ClockCounterClockwise,
  SignOut,
} from "@phosphor-icons/react";

export default function SidebarMobile({ open, setOpen }) {
  const router = useRouter();

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <aside className="fixed left-0 top-0 flex h-full w-[300px] flex-col border-r border-gray-100 bg-white md:hidden">
        <div className="inline-flex min-h-[64px] w-full items-center justify-center gap-[6px]">
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
              ["Dashboard", <SquaresFour key="icon-1" />, "/"],
              ["Users", <User key="icon-2" />, "/users"],
              ["Rooms", <House key="icon-3" />, "/rooms"],
              ["Logs", <ClockCounterClockwise key="icon-4" />, "/logs"],
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
            color="red"
            className="inline-flex h-12 items-center justify-center gap-2 bg-red-50 hover:bg-red-100"
          >
            <SignOut size={24} weight="bold" />
            <Typography className="font-semibold capitalize">
              Sign Out
            </Typography>
          </Button>
        </div>
      </aside>
    </Drawer>
  );
}
