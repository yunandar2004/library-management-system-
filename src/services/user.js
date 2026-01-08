export const userApiURL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

import useAccountStore from "@/store/useAccountStore";
import { token } from "./profile";
export const fetchUser = (...args) =>
  fetch(...args, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());



export const storeUser = (data) => {
  return fetch(userApiURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};