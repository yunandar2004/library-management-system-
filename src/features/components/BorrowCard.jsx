import BorrowStatusBadge from "./BorrowStatusBadge";
import PayFineButton from "./PayFineButton";

export default function BorrowCard({ borrow }) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow space-y-2">
      <h3 className="font-semibold">{borrow.book.title}</h3>

      <BorrowStatusBadge borrow={borrow} />

      <p className="text-sm text-gray-600">
        Due: {new Date(borrow.dueAt).toDateString()}
      </p>

      {borrow.fineAmount > 0 && !borrow.finePaid && (
        <PayFineButton borrow={borrow} />
      )}

      {borrow.finePaid && (
        <p className="text-green-600 text-xs">Fine Paid</p>
      )}
    </div>
  );
}
