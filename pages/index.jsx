import Head from "next/head";

// import components
import Layout from "@/components/Layout";
import Title from "@/components/Title";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard - Ponic Voting Web Application.</title>
      </Head>

      <Layout>
        <section>
          <Title text="Dashboard" />
        </section>
      </Layout>
    </>
  );
}
