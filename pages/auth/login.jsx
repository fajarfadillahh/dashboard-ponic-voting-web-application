import Head from "next/head";
import { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Eye, EyeClosed, IconContext } from "@phosphor-icons/react";

// import components
import Form from "@/components/Form";

import fetcher from "@/utils/fetcher";
import Cookies from "js-cookie";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<Eye />);

  const handleShowPassword = () => {
    if (type === "password") {
      setIcon(<EyeClosed />);
      setType("text");
    } else {
      setIcon(<Eye />);
      setType("password");
    }
  };

  const handleLogin = async () => {
    try {
      const { data } = await fetcher(
        "/login",
        "POST",
        {
          username,
          password,
        },
        null,
      );

      if (data.success) {
        Cookies.set("token", data.data.token, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
        });
        return (window.location.href = "/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Ponic Voting Web Application.</title>
      </Head>

      <main className="mx-auto h-screen max-w-[1440px] overflow-hidden">
        <section className="mx-auto flex h-full w-[calc(100%-3rem)] max-w-[1120px] items-center justify-center">
          <div className="grid w-full max-w-[550px] justify-items-center gap-12">
            <div className="text-center">
              <Typography className="text-[28px] font-extrabold text-gray-900 sm:text-[42px]">
                Welcome Back, Fellas. 😎
              </Typography>
              <Typography className="font-medium text-gray-500">
                Please login first, so you can monitoring everything.
              </Typography>
            </div>

            <div className="grid w-full max-w-[425px]">
              <Form
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="relative mt-3 flex w-full items-center">
                <Form
                  type={type}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute right-6 cursor-pointer rounded-md p-1 text-gray-600 hover:bg-gray-300"
                  onClick={handleShowPassword}
                >
                  <IconContext.Provider
                    value={{
                      size: 16,
                      weight: "bold",
                    }}
                  >
                    {icon}
                  </IconContext.Provider>
                </div>
              </div>
              <Button
                color="pink"
                fullWidth
                className="mt-8 rounded-md text-base capitalize"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
