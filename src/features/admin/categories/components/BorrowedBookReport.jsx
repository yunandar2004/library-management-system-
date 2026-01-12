"use client";
import { useEffect, useState } from "react";
import { apiURL } from "@/services/auth";
import { token } from "@/services/profile";
import Pagination from "@/components/Pagination";

function BorrowedBookReport() {
  const [report, setReport] = useState([]);
  const [type, setType] = useState("issued"); // "issued" or "returned"
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${apiURL}/reports/borrows/${type}?page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setReport(data.items ?? []);
      setTotal(data.total ?? 0);
    } catch {
      setReport([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [type, page, limit]);

  return (
    <section>
      <p className="font-bold text-2xl px-3 pt-5">Borrowed Book Report</p>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 px-3">
        {["issued", "returned"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setType(t);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              type === t
                ? "bg-indigo-600 text-white"
                : "bg-gray-400 text-white hover:bg-gray-300"
            }`}
          >
            {t === "issued" ? "Borrowed Books" : "Returned Books"}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md mb-3 h-100 overflow-y-scroll">
        <table className="w-full text-sm text-left text-stone-500 dark:text-stone-400">
          <thead className="text-xs text-stone-700 uppercase bg-indigo-100 dark:bg-indigo-700 dark:text-indigo-400">
            <tr>
              <th className="px-2 py-5">User ID</th>
              <th className="px-2 py-5">Name</th>
              <th className="px-2 py-5">Book</th>
              <th className="px-2 py-5">Issue Date</th>
              <th className="px-2 py-5">Due Date</th>
              <th className="px-2 py-5">Return Date</th>
              <th className="px-2 py-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {report.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-5">
                  No records found
                </td>
              </tr>
            ) : (
              report.map((r) => (
                <tr key={r._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono text-indigo-700">
                    {r.borrowerId}
                  </td>
                  <td className="p-3">{r.borrowerName}</td>
                  <td className="p-3">{r.bookTitle}</td>
                  <td className="p-3">
                    {new Date(r.issueDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {new Date(r.dueDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {r.returnDate
                      ? new Date(r.returnDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        r.status === "Returned"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3">{r.fineAmount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className=" shadow-lg bg-white rounded-lg">
        <Pagination
          page={page}
          limit={limit}
          total={total}
          onPageChange={(p) => setPage(p)}
          onLimitChange={(l) => {
            setLimit(l);
            setPage(1);
          }}
        />
      </div>
    </section>
  );
}

export default BorrowedBookReport;
