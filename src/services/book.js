export const bookApiURL = `${process.env.NEXT_PUBLIC_API_URL}/books`;
// export const bookDetailApiURL = `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`;

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

// export const bookDetail = async (id) => {
//   const res = await fetch(`${bookDetailApiURL}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res.json().then((data) => {
//     return data;
//   });
// };

export const destroyBook = (id) => {
  return fetch(`${bookApiURL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeImage = (file, id) => {
  const formData = new FormData();
  formData.append("profile_image", file);

  return fetch(`${userApiUrl}/change-profile-image/${id}`, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${useAccountStore.getState().token}`,
    },
  });
};
