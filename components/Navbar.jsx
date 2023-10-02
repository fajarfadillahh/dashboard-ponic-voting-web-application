import { HiBadgeCheck, HiOutlineLogout } from "react-icons/hi";
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
    <nav className="border-b border-gray-100 bg-white px-6">
      <div className="flex h-16 items-center justify-end">
        <Menu placement="bottom-end" allowHover>
          <MenuHandler>
            <div className="inline-flex cursor-pointer items-center gap-1.5">
              <Typography className="font-semibold capitalize text-gray-900">
                Fajar Fadillah A
              </Typography>

              <div className="text-xl text-blue-500">
                <HiBadgeCheck />
              </div>
            </div>
          </MenuHandler>

          <MenuList>
            <MenuItem>
              <Typography className="font-semibold text-gray-900">
                Fajar Fadillah Agustian
              </Typography>
              <Typography className="text-sm font-medium text-gray-500">
                fajarfadillah@mail.com
              </Typography>
            </MenuItem>
            <hr className="my-3" />
            <MenuItem
              className="flex items-center gap-2 text-gray-500"
              onClick={handleSignOut}
            >
              <HiOutlineLogout className="text-sm" />
              <Typography className="text-sm font-medium">Sign Out</Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </nav>
  );
}
