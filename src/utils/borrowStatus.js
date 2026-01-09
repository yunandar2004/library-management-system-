export const getBorrowStatus = (borrow) => {
  if (borrow.returnedAt) return "RETURNED";
  if (new Date() > new Date(borrow.dueAt)) return "OVERDUE";
  return "BORROWED";
};

export const getBorrowStatusColor = (borrow) => {
  if (borrow.returnedAt) return "green";
  if (new Date() > new Date(borrow.dueAt)) return "red";
  return "blue";
};
