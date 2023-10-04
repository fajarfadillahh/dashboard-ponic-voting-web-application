import Head from "next/head";

// import components
import Layout from "@/components/Layout";
import Title from "@/components/Title";

export default function Rooms() {
  return (
    <>
      <Head>
        <title>Rooms - Ponic Voting Web Application.</title>
      </Head>

      <Layout>
        <section>
          <Title text="Rooms" />
        </section>
      </Layout>
    </>
  );
}
