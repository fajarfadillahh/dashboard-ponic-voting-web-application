import Head from "next/head";
import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import { Plus, Trash, PencilSimple } from "@phosphor-icons/react";

// import components
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Form from "@/components/Form";
import LoadingScreen from "@/components/LoadingScreen";

import useSWR from "swr";
import swrfetcher from "@/utils/swrfetcher";
import fetcher from "@/utils/fetcher";
import { convertTimeCreatedAt } from "@/utils/converttime";

export default function Users(props) {
  const { data: users, isLoading } = useSWR("/users", swrfetcher, {
    fallback: props.users,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const TABLE_HEAD = ["No", "Name", "Email", "Created At", "Action"];
  const LENGTH = users.data.length;

  return (
    <>
      <Head>
        <title>Users - Ponic Voting Web Application.</title>
      </Head>

      <Layout>
        <section className="grid gap-6">
          <Title text="Users" />

          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <Form
                type="text"
                placeholder="Search for a user..."
                className="w-full lg:max-w-[300px]"
              />
              <Button
                color="pink"
                className="inline-flex h-[48px] items-center gap-3 text-base font-semibold normal-case sm:min-w-[143px]"
              >
                <Plus size={18} weight="bold" />
                <span className="hidden sm:block">Add user</span>
              </Button>
            </div>

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
                  {users.data.map((user, index) => {
                    return (
                      <tr
                        key={user.id}
                        className="even:bg-gray-50 dark:odd:bg-blue-gray-700 dark:even:bg-blue-gray-800"
                      >
                        <td className="w-[50px] p-4">
                          <Typography className="font-semibold text-gray-900 dark:text-white">
                            {LENGTH - index}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography className="font-semibold text-gray-900 dark:text-white">
                            {user.fullname}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography className="font-semibold text-gray-900 dark:text-white">
                            {user.email}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography className="font-semibold text-gray-900 dark:text-white">
                            {convertTimeCreatedAt(user.created_at)}
                          </Typography>
                        </td>
                        <td className="inline-flex items-center gap-1 p-4">
                          {/* <IconButton
                            size="sm"
                            variant="text"
                            color="blue-gray"
                          >
                            <PencilSimple size={18} weight="bold" />
                          </IconButton> */}
                          <IconButton size="sm" variant="text" color="red">
                            <Trash size={18} weight="bold" />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const api_token = req.cookies.api_token;

  try {
    const { data } = await fetcher("/users", "GET", null, api_token);

    return {
      props: {
        users: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
