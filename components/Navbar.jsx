import { RiLogoutBoxLine, RiUserLine } from "react-icons/ri";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";

export default function Navbar() {
  const handleSignOut = () => {
    alert("Anda berhasil keluar");
  };

  return (
    <nav className="fixed top-0 w-[calc(100%-300px)] max-w-[1140px] border-b border-gray-100 px-6">
      <div className="flex h-16 items-center justify-end">
        <Menu placement="bottom-end" allowHover>
          <MenuHandler>
            <div className="inline-flex cursor-pointer items-center gap-3">
              <Typography className="font-bold capitalize text-gray-900">
                Fajar Fadillah A
              </Typography>

              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-pink-50 text-xl text-pink-500">
                <RiUserLine />
              </div>
            </div>
          </MenuHandler>

          <MenuList>
            <MenuItem>
              <Typography className="font-bold text-gray-900">
                Fajar Fadillah Agustian
              </Typography>
              <Typography className="text-[14px] font-medium text-gray-500">
                fajarfadillah@mail.com
              </Typography>
            </MenuItem>
            <hr className="my-3" />
            <MenuItem
              className="flex items-center gap-2"
              onClick={handleSignOut}
            >
              <RiLogoutBoxLine className="text-[1rem] text-gray-500" />
              <Typography className="text-[14px] font-medium text-gray-500">
                Sign Out
              </Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </nav>
  );
}
