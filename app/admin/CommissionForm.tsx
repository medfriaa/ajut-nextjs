"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommissionForm({ currentPercent }: { currentPercent: number }) {
  const router = useRouter();
  const [value, setValue] = useState(currentPercent);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch("/api/admin/commission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commissionPercent: value }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="bg-white border border-border rounded-card p-4">
      <div className="text-sm mb-2.5">Procent comision aplicat la fiecare tranzacție</div>
      <div className="flex items-center gap-2">
        <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))}
          className="w-[70px] border border-border rounded-lg p-2 text-center" />
        <span>%</span>
        <button onClick={save} disabled={saving}
          className="text-xs font-semibold border border-forestLight text-forestDark rounded-lg px-3 py-2 disabled:opacity-60">
          {saving ? "Se salvează..." : "Salvează"}
        </button>
      </div>
    </div>
  );
}
