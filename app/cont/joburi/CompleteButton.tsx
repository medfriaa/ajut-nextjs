"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CompleteButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function complete() {
    setLoading(true);
    await fetch(`/api/bookings/${bookingId}/complete`, { method: "POST" });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={complete}
      disabled={loading}
      className="w-full bg-forest text-white font-semibold rounded-[10px] py-3 mt-3 text-sm disabled:opacity-60"
    >
      {loading ? "Se procesează..." : "Marchează lucrarea ca finalizată"}
    </button>
  );
}
