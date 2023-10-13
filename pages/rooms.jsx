import Head from "next/head";
import {
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { Eye, Trash } from "@phosphor-icons/react";
import { useState } from "react";

// import components
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Form from "@/components/Form";
import Status from "@/components/Status";
import LoadingScreen from "@/components/LoadingScreen";
import RoomsDetailModal from "@/components/rooms/RoomsDetailModal";

import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import swrfetcher from "@/utils/swrfetcher";

export default function Rooms(props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data: rooms, isLoading } = useSWR("/rooms", swrfetcher, {
    fallback: props.rooms,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const TABLE_HEAD = ["No", "Rooms Name", "Owner", "Code", "Status", "Action"];
  const LENGTH = rooms.data.length;

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

            <Card className="overflow-x-scroll rounded-md shadow dark:bg-blue-gray-800">
              <table className="min-w-[950px] table-auto text-left lg:w-full">
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
                  {rooms.data.map((room, index) => {
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
                        <td className="w-[350px] p-4">
                          <Tooltip content={room.name} placement="top">
                            <Typography className="line-clamp-1 font-semibold text-gray-900 dark:text-white">
                              {room.name}
                            </Typography>
                          </Tooltip>
                        </td>
                        <td className="w-[150px] p-4">
                          <Tooltip content={room.owner} placement="top">
                            <Typography className="line-clamp-1 font-semibold text-gray-900 dark:text-white">
                              {room.owner}
                            </Typography>
                          </Tooltip>
                        </td>
                        <td className="w-[150px] p-4">
                          <Typography className="font-semibold text-gray-900 dark:text-white">
                            {room.code}
                          </Typography>
                        </td>
                        <td className="w-[150px] p-4">
                          <Status start={room.start} end={room.end} />
                        </td>
                        <td className="inline-flex items-center gap-2 p-4">
                          <IconButton
                            size="sm"
                            variant="text"
                            className="text-blue-gray-500 dark:text-white"
                            onClick={() => {
                              setOpen(true);
                              setSelected(room);
                            }}
                          >
                            <Eye size={18} weight="bold" />
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

            {open ? (
              <RoomsDetailModal
                open={open}
                handleOpen={() => {
                  setOpen(!open);
                  setSelected(null);
                }}
                room={selected}
              />
            ) : null}
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const api_token = req.cookies.api_token;

  try {
    const { data } = await fetcher("/rooms", "GET", null, api_token);

    return {
      props: {
        rooms: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
