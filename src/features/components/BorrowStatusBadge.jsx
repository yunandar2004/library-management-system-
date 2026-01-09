import { getBorrowStatus } from "@/utils/borrowStatus";

const colors = {
  BORROWED: "bg-blue-500",
  OVERDUE: "bg-red-500",
  RETURNED: "bg-green-500",
};

export default function BorrowStatusBadge({ borrow }) {
  const status = getBorrowStatus(borrow);

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs text-white ${colors[status]}`}
    >
      {status}
    </span>
  );
}
