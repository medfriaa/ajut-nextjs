"use client";

import { useState } from "react";

export default function ConnectButton({ providerId, onboarded }: { providerId: string; onboarded: boolean }) {
  const [loading, setLoading] = useState(false);

  async function startOnboarding() {
    setLoading(true);
    const res = await fetch("/api/providers/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ providerId }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.url) window.location.href = data.url;
  }

  if (onboarded) {
    return (
      <div className="bg-forestLight text-forestDark text-xs font-semibold px-3 py-2 rounded-lg mt-3">
        Cont de plati activ
      </div>
    );
  }

  return (
    <button
      onClick={startOnboarding}
      disabled={loading}
      className="w-full bg-forest text-white font-semibold rounded-[10px] py-3 mt-3 text-sm disabled:opacity-60"
    >
      {loading ? "Se deschide..." : "Configureaza contul de plati"}
    </button>
  );
}
