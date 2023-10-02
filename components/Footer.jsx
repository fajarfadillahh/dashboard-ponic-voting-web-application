import { Typography } from "@material-tailwind/react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100">
      <div className="flex h-16 items-center justify-center">
        <Typography className="font-semibold text-gray-900">
          &copy; Ponic {new Date().getFullYear()} - Develop by{" "}
          <span className="font-extrabold text-pink-500">FGlabs.</span> ❤️
        </Typography>
      </div>
    </footer>
  );
}
