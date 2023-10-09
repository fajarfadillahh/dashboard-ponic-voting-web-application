import Head from "next/head";
import {
  Card,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { Trash } from "@phosphor-icons/react";

// import components
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Form from "@/components/Form";

export default function Rooms() {
  const TABLE_HEAD = [
    "No",
    "Rooms Name",
    "Owner",
    "Code",
    "Status",
    "Start",
    "End",
    "Action",
  ];

  const TABLE_DATA = [
    {
      id: Date.now(),
      name: "Pemilihan Ketua RT.05 Kel. Pangkalan Jati Depok Jawa Barat",
      owner: "Fajar Fadillah Agustian",
      code: "KXANCMER",
      status: "completed",
      start: "Selasa 10/10/2023",
      end: "Rabu 11/10/2023",
    },
    {
      id: Date.now(),
      name: "Pemilihan Ketua RT.05 Kel. Pangkalan Jati Depok Jawa Barat",
      owner: "Fajar Fadillah Agustian",
      code: "KXANCMER",
      status: "ongoing",
      start: "Selasa 10/10/2023",
      end: "Rabu 11/10/2023",
    },
    {
      id: Date.now(),
      name: "Pemilihan Ketua RT.05 Kel. Pangkalan Jati Depok Jawa Barat",
      owner: "Fajar Fadillah Agustian",
      code: "KXANCMER",
      status: "pending",
      start: "Selasa 10/10/2023",
      end: "Rabu 11/10/2023",
    },
    {
      id: Date.now(),
      name: "Pemilihan Ketua RT.05 Kel. Pangkalan Jati Depok Jawa Barat",
      owner: "Fajar Fadillah Agustian",
      code: "KXANCMER",
      status: "completed",
      start: "Selasa 10/10/2023",
      end: "Rabu 11/10/2023",
    },
  ];

  return (
    <>
      <Head>
        <title>Rooms - Ponic Voting Web Application.</title>
      </Head>

      <Layout>
        <section className="grid gap-6">
          <Title text="Rooms" />

          <div className="grid gap-4">
            <Form
              type="text"
              placeholder="Search for a rooms..."
              className="w-full lg:max-w-[300px]"
            />

            <Card className="overflow-x-scroll rounded-md shadow">
              <table className="min-w-[1350px] table-auto text-left lg:w-full">
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
                        <td className="w-[350px] p-4">
                          <Tooltip content={user.name} placement="top">
                            <Typography className="line-clamp-1 font-semibold text-gray-900">
                              {user.name}
                            </Typography>
                          </Tooltip>
                        </td>
                        <td className="w-[150px] p-4">
                          <Tooltip content={user.owner} placement="top">
                            <Typography className="line-clamp-1 font-semibold text-gray-900">
                              {user.owner}
                            </Typography>
                          </Tooltip>
                        </td>
                        <td className="w-[150px] p-4">
                          <Typography className="font-semibold text-gray-900">
                            {user.code}
                          </Typography>
                        </td>
                        <td className="w-[150px] p-4">
                          <div className="w-max">
                            <Chip
                              size="sm"
                              variant="ghost"
                              value={user.status}
                              color={
                                user.status === "completed"
                                  ? "green"
                                  : user.status === "ongoing"
                                  ? "gray"
                                  : "amber"
                              }
                            />
                          </div>
                        </td>
                        <td className="w-[200px] p-4">
                          <Tooltip content={user.start} placement="top">
                            <Typography className="line-clamp-1 font-semibold text-gray-900">
                              {user.start}
                            </Typography>
                          </Tooltip>
                        </td>
                        <td className="w-[200px] p-4">
                          <Tooltip content={user.end} placement="top">
                            <Typography className="line-clamp-1 font-semibold text-gray-900">
                              {user.end}
                            </Typography>
                          </Tooltip>
                        </td>
                        <td className="w-[100px] p-4">
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
