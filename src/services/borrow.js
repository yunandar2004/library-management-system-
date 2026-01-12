import { token } from "@/services/profile";

export const borrowApiURL = `${process.env.NEXT_PUBLIC_API_URL}/borrows`;

export const fetchBorrows = async (url) => {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};
import axios from "axios";
import { apiURL } from "./auth";

//create
async function borrowBook(bookId, dueDate) {
  const res = await axios.post(
    `${borrowApiURL}/borrows`,
    { bookId, dueAt: dueDate },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(res.data);
}

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

async function confirmBorrow(bookId, dueDate) {
  const token = localStorage.getItem("token");
  await axios.post(
    `${apiURL}/borrows`,
    { bookId, dueAt: dueDate },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  // Refresh report
  const res = await axios.get("/api/reports/borrows", {
    headers: { Authorization: `Bearer ${token}` },
  });
  setReport(res.data.items);
}

export const storeBorrows = (data) => {
  return fetch(userApiURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};