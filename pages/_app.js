import "@/styles/globals.css";

import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <NextNProgress color="#E43F6F" options={{ showSpinner: false }} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
