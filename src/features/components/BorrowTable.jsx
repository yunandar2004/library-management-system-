import BorrowStatusBadge from "./BorrowStatusBadge";
import ReturnBookButton from "./ReturnBookButton";

export default function BorrowTable({ borrows }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th>Book</th>
          <th>User</th>
          <th>Due</th>
          <th>Status</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {borrows.map((b) => (
          <tr key={b._id} className="border-b">
            <td>{b.book.title}</td>
            <td>{b.user.name}</td>
            <td>{new Date(b.dueAt).toDateString()}</td>
            <td><BorrowStatusBadge borrow={b} /></td>
            <td>
              {!b.returnedAt && <ReturnBookButton borrow={b} />}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
