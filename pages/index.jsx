import Head from "next/head";

// import components
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard - Ponic Voting Web Application.</title>
      </Head>

      <Layout>
        <div>Home page</div>
      </Layout>
    </>
  );
}
