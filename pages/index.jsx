import Head from "next/head";

// import components
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Card from "@/components/Card";

const data = [
  {
    title: "total users",
    amount: 48,
  },
  {
    title: "total rooms",
    amount: 27,
  },
  {
    title: "total candidates",
    amount: 79,
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard - Ponic Voting Web Application.</title>
      </Head>

      <Layout>
        <section className="grid gap-6">
          <Title text="Dashboard" />

          <div className="flex flex-wrap items-center gap-6">
            {data.map((widget, index) => {
              return <Card key={index} widget={widget} />;
            })}
          </div>
        </section>
      </Layout>
    </>
  );
}
