"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProviderLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError("");
    setLoading(true);
    const res = await fetch("/api/providers/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Eroare la autentificare.");
      return;
    }
    router.push("/prestator/cont");
    router.refresh();
  }

  return (
    <div className="pt-16">
      <h2 className="font-serif text-[22px] font-medium mb-1">Intră în contul tău</h2>
      <p className="text-[13px] text-muted mb-4">Folosește emailul cu care te-ai înregistrat ca prestator.</p>
      {error && <div className="text-sm text-danger mb-3">{error}</div>}
      <input
        type="email"
        className="w-full border border-border rounded-xl p-3.5 mb-4"
        placeholder="email@exemplu.ro"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      <button
        onClick={submit}
        disabled={loading}
        className="w-full bg-forest text-white font-semibold rounded-[10px] py-3.5 disabled:opacity-60"
      >
        {loading ? "Se verifică..." : "Intră în cont"}
      </button>
    </div>
  );
}
