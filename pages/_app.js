import "@/styles/globals.css";

import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#E43F6F" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </>
  );
}
