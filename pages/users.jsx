import Head from "next/head";
import { Button, IconButton } from "@material-tailwind/react";
import { Plus, Trash, PencilSimple } from "@phosphor-icons/react";

// import components
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Form from "@/components/Form";

export default function Users() {
  const data = [
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

            <div className="overflow-x-scroll scrollbar-hide">
              <table className="w-[1000px] table-auto lg:w-full">
                <thead className="bg-gray-100">
                  <tr className="rounded-t-md">
                    <th className="w-[50px] rounded-tl-md p-4 text-left font-semibold">
                      No.
                    </th>
                    <th className="p-4 text-left font-semibold">Name</th>
                    <th className="p-4 text-left font-semibold">Email</th>
                    <th className="rounded-tr-md p-4 text-left font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td className="w-[50px] p-4 text-left font-semibold">
                          {index + 1}.
                        </td>
                        <td className="p-4 text-left font-semibold">
                          {user.name}
                        </td>
                        <td className="p-4 text-left font-semibold">
                          {user.email}
                        </td>
                        <td className="inline-flex items-center gap-2 p-4 text-left font-semibold">
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
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
