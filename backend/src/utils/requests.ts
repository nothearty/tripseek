import axios from "axios";

const url = "http://localhost:3000";

const httpClient = axios.create({
  baseURL: url,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = (params?: Record<string, any>) => {
  axios
    .get(url, {
      params: params,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
};

export const post = (data: Record<string, any>) => {
  axios
    .post(url, data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
};

export const put = (data: Record<string, any>) => {
  axios
    .put(url, data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
};

export const del = (params?: Record<string, any>) => {
  axios
    .delete(url, {
      params: params,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
};
