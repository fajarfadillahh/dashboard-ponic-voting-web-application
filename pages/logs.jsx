import Head from "next/head";
import { Card, Typography } from "@material-tailwind/react";

// import components
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import LoadingScreen from "@/components/LoadingScreen";

import fetcher from "@/utils/fetcher";
import swrfetcher from "@/utils/swrfetcher";
import useSWR from "swr";
import { convertTimeLastLogin } from "@/utils/converttime";

export default function Logs(props) {
  const { data: logs, isLoading } = useSWR("/logs", swrfetcher, {
    fallback: props.logs,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }
  const TABLE_HEAD = ["No", "Log Id", "Name", "Device", "Last Login"];
  const LENGTH = logs.data.length;

  return (
    <>
      <Head>
        <title>Login History - Ponic Voting Web Application.</title>
      </Head>

      <Layout>
        <section className="grid gap-6">
          <Title text="Login History" />

          <Card className="overflow-x-scroll rounded-md shadow dark:bg-blue-gray-800 lg:scrollbar-hide">
            <table className="w-[1000px] table-auto text-left lg:w-full">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => {
                    return (
                      <th
                        key={index}
                        className="border-b border-gray-200 bg-gray-100 p-4 dark:border-gray-900 dark:bg-gray-900"
                      >
                        <Typography className="font-bold text-gray-900 dark:text-white">
                          {head}
                        </Typography>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {logs.data.map((log, index) => {
                  return (
                    <tr
                      key={index}
                      className="even:bg-gray-50 dark:odd:bg-blue-gray-700 dark:even:bg-blue-gray-800"
                    >
                      <td className="w-[50px] p-4">
                        <Typography className="font-semibold text-gray-900 dark:text-white">
                          {LENGTH - index}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography className="font-semibold text-gray-900 dark:text-white">
                          {log.log_id}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography className="font-semibold text-gray-900 dark:text-white">
                          {log.name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography className="font-semibold text-gray-900 dark:text-white">
                          {log.device}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography className="font-semibold text-gray-900 dark:text-white">
                          {convertTimeLastLogin(log.created_at)}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const api_token = req.cookies.api_token;

  try {
    const { data } = await fetcher("/logs", "GET", null, api_token);

    return {
      props: {
        logs: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
