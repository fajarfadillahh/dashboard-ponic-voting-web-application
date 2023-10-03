import { List, SealCheck, SignOut } from "@phosphor-icons/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  IconButton,
} from "@material-tailwind/react";

export default function Navbar({ setOpen }) {
  const handleSignOut = () => {
    alert("Anda berhasil keluar");
  };

  return (
    <nav className="border-b border-gray-100 bg-white px-6">
      <div className="flex h-16 items-center justify-between md:justify-end">
        <IconButton
          size="sm"
          color="gray"
          variant="outlined"
          className="text-xl md:hidden"
          onClick={() => setOpen(true)}
        >
          <List size={20} weight="bold" />
        </IconButton>

        <Menu placement="bottom-end" allowHover>
          <MenuHandler>
            <div className="inline-flex cursor-pointer items-center gap-1.5">
              <Typography className="font-semibold capitalize text-gray-900">
                Fajar Fadillah A
              </Typography>

              <div className="text-blue-500">
                <SealCheck size={20} weight="fill" />
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
              <SignOut size={16} weight="bold" />
              <Typography className="text-sm font-medium">Sign Out</Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </nav>
  );
}
