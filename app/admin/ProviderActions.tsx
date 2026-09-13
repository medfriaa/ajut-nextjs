"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProviderActions({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function setStatus(status: "VERIFIED" | "REJECTED") {
    setLoading(true);
    await fetch(`/api/admin/providers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verificationStatus: status }),
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex justify-between items-center text-sm py-2.5 border-b border-border last:border-0">
      <span>{name}</span>
      <div className="flex gap-1.5">
        <button disabled={loading} onClick={() => setStatus("VERIFIED")}
          className="text-xs font-medium border border-forestLight text-forestDark rounded-lg px-2.5 py-1.5">
          Aprobă
        </button>
        <button disabled={loading} onClick={() => setStatus("REJECTED")}
          className="text-xs font-medium border border-[#EAD3D0] text-danger rounded-lg px-2.5 py-1.5">
          Respinge
        </button>
      </div>
    </div>
  );
}
