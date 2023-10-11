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
  const { data: logs, isLoading } = useSWR(props.url, swrfetcher, {
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

          <Card className="overflow-x-scroll rounded-md shadow lg:scrollbar-hide">
            <table className="w-[1000px] table-auto text-left lg:w-full">
              <thead className="bg-gray-100">
                <tr>
                  {TABLE_HEAD.map((head, index) => {
                    return (
                      <th
                        key={index}
                        className="border-b border-gray-200 bg-gray-100 p-4"
                      >
                        <Typography className="font-bold text-gray-900">
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
                    <tr key={index} className="even:bg-gray-50">
                      <td className="w-[50px] p-4">
                        <Typography className="font-semibold text-gray-900">
                          {LENGTH - index}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography className="font-semibold text-gray-900">
                          {log.log_id}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography className="font-semibold text-gray-900">
                          {log.name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography className="font-semibold text-gray-900">
                          {log.device}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography className="font-semibold text-gray-900">
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
  const url = `http://${req.headers.host}/api/logs`;
  const api_token = req.cookies.api_token;

  try {
    const { data } = await fetcher(url, "GET", null, api_token);

    return {
      props: {
        logs: data,
        url,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
