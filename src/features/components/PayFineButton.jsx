import { useSWRConfig } from "swr";
import { payFine } from "@/services/borrow";
import { borrowApiURL } from "@/services/borrow";
import { toast } from "sonner";

export default function PayFineButton({ borrow }) {
  const { mutate } = useSWRConfig();

  const handlePay = async () => {
    mutate(
      borrowApiURL,
      (data) =>
        data.map((b) =>
          b._id === borrow._id ? { ...b, finePaid: true } : b
        ),
      false
    );

    try {
      await payFine(borrow._id);
      mutate(borrowApiURL);
      toast.success("Fine paid");
    } catch {
      toast.error("Payment failed");
      mutate(borrowApiURL);
    }
  };

  return (
    <button
      onClick={handlePay}
      className="px-3 py-1 bg-red-600 text-white rounded text-xs"
    >
      Pay ${borrow.fineAmount}
    </button>
  );
}
