import { api } from "../api/api";

export const data = (url) => {
  return fetch(url)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    });
};

export const apiUrl = (query) => {
  let url = `${api.base}${query}&APPID=${process.env.REACT_APP_KEY}${api.metric}`;
  return url;
};
