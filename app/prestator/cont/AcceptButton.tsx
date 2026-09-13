"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AcceptButton({ jobId, providerId }: { jobId: string; providerId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function accept() {
    setLoading(true);
    const res = await fetch(`/api/jobs/${jobId}/accept`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ providerId }),
    });
    setLoading(false);
    if (res.ok) router.refresh();
  }

  return (
    <div className="flex gap-2 mt-2.5">
      <button onClick={accept} disabled={loading}
        className="flex-1 bg-forest text-white font-semibold rounded-lg py-2.5 text-sm disabled:opacity-60">
        {loading ? "Se acceptă..." : "Acceptă"}
      </button>
      <button className="flex-1 bg-white border border-border rounded-lg py-2.5 text-sm">Refuză</button>
    </div>
  );
}
