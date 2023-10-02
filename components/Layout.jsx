import { useState } from "react";

// import components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SidebarDesktop from "@/components/sidebar/SidebarDesktop";
import SidebarMobile from "@/components/sidebar/SidebarMobile";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto flex h-screen max-w-[1440px] overflow-hidden bg-white">
      <SidebarDesktop />
      <SidebarMobile open={open} setOpen={setOpen} />

      <div className={`flex w-full flex-1 flex-col`}>
        <Navbar setOpen={setOpen} />

        <main className="h-full overflow-y-auto p-6 scrollbar-hide">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
