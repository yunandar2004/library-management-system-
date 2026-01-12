export const userApiURL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

import { token } from "./profile";
export const fetchUser = (...args) =>
  fetch(...args, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

// export const changeImage = (file, id) => {
//   const formData = new FormData();
//   formData.append("profile_image", file);

//   return fetch(`${userApiUrl}/change-profile-image/${id}`, {
//     method: "POST",
//     body: formData,
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${useAccountStore.getState().token}`,
//     },
//   });
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


export const excelImport = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetch(`${userApiURL}/import`, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
