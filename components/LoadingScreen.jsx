import Image from "next/image";
import { Typography, Spinner } from "@material-tailwind/react";

export default function LoadingScreen() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-[9999] bg-white">
      <div className="align-center relative top-[50%] flex translate-y-[-50%] flex-col items-center">
        <div className="flex items-center">
          <Image
            src="/assets/ponic-icon.svg"
            alt="icon"
            width={1000}
            height={1000}
            className="h-8 w-8 rounded-full"
            priority={true}
          />
          <Typography className="ml-1 text-[20px] font-extrabold text-gray-900">
            Ponic Dashboard.
          </Typography>
        </div>
        <Spinner className="h-8 w-8" color="pink" />
      </div>
    </div>
  );
}
