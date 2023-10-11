import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { X } from "@phosphor-icons/react";

import { convertTimeRooms } from "@/utils/converttime";

export default function RoomsDetailModal({ open, handleOpen, room }) {
  return (
    <Dialog
      size="md"
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray">
          Detail Data Rooms
        </Typography>
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleOpen}
        >
          <X size={18} weight="bold" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="grid gap-6 overflow-y-scroll">
        <div className="grid grid-cols-2 gap-4">
          <div className="inline-flex flex-col gap-1.5">
            <Typography variant="small" className="font-semibold text-gray-500">
              Start Voting:
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-900">
              {convertTimeRooms(room.start)}
            </Typography>
          </div>

          <div className="inline-flex flex-col gap-1.5">
            <Typography variant="small" className="font-semibold text-gray-500">
              End Voting:
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-900">
              {convertTimeRooms(room.end)}
            </Typography>
          </div>
        </div>

        <div className="inline-flex flex-col gap-1.5">
          <Typography variant="small" className="font-semibold text-gray-500">
            Candidates:
          </Typography>
          <div className="flex flex-wrap gap-2">
            {room.candidates.map((candidate, index) => {
              return (
                <Typography
                  key={index}
                  variant="h6"
                  className="rounded-md border border-gray-300 px-3 py-2 font-semibold text-gray-900"
                >
                  {candidate.name}
                </Typography>
              );
            })}
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
