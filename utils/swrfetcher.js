import fetcher from "./fetcher";
import Cookies from "js-cookie";

async function swrfetcher(url) {
  const api_token = Cookies.get("api_token");
  try {
    const { data } = await fetcher(url, "GET", null, api_token);
    return data;
  } catch (error) {
    return error;
  }
}

export default swrfetcher;
