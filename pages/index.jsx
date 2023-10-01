import { Button, Typography } from "@material-tailwind/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Typography variant="h6" className="font-extrabold text-gray-900">
        Home page
      </Typography>
      <Button
        size="md"
        color="pink"
        className="text-base font-semibold capitalize"
      >
        Button
      </Button>
    </div>
  );
}
