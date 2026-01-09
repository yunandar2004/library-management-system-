import { useSWRConfig } from "swr";
import { returnBook } from "@/services/borrow";
import { borrowApiURL } from "@/services/borrow";
import { toast } from "sonner";

export default function ReturnBookButton({ borrow }) {
  const { mutate } = useSWRConfig();

  const handleReturn = async () => {
    mutate(
      borrowApiURL,
      (data) =>
        data.map((b) =>
          b._id === borrow._id
            ? { ...b, returnedAt: new Date() }
            : b
        ),
      false
    );

    try {
      await returnBook(borrow._id);
      mutate(borrowApiURL);
      toast.success("Book returned");
    } catch {
      toast.error("Failed");
      mutate(borrowApiURL);
    }
  };

  return (
    <button
      onClick={handleReturn}
      className="px-3 py-1 bg-green-600 text-white rounded text-xs"
    >
      Return
    </button>
  );
}
