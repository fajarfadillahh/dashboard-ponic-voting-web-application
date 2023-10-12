import { List, SealCheck, SignOut } from "@phosphor-icons/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  IconButton,
  Switch,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";

export default function Navbar({ setOpen }) {
  const [client, setClient] = useState(false);
  const { theme, setTheme } = useTheme();

  const fullname = Cookies.get("fullname");
  const email = Cookies.get("email");

  const handleSignOut = () => {
    if (confirm("apakah anda yakin?")) {
      Cookies.remove("token");
      Cookies.remove("fullname");
      Cookies.remove("api_token");
      Cookies.remove("email");
      return (window.location.href = "/auth/login");
    }
  };

  useEffect(() => {
    setClient(true);
  });

  if (!client) {
    return;
  }

  return (
    <nav className="border-b border-gray-100 bg-white px-6">
      <div className="flex h-16 items-center justify-between md:justify-end">
        <IconButton
          size="sm"
          variant="outlined"
          className="text-xl text-gray-900 md:hidden"
          onClick={() => setOpen(true)}
        >
          <List size={20} weight="bold" />
        </IconButton>

        <div className="inline-flex items-center gap-6">
          <Switch
            color="pink"
            className="h-full w-full"
            containerProps={{
              className: "w-11 h-6",
            }}
            circleProps={{
              className: "before:hidden left-0.5 border-none",
            }}
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          />

          <Menu placement="bottom-end" allowHover>
            <MenuHandler>
              <div className="inline-flex cursor-pointer items-center gap-1.5">
                <Typography className="font-semibold capitalize text-gray-900">
                  {fullname}
                </Typography>

                <div className="text-blue-500">
                  <SealCheck size={20} weight="fill" />
                </div>
              </div>
            </MenuHandler>

            <MenuList>
              <MenuItem>
                <Typography className="font-semibold text-gray-900">
                  {fullname}
                </Typography>
                <Typography className="text-sm font-medium text-gray-500">
                  {email}
                </Typography>
              </MenuItem>
              <hr className="my-3" />
              <MenuItem
                className="flex items-center gap-2 text-gray-500"
                onClick={handleSignOut}
              >
                <SignOut size={16} weight="bold" />
                <Typography className="text-sm font-medium">
                  Sign Out
                </Typography>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
