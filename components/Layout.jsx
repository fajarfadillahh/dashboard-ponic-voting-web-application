// import components
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Layout({ className, children }) {
  return (
    <div className="relative mx-auto flex max-w-[1440px] items-start overflow-hidden">
      <Sidebar />

      <div
        className={`scrollbar-hide relative flex h-screen w-full flex-1 flex-col overflow-y-auto ${className}`}
      >
        <Navbar />

        <main className="min-h-full px-6 pt-[calc(64px+24px)]">{children}</main>

        <Footer />
      </div>
    </div>
  );
}
