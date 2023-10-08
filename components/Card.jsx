import { Typography } from "@material-tailwind/react";

export default function Card({ widget }) {
  return (
    <div className="flex h-max min-w-[320px] flex-1 justify-center rounded-md border border-gray-100 p-8">
      <div className="w-full max-w-[265px]">
        <Typography className="text-xl font-semibold capitalize text-gray-900">
          {widget.title}
          <span className="text-pink-500">:</span>
        </Typography>

        <div className="text-center">
          <Typography className="-mb-5 text-[82px] font-extrabold text-pink-500">
            {widget.amount}
          </Typography>
          <Typography className="font-semibold text-gray-500">
            {widget.title === "total users"
              ? "Users"
              : widget.title === "total rooms"
              ? "Rooms"
              : "Candidates"}
          </Typography>
        </div>
      </div>
    </div>
  );
}
