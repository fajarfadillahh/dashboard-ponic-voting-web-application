import Head from "next/head";
import {
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { Trash } from "@phosphor-icons/react";

// import components
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Form from "@/components/Form";
import Status from "@/components/Status";
import LoadingScreen from "@/components/LoadingScreen";

import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import swrfetcher from "@/utils/swrfetcher";
import convertime from "@/utils/converttime";

export default function Rooms(props) {
  const { data: rooms, isLoading } = useSWR(props.url, swrfetcher, {
    fallback: props.rooms,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

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
                  {rooms.data.map((room, index) => {
                    return (
                      <tr key={index} className="even:bg-gray-50">
                        <td className="w-[50px] p-4">
                          <Typography className="font-semibold text-gray-900">
                            {index + 1}
                          </Typography>
                        </td>
                        <td className="w-[350px] p-4">
                          <Tooltip content={room.name} placement="top">
                            <Typography className="line-clamp-1 font-semibold text-gray-900">
                              {room.name}
                            </Typography>
                          </Tooltip>
                        </td>
                        <td className="w-[150px] p-4">
                          <Tooltip content={room.owner} placement="top">
                            <Typography className="line-clamp-1 font-semibold text-gray-900">
                              {room.owner}
                            </Typography>
                          </Tooltip>
                        </td>
                        <td className="w-[150px] p-4">
                          <Typography className="font-semibold text-gray-900">
                            {room.code}
                          </Typography>
                        </td>
                        <td className="w-[150px] p-4">
                          <Status start={room.start} end={room.end} />
                        </td>
                        <td className="w-[200px] p-4">
                          <Tooltip
                            content={convertime(room.start)}
                            placement="top"
                          >
                            <Typography className="line-clamp-1 font-semibold text-gray-900">
                              {convertime(room.start)}
                            </Typography>
                          </Tooltip>
                        </td>
                        <td className="w-[200px] p-4">
                          <Tooltip
                            content={convertime(room.end)}
                            placement="top"
                          >
                            <Typography className="line-clamp-1 font-semibold text-gray-900">
                              {convertime(room.end)}
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

export async function getServerSideProps({ req }) {
  const url = `http://${req.headers.host}/api/rooms`;

  try {
    const { data } = await fetcher(
      url,
      "GET",
      null,
      "58792c3d517341d888505bcd757ce211",
    );

    return {
      props: {
        rooms: data,
        url,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
