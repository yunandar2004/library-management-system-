
"use client";
import { useState } from "react";
import { toast } from "sonner";
import { token } from "@/services/profile";
import { Ban, RotateCcw } from "lucide-react";
import { userApiURL } from "@/services/user";
import { useSWRConfig } from "swr";

const BanUserButton = ({ user }) => {
  const [isBanned, setIsBanned] = useState(user.isBanned);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const handleConfirm = async () => {
    try {
      setLoading(true);

      const endpoint = isBanned
        ? `${userApiURL}/${user._id}/restore`
        : `${userApiURL}/${user._id}/ban`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      // ✅ instant UI update
      setIsBanned(!isBanned);

      // 🔄 revalidate users list
      mutate((key) => typeof key === "string" && key.startsWith(userApiURL));

      toast.success(isBanned ? "User restored" : "User banned");
      setOpen(false);
    } catch (err) {
      toast.error(err.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Action button */}
      <button
        onClick={() => setOpen(true)}
        className={isBanned ? "text-green-600" : "text-red-600"}
      >
        {isBanned ? (
          <RotateCcw className="size-5" />
        ) : (
          <Ban className="size-5" />
        )}
      </button>

      {/* Confirm Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl w-96 p-5 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">
              {isBanned ? "Restore user?" : "Ban user?"}
            </h3>

            <p className="text-sm text-stone-600 mb-5">
              {isBanned
                ? "Do you want to restore this user?"
                : "Do you want to ban this user? They will no longer be able to access the system."}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-md border text-sm hover:bg-stone-100"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                disabled={loading}
                className={`px-4 py-2 rounded-md text-sm text-white ${
                  isBanned
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {loading ? "Please wait..." : isBanned ? "Restore" : "Ban"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BanUserButton;
