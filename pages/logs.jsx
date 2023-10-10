import Head from "next/head";
import { Card, Typography } from "@material-tailwind/react";

// import components
import Layout from "@/components/Layout";
import Title from "@/components/Title";

export default function Logs() {
  const TABLE_HEAD = ["No", "Name", "Device", "Last Login"];
  const TABLE_DATA = [
    {
      name: "Fajar Fadillah Agustian",
      device: "Windows",
      last_login: "Today",
    },
    {
      name: "Gufronnaka Arif Wildan",
      device: "Windows",
      last_login: "5 days ago",
    },
  ];

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
                {TABLE_DATA.map((user, index) => {
                  return (
                    <tr key={index} className="even:bg-gray-50">
                      <td className="w-[50px] p-4">
                        <Typography className="font-semibold text-gray-900">
                          {index + 1}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography className="font-semibold text-gray-900">
                          {user.name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography className="font-semibold text-gray-900">
                          {user.device}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography className="font-semibold text-gray-900">
                          {user.last_login}
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
