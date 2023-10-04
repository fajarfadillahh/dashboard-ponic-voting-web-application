import Head from "next/head";

// import components
import Layout from "@/components/Layout";
import Title from "@/components/Title";

export default function Log() {
  return (
    <>
      <Head>
        <title>Log - Ponic Voting Web Application.</title>
      </Head>

      <Layout>
        <section>
          <Title text="Login History" />
        </section>
      </Layout>
    </>
  );
}
