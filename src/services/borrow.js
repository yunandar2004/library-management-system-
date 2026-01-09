import { token } from "@/services/profile";

export const borrowApiURL = `${process.env.NEXT_PUBLIC_API_URL}/borrows`;

export const fetchBorrows = async (url) => {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export const returnBook = async (borrowId) => {
  const res = await fetch(`${borrowApiURL}/${borrowId}/return`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const payFine = async (borrowId) => {
  const res = await fetch(`${borrowApiURL}/${borrowId}/pay-fine`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};



// export async function fetchBorrows(url) {
//   const res = await fetch(url, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error("Failed to fetch borrows");
//   return res.json();
// }

export async function returnBorrow(id) {
  return fetch(`${borrowApiURL}/${id}/return`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
}

// export async function payFine(id) {
//   return fetch(`${borrowApiURL}/${id}/pay-fine`, {
//     method: "PUT",
//     headers: { Authorization: `Bearer ${token}` },
//   });
// }
