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

// export const userAdd = async (payload) => {
//   const res = await fetch(`${userApi}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(payload),
//   });

//   return res.json();
// };

// services/user.js

// ... (keep the rest of your imports and other exports)

// export const userAdd = async (payload) => {
//   const res = await fetch(`${userApi}`, {
//     method: "POST",
//     headers: {
//       //  IMPORTANT: DO NOT set "Content-Type": "application/json"
//       Authorization: `Bearer ${token}`, // You still need your Authorization header
//     },
//     body: payload, // 👈 Send the FormData object directly
//   });

//   // The server response will likely still be JSON, so this is fine
//   return { res, data: await res.json() };
// };

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