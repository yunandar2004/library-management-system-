"use client";
// import { useEffect, useState } from "react";
// import { apiURL } from "@/services/auth";
// import { token } from "@/services/profile";

// function BorrowerReport() {
//   const [report, setReport] = useState([]);
//   const [filters, setFilters] = useState({
//     startDate: "",
//     endDate: "",
//     userId: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);

//   const buildQuery = () => {
//     const params = new URLSearchParams();
//     if (filters.startDate) params.append("startDate", filters.startDate);
//     if (filters.endDate) params.append("endDate", filters.endDate);
//     if (filters.userId) params.append("userId", filters.userId);
//     params.append("page", page);
//     params.append("limit", limit);
//     return params.toString();
//   };

//   const fetchReport = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const query = buildQuery();
//       const url = query
//         ? `${apiURL}/reports/borrows?${query}`
//         : `${apiURL}/reports/borrows`;

//       const res = await fetch(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to fetch report");

//       const data = await res.json();
//       setReport(data.items ?? []);
//     } catch (err) {
//       setError("Unable to load borrower report");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReport();
//   }, [filters, page, limit]);

//   const downloadFile = async (type) => {
//     try {
//       const query = buildQuery();
//       const url = `${apiURL}/reports/borrows/export/${type}${
//         query ? `?${query}` : ""
//       }`;
//       const res = await fetch(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to export");

//       const blob = await res.blob();
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download = `borrow-report.${type === "pdf" ? "pdf" : "xlsx"}`;
//       link.click();
//     } catch {
//       setError("Export failed");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="bg-white shadow-xl rounded-lg p-6 mb-6">
//         <div className="sticky">
//           <h2 className="text-3xl font-bold text-indigo-700 mb-6">
//             📚 Borrower Report
//           </h2>

//           {/* Summary */}
//           <div className="flex gap-6 mb-6 text-sm text-gray-600">
//             <span>
//               Total Records: <strong>{report.length}</strong>
//             </span>
//             <span>
//               Returned:{" "}
//               <strong>
//                 {report.filter((r) => r.status === "Returned").length}
//               </strong>
//             </span>
//             <span>
//               Overdue:
//               <strong>
//                 {report.filter((r) => r.status === "Overdue").length}
//               </strong>
//             </span>
//           </div>

//           {/* Filters */}
//           <div className="flex flex-wrap gap-4 mb-6">
//             <input
//               type="date"
//               className="border rounded px-3 py-2 shadow-sm"
//               onChange={(e) =>
//                 setFilters((f) => ({ ...f, startDate: e.target.value }))
//               }
//             />
//             <input
//               type="date"
//               className="border rounded px-3 py-2 shadow-sm"
//               onChange={(e) =>
//                 setFilters((f) => ({ ...f, endDate: e.target.value }))
//               }
//             />
//             <input
//               type="text"
//               placeholder="User ID"
//               className="border rounded px-3 py-2 shadow-sm"
//               onChange={(e) =>
//                 setFilters((f) => ({ ...f, userId: e.target.value }))
//               }
//             />

//             <button
//               onClick={() => downloadFile("pdf")}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//             >
//               Export PDF
//             </button>
//             <button
//               onClick={() => downloadFile("excel")}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//             >
//               Export Excel
//             </button>
//           </div>
//         </div>
//         {/* Content */}
//         {loading && <p className="text-gray-500">Loading report...</p>}
//         {error && <p className="text-red-600">{error}</p>}

//         {!loading && !error && (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
//               <thead>
//                 <tr className="bg-indigo-100 text-indigo-800 text-sm uppercase">
//                   <th className="p-3 text-left">Borrower ID</th>
//                   <th className="p-3 text-left">Name</th>
//                   <th className="p-3 text-left">Book Title</th>
//                   <th className="p-3 text-left">Issue Date</th>
//                   <th className="p-3 text-left">Due Date</th>
//                   <th className="p-3 text-left">Return Date</th>
//                   <th className="p-3 text-left">Status</th>
//                   <th className="p-3 text-left">Fine</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {report.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="text-center py-6 text-gray-500">
//                       No records found
//                     </td>
//                   </tr>
//                 ) : (
//                   report.map((r) => (
//                     <tr
//                       key={r.borrowerId + r.bookTitle}
//                       className="border-b hover:bg-gray-50"
//                     >
//                       <td className="p-3">{r.borrowerId}</td>
//                       <td className="p-3">{r.borrowerName}</td>
//                       <td className="p-3">{r.bookTitle}</td>
//                       <td className="p-3">
//                         {new Date(r.issueDate).toLocaleDateString()}
//                       </td>
//                       <td className="p-3">
//                         {new Date(r.dueDate).toLocaleDateString()}
//                       </td>
//                       <td className="p-3">
//                         {r.returnDate
//                           ? new Date(r.returnDate).toLocaleDateString()
//                           : "-"}
//                       </td>
//                       <td className="p-3">
//                         <span
//                           className={`px-2 py-1 rounded text-xs font-semibold ${
//                             r.status === "Returned"
//                               ? "bg-green-100 text-green-700"
//                               : r.status === "Overdue"
//                               ? "bg-red-100 text-red-700"
//                               : "bg-yellow-100 text-yellow-700"
//                           }`}
//                         >
//                           {r.status}
//                         </span>
//                       </td>
//                       <td className="p-3">{r.fineAmount}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Pagination */}
//         <div className="flex items-center justify-between mt-6">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="text-sm text-gray-600">Page {page}</span>
//           <button
//             onClick={() => setPage((p) => p + 1)}
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BorrowerReport;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { apiURL } from "@/services/auth";
import { token } from "@/services/profile";

const BorrowerReport = () => {
  const [reports, setReports] = useState([]);
  const [type, setType] = useState("issued"); // issued, returned, overdue
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10); // items per page
  const [loading, setLoading] = useState(false);

  // const fetchReports = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(`${apiURL}/reports/borrows/${type}`, {
  //       params: { page, limit },
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setReports(res.data.items || res.data);
  //     setTotal(res.data.total || res.data.items?.length || 0);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchReports = async () => {
    try {
      setLoading(true);

      // Build query string manually
      const query = new URLSearchParams({ page, limit }).toString();
      const url = `${apiURL}/reports/borrows/${type}?${query}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      setReports(data.items || data);
      setTotal(data.total || data.items?.length || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [type, page]);

  const handleExport = (format) => {
    window.open(`${apiURL}/reports/borrows/${type}/export/${format}`, "_blank");
  };

  console.log(reports);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Borrower Reports</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            type === "issued" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setType("issued");
            setPage(1);
          }}
        >
          Issued
        </button>
        <button
          className={`px-4 py-2 rounded ${
            type === "returned" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setType("returned");
            setPage(1);
          }}
        >
          Returned
        </button>
        <button
          className={`px-4 py-2 rounded ${
            type === "overdue" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setType("overdue");
            setPage(1);
          }}
        >
          Overdue
        </button>

        {/* Export Buttons */}
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => handleExport("pdf")}
            className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            <FaFilePdf /> PDF
          </button>
          <button
            onClick={() => handleExport("excel")}
            className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <FaFileExcel /> Excel
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Borrower</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Book</th>
              <th className="p-2 border">Issue Date</th>
              <th className="p-2 border">Due Date</th>
              <th className="p-2 border">Return Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Fine</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : reports.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center p-4">
                  No records found.
                </td>
              </tr>
            ) : (
              reports.map((b, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-2 border">{i + 1 + (page - 1) * limit}</td>
                  <td className="p-2 border">{b.borrowerName}</td>
                  <td className="p-2 border">{b.borrowerEmail}</td>
                  <td className="p-2 border">{b.bookTitle}</td>
                  <td className="p-2 border">
                    {new Date(b.issueDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    {new Date(b.dueDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    {b.returnDate
                      ? new Date(b.returnDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="p-2 border">{b.status}</td>
                  <td className="p-2 border">{b.fineAmount || 0}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span>
          Page {page} / {Math.ceil(total / limit)}
        </span>
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          disabled={page >= Math.ceil(total / limit)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BorrowerReport;
