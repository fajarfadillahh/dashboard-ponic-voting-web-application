import Head from "next/head";
import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import { Plus, Trash, PencilSimple } from "@phosphor-icons/react";

// import components
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Form from "@/components/Form";

export default function Users() {
  const TABLE_HEAD = ["No", "Name", "Email", "Action"];

  const TABLE_DATA = [
    {
      id: Date.now(),
      name: "Fajar Fadillah Agustian",
      email: "fajarfadillah@mail.com",
    },
    {
      id: Date.now(),
      name: "Gufronnaka Arif Wildan",
      email: "gufronnaka.arif@mail.com",
    },
    {
      id: Date.now(),
      name: "Ahmad Zulkifli",
      email: "zulkifliahmad@mail.com",
    },
    {
      id: Date.now(),
      name: "Malik Kurniawan",
      email: "malik22184@mail.com",
    },
    {
      id: Date.now(),
      name: "Kemal Pahlevi",
      email: "kemal.pahlevi@mail.com",
    },
  ];

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

            <Card className="overflow-x-scroll rounded-md shadow scrollbar-hide">
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
                            {user.email}
                          </Typography>
                        </td>
                        <td className="inline-flex items-center gap-1 p-4">
                          <IconButton
                            size="sm"
                            variant="text"
                            color="blue-gray"
                          >
                            <PencilSimple size={18} weight="bold" />
                          </IconButton>
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
