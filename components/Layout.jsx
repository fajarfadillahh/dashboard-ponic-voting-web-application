// import components
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
  return (
    <div className="mx-auto flex h-screen max-w-[1440px] overflow-hidden bg-white">
      <Sidebar />

      <div className={`flex w-full flex-1 flex-col`}>
        <Navbar />

        <main className="h-full overflow-y-auto p-6 scrollbar-hide">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
