export const bookApiURL = `${process.env.NEXT_PUBLIC_API_URL}/books`;

import { token } from "./profile";
export const fetchBook = (...args) =>
  fetch(...args, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const bookAdd = async (payload) => {
  const res = await fetch(`${bookApiURL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  // return both res and parsed JSON
  //   const data = await res.json();
  return res;
};


export const destroyBook = (id) => {
  return fetch(`${bookApiURL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};