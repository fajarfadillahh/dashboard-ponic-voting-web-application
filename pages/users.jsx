import Head from "next/head";

// import components
import Layout from "@/components/Layout";
import Title from "@/components/Title";

export default function Users() {
  return (
    <>
      <Head>
        <title>Users - Ponic Voting Web Application.</title>
      </Head>

      <Layout>
        <section>
          <Title text="Users" />
        </section>
      </Layout>
    </>
  );
}
