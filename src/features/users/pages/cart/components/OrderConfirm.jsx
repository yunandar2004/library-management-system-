// // "use client";

// // import Link from "next/link";
// // import React, { useState } from "react";
// // import useSWR, { useSWRConfig } from "swr";
// // import { toast } from "sonner";

// // import { checkoutCart, cartApiURL, fetchCart } from "@/services/cart";
// // import { apiURL } from "@/services/auth";
// // import { token } from "@/services/profile";

// // function OrderConfirm() {
// //   const { mutate } = useSWRConfig();
// //   const { data: cart } = useSWR(cartApiURL, fetchCart);
// //   const [loading, setLoading] = useState(false);

// //   // ✅ Create borrow record
// //   async function confirmBorrow(bookId, dueDate) {
// //     const res = await fetch(`${apiURL}/borrows`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${token}`,
// //       },
// //       body: JSON.stringify({ bookId, dueAt: dueDate }),
// //     });

// //     const json = await res.json();
// //     if (!res.ok) throw new Error(json.message);
// //   }

// //   // ✅ Confirm full order (multiple books)
// //   const confirmOrder = async () => {
// //     try {
// //       if (!cart?.cart?.items?.length) {
// //         toast.error("Cart is empty");
// //         return;
// //       }

// //       setLoading(true);
// //       console.log(cart.cart.items);

// //       // 1️⃣ Create borrow records for all books
// //       await Promise.all(
// //         cart.cart.items.map((item) =>
// //           confirmBorrow(item.bookId, "2026-01-20")
// //         )
// //       );

// //       // 2️⃣ Checkout & clear cart
// //       const res = await checkoutCart();
// //       const json = await res.json();
// //       if (!res.ok) throw new Error(json.message);

// //       // 3️⃣ Optimistically update cart cache
// //       mutate(cartApiURL, { cart: { items: [] }, count: 0 }, false);

// //       toast.success("Order placed. Borrow records created.");
// //       mutate(cartApiURL);
// //     } catch (err) {
// //       toast.error(err.message || "Something went wrong");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
// //       <div className="max-w-2xl w-full text-center bg-white rounded-2xl shadow-md p-10">
// //         <h1 className="text-2xl font-semibold text-gray-900 mb-2">
// //           Order Confirmation
// //         </h1>

// //         <p className="text-sm text-gray-500 mb-8">
// //           Your order will be processed and shipped within 3 business days.
// //         </p>

// //         <div className="flex justify-center mb-10">
// //           <img
// //             src="/orderConfirm.png"
// //             alt="Order confirmation"
// //             className="w-64"
// //           />
// //         </div>

// //         <div className="flex items-center justify-center gap-4">
// //           <Link
// //             href="/user/cart"
// //             className="px-6 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
// //           >
// //             Back to Cart
// //           </Link>

// //           <button
// //             onClick={confirmOrder}
// //             disabled={loading}
// //             className="px-6 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50"
// //           >
// //             {loading ? "Processing..." : "Confirm"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default OrderConfirm;
// "use client";
// import Link from "next/link";
// import React, { useEffect } from "react";
// import { checkoutCart, cartApiURL, clearCart } from "@/services/cart";
// import useSWR, { useSWRConfig } from "swr";
// import { toast } from "sonner";
// import { apiURL } from "@/services/auth";
// import { token } from "@/services/profile";

// function OrderConfirm() {
//   const { mutate } = useSWRConfig();

//   // const {data,} = useSWR(`${cartApiURL}/count`, fetchCart);
//   const handleConfirm = async () => {
//     try {
//       const res = await checkoutCart();
//       const json = await res.json();
//       console.log(json);

//       if (!res.ok) throw new Error(json.message);
//       // Clear cart cache optimistically
//       mutate(
//         cartApiURL,
//         (current) => ({ ...current, cart: { items: [] }, count: 0 }),
//         false
//       );

//       toast.success("Order placed. Borrow records created.");
//       // Optional: ensure backend cart cleared
//       await clearCart();
//       mutate(cartApiURL);
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   // async function confirmBorrow(bookId, dueDate) {
//   //   // 1. Store borrow record
//   //   await axios.post(
//   //     `${apiURL}/borrows`,
//   //     { bookId, dueAt: dueDate },
//   //     {
//   //       headers: { Authorization: `Bearer ${token}` },
//   //     }
//   //   );

//   //   // 2. Refresh borrower report
//   //   const res = await axios.get(`${apiURL}/reports/borrows`, {
//   //     headers: { Authorization: `Bearer ${token}` },
//   //   });
//   //   setReport(res.data.items);
//   // }
//   // async function confirmBorrow(bookId, dueDate) {
//   //   await fetch(`${apiURL}/borrows`, {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //       Authorization: `Bearer ${token}`,
//   //     },
//   //     body: JSON.stringify({ bookId, dueAt: dueDate }),
//   //   });

//   //   // 🔄 notify report to refresh
//   //   window.dispatchEvent(new Event("borrow-updated"));
//   // }

//   async function confirmBorrow(bookId, dueDate) {
//     const res = await fetch(`${apiURL}/borrows`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ bookId, dueAt: dueDate }),
//     });

//     const json = await res.json();
//     if (!res.ok) throw new Error(json.message);

//     // Show the backend response
//     toast.success(json.message);
//     console.log("Borrow record:", json.borrow);

//     // 🔄 notify report to refresh
//     window.dispatchEvent(new Event("borrow-updated"));
//   }

//   useEffect(() => {
//     const refresh = () => fetchReport();
//     window.addEventListener("borrow-updated", refresh);
//     return () => window.removeEventListener("borrow-updated", refresh);
//   }, []);
//   const confirmOrder = async () => {
//     try {
//       if (!cart?.cart?.items?.length) {
//         toast.error("Cart is empty");
//         return;
//       }

//       // 1. Create borrow records
//       for (const item of cart.cart.items) {
//         await confirmBorrow(item.bookId, "2026-01-20");
//       }

//       // 2. Checkout & clear cart
//       await handleConfirm();
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="max-w-2xl w-full text-center bg-white rounded-2xl shadow-md p-10">
//         <h1 className="text-2xl font-semibold text-gray-900 mb-2">
//           Order Confirmation
//         </h1>
//         <p className="text-sm text-gray-500 mb-8">
//           Your order will be processed and shipped within 3 business days.
//           <br />
//           You will receive another email with tracking information once your
//           order has been dispatched.
//         </p>

//         <div className="flex justify-center mb-10">
//           <img
//             src="/orderConfirm.png"
//             alt="Order confirmation"
//             className="w-64"
//           />
//         </div>

//         <div className="flex items-center justify-center gap-4">
//           <Link
//             href={"/user/cart"}
//             className="px-6 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
//           >
//             Back to Cart
//           </Link>
//           {/* <button
//             onClick={async () => {
//               await handleConfirm(); // run checkout + clear cart
//               await confirmBorrow(bookId, "2026-01-20"); // store borrow + refresh report
//             }}
//             className="px-6 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
//           >
//             Confirm
//           </button> */}

//           <button
//             onClick={async () => {
//               await handleConfirm(); // run checkout + clear
//               await confirmBorrow(bookId, dueDate); // store borrow + refresh report
//             }}
//             className="px-6 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
//           >
//             Confirm
//           </button>
//           {/* <button
//             onClick={async () => {
//               try {
//                 if (!cart?.cart?.items?.length) {
//                   toast.error("Cart is empty");
//                   return;
//                 }

//                 // 1. Create borrow records
//                 for (const item of cart.cart.items) {
//                   await confirmBorrow(item.bookId, "2026-01-20");
//                 }

//                 // 2. Checkout & clear cart
//                 await handleConfirm();
//               } catch (err) {
//                 toast.error(err.message);
//               }
//             }}
//           >
//             Confirm
//           </button> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrderConfirm;
"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { toast } from "sonner";

import {
  checkoutCart,
  cartApiURL,
  clearCart,
  fetchCart,
} from "@/services/cart";
import { apiURL } from "@/services/auth";
import { token } from "@/services/profile";

function OrderConfirm() {
  const { mutate } = useSWRConfig();
  const { data: cart } = useSWR(cartApiURL, fetchCart);

  // ✅ Create borrow record
  async function confirmBorrow(bookId) {
    // const res = await fetch(`${apiURL}/borrows`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({ bookId }), // backend sets borrowedAt + dueAt
    // });
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 10);
    const res = await fetch(`${apiURL}/borrows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookId, dueAt: dueDate.toISOString() }),
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message);

    toast.success("Borrow record created");
    console.log("Borrow record:", json.borrow);

    // 🔄 notify report to refresh
    // window.dispatchEvent(new Event("borrow-updated"));
  }

  // ✅ Checkout & clear cart
  const handleCheckout = async () => {
    const res = await checkoutCart();
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);

    // Optimistically clear cart cache
    mutate(cartApiURL, { cart: { items: [] }, count: 0 }, false);

    toast.success("Order placed successfully");
    await clearCart();
    mutate(cartApiURL);
  };

  // ✅ Confirm full order
  const confirmOrder = async () => {
    try {
      if (!cart?.cart?.items?.length) {
        toast.error("Cart is empty");
        return;
      }

      // 1️⃣ Create borrow records for all books
      for (const item of cart.cart.items) {
        await confirmBorrow(item.bookId);
      }

      // 2️⃣ Checkout & clear cart
      await handleCheckout();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  // ✅ Refresh borrower report when borrow-updated event fires
  useEffect(() => {
    const refresh = () => {
      mutate(`${apiURL}/borrows`);
    };
    window.addEventListener("borrow-updated", refresh);
    return () => window.removeEventListener("borrow-updated", refresh);
  }, [mutate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full text-center bg-white rounded-2xl shadow-md p-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Order Confirmation
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Your order will be processed and shipped within 3 business days.
          <br />
          You will receive another email with tracking information once your
          order has been dispatched.
        </p>

        <div className="flex justify-center mb-10">
          <img
            src="/orderConfirm.png"
            alt="Order confirmation"
            className="w-64"
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/user/cart"
            className="px-6 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Back to Cart
          </Link>

          <button
            onClick={confirmOrder}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirm;
