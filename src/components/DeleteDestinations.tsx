"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, TriangleAlert } from "lucide-react";

interface DeleteDestinationsProps {
  /** Mongo _id of the travel package to delete */
  id: string;
  /** Name shown in the confirmation text */
  destination: string;
  /** Optional hook for the parent component */
  onDelete?: () => void;
}

const DeleteDestinations = ({
  id,
  destination,
  onDelete,
}: DeleteDestinationsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDelete = async () => {
    if (loading) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`http://localhost:5000/destinations/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          (data && typeof data.message === "string" && data.message) ||
            `Delete failed with status ${res.status}`
        );
      }

      // Backend has removed the row — let the parent update its state too.
      onDelete?.();

      // ...and go back to the destinations list, which refetches from the
      // backend, so the deleted package disappears on the front end as well.
      router.push("/destinations");
    } catch (error) {
      console.error("Delete destination error:", error);

      // Stay in the dialog so the user can see what went wrong.
      setErrorMsg(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        className="flex items-center gap-2 border border-red-200 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
      >
        <Trash2 size={14} />
        Delete
      </DialogTrigger>

      <DialogContent className="gap-0 p-0 sm:max-w-[560px]">
        <div className="p-6">
          <DialogHeader className="text-left">
            <div className="flex items-center gap-3">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-red-50">
                <TriangleAlert
                  size={28}
                  className="text-red-500"
                />
              </div>

              <DialogTitle className="text-xl font-medium tracking-tight">
                Delete Travel Package
              </DialogTitle>
            </div>

            <DialogDescription className="pt-3 text-base leading-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-black">
                &quot;{destination}&quot;
              </span>
              ? This action cannot be undone and will permanently
              remove this travel package from the system.
            </DialogDescription>
          </DialogHeader>

          {errorMsg && (
            <div
              role="alert"
              className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {errorMsg}
            </div>
          )}
        </div>

        <DialogFooter className="flex-row justify-end gap-4 px-6 pb-6">
          <DialogClose
            disabled={loading}
            className="border border-gray-200 px-6 py-4 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-60"
          >
            Cancel
          </DialogClose>

          {/* Not a DialogClose: the dialog must stay open if the request
              fails, so the error above is visible to the user. */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-red-500 px-6 py-4 text-sm text-white hover:bg-red-600 disabled:opacity-60"
          >
            <Trash2 size={16} />
            {loading ? "Deleting..." : "Delete Package"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDestinations;
