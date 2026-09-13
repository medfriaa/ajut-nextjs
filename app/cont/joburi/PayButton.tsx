"use client";

import { useState } from "react";

export default function PayButton({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function pay() {
    setError("");
    setLoading(true);
    const res = await fetch(`/api/bookings/${bookingId}/checkout`, { method: "POST" });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Nu am putut porni plata.");
      return;
    }
    window.location.href = data.url;
  }

  return (
    <div className="mt-3">
      {error && <div className="text-xs text-danger mb-2">{error}</div>}
      <button
        onClick={pay}
        disabled={loading}
        className="w-full bg-forest text-white font-semibold rounded-[10px] py-3 text-sm disabled:opacity-60"
      >
        {loading ? "Se deschide plata..." : "Plătește și confirmă lucrarea"}
      </button>
    </div>
  );
}
