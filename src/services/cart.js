import { token } from "./profile";

export const cartApiURL = `${process.env.NEXT_PUBLIC_API_URL}/cart`;
export const fetchCart = (...args) =>
  fetch(...args, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());



  export const destroyCart = (id) => {
    return fetch(`${cartApiURL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };
  