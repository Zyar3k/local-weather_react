import { api } from "../api/api";

export const data = async (query) => {
  let weather;
  let url = `${api.base}${query}&APPID=${process.env.REACT_APP_KEY}${api.metric}`;
  return await fetch(url)
    .then((res) => res.json())
    .then((result) => {
      weather = result;

      return weather;
    });
};
