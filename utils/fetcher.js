import axios from "axios";

async function fetcher(url, method, data = null, token = null) {
  const defaultObject = {
    url: `https://ponic.cyclic.app/api/v1/admin${url}`,
    method,
  };

  const config = {};

  if (data) {
    Object.assign(config, defaultObject, { data });
  }

  if (token) {
    Object.assign(config, defaultObject, {
      headers: {
        API_TOKEN: token,
      },
    });
  }

  return axios(config);
}

export default fetcher;
