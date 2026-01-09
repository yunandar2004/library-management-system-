import { token } from "./profile";

export const cartApiURL = `${process.env.NEXT_PUBLIC_API_URL}/cart`;
// export const fetchCart = (...args) =>
//   fetch(...args, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((res) => res.json());

// Update quantity
// export async function updateCartQty(id, qty) {
//   return fetch(`${cartApiURL}/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ qty }),
//   });
// }

// Remove item
// export async function destroyCart(id) {
//   return fetch(`${cartApiURL}/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }



export async function fetchCart(url) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export async function addToCart(payload) {
  return fetch(`${cartApiURL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

export async function updateCartQty(bookId, qty) {
  return fetch(`${cartApiURL}/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ qty }),
  });
}

export async function destroyCart(bookId) {
  return fetch(`${cartApiURL}/${bookId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function checkoutCart() {
  return fetch(`${cartApiURL}/checkout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function clearCart() {
  return fetch(`${cartApiURL}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

