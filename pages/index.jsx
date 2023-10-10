import Head from "next/head";

// import components
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Card from "@/components/Card";
import LoadingScreen from "@/components/LoadingScreen";

import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import swrfetcher from "@/utils/swrfetcher";

export default function Home(props) {
  const { data: dashboard, isLoading } = useSWR(props.url, swrfetcher, {
    fallback: props.dashboard,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const data = [
    {
      title: "total users",
      amount: dashboard.data.total_users,
    },
    {
      title: "total rooms",
      amount: dashboard.data.total_rooms,
    },
    {
      title: "total candidates",
      amount: dashboard.data.total_candidates,
    },
  ];

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

export async function getServerSideProps({ req }) {
  const url = `http://${req.headers.host}/api/dashboard`;
  const api_token = req.cookies.api_token;

  try {
    const { data } = await fetcher(url, "GET", null, api_token);

    return {
      props: {
        dashboard: data,
        url,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
