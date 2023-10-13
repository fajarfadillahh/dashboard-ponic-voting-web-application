import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { BellRinging } from "@phosphor-icons/react";

export default function DeleteModal({ open, handleOpen }) {
  return (
    <Dialog size="xs" open={open} handler={handleOpen}>
      <DialogHeader>
        <Typography variant="h4">Your Attention is Required!</Typography>
      </DialogHeader>
      <DialogBody
        divider
        className="flex flex-col items-center gap-2 py-8 text-center"
      >
        <BellRinging size={48} className="mb-2 text-red-500" />
        <Typography variant="h5" color="red">
          You should read this!
        </Typography>
        <Typography variant="paragraph" className="text-gray-500">
          Data will be permanently deleted and cannot be recovered. Are you sure
          you want to delete this data?
        </Typography>
      </DialogBody>
      <DialogFooter className="flex items-center justify-end gap-2">
        <Button variant="text" color="red" onClick={() => handleOpen(null)}>
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() => handleOpen(null)}
        >
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
