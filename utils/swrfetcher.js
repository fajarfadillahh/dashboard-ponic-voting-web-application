import fetcher from "./fetcher";

async function swrfetcher(url) {
  try {
    const { data } = await fetcher(
      url,
      "GET",
      null,
      "58792c3d517341d888505bcd757ce211",
    );
    return data;
  } catch (error) {
    return error;
  }
}

export default swrfetcher;
