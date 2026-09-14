"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProviderForm({
  categories,
  cities,
}: {
  categories: { id: string; name: string; icon: string | null }[];
  cities: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    cityId: cities[0]?.id || "",
    experienceYears: "",
    bio: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleCat(id: string) {
    setSelectedCats((s) => (s.includes(id) ? s.filter((c) => c !== id) : [...s, id]));
  }

  async function submit() {
    setError("");
    if (!form.fullName.trim() || !form.phone.trim() || !form.email.trim() || selectedCats.length === 0) {
      setError("Completeaza numele, telefonul, emailul si alege cel putin o categorie.");
      return;
    }
    setSubmitting(true);
    const res = await fetch("/api/providers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, categoryIds: selectedCats }),
    });
    setSubmitting(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "A aparut o eroare.");
      return;
    }
    router.push("/prestator/cont?pending=1");
  }

  return (
    <div className="pt-4">
      <h2 className="font-serif text-[22px] font-medium mb-1">Devino prestator</h2>
      <p className="text-[13px] text-muted mb-4">
        Completeaza profilul pentru a primi cereri de lucru din Arad.
      </p>
      {error && <div className="text-sm text-danger mb-3">{error}</div>}
      <input className="w-full border border-border rounded-xl p-3.5 mb-3" placeholder="Nume complet"
        value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
      <input className="w-full border border-border rounded-xl p-3.5 mb-3" placeholder="Telefon"
        value={form.phone} onChange={(e) => update("phone", e.target.value)} />
      <input className="w-full border border-border rounded-xl p-3.5 mb-3" placeholder="Email"
        value={form.email} onChange={(e) => update("email", e.target.value)} />

      <div className="text-sm font-semibold mb-2">Categorii de servicii</div>
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        {categories.map((c) => (
          <button key={c.id} type="button" onClick={() => toggleCat(c.id)}
            className={"border-[1.5px] rounded-xl p-3 text-sm font-medium " + (selectedCats.includes(c.id) ? "border-forest bg-forestLight text-forestDark" : "border-border bg-white")}>
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      <input className="w-full border border-border rounded-xl p-3.5 mb-3" placeholder="Ani de experienta (ex: 5)"
        value={form.experienceYears} onChange={(e) => update("experienceYears", e.target.value)} />
      <textarea className="w-full border border-border rounded-xl p-3.5 mb-4 min-h-[90px]"
        placeholder="Scurta descriere a experientei tale"
        value={form.bio} onChange={(e) => update("bio", e.target.value)} />

      <button disabled={submitting} onClick={submit}
        className="w-full bg-forest text-white font-semibold rounded-[10px] py-3.5 disabled:opacity-60">
        {submitting ? "Se trimite..." : "Trimite spre verificare"}
      </button>
    </div>
  );
}
