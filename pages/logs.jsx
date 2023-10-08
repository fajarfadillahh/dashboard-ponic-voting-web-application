import Head from "next/head";

// import components
import Layout from "@/components/Layout";
import Title from "@/components/Title";

export default function Logs() {
  return (
    <>
      <Head>
        <title>Login History - Ponic Voting Web Application.</title>
      </Head>

      <Layout>
        <section>
          <Title text="Login History" />
        </section>
      </Layout>
    </>
  );
}
