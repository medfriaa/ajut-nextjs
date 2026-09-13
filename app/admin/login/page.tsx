"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError("");
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Parolă greșită.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="pt-16">
      <h2 className="font-serif text-[22px] font-medium mb-4">Autentificare admin</h2>
      {error && <div className="text-sm text-danger mb-3">{error}</div>}
      <input
        type="password"
        className="w-full border border-border rounded-xl p-3.5 mb-4"
        placeholder="Parolă admin"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      <button
        onClick={submit}
        disabled={loading}
        className="w-full bg-forest text-white font-semibold rounded-[10px] py-3.5 disabled:opacity-60"
      >
        {loading ? "Se verifică..." : "Intră în admin"}
      </button>
    </div>
  );
}
