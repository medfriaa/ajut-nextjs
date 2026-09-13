"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Category = { id: string; name: string; icon: string | null };
type City = { id: string; name: string };
type Area = { id: string; name: string };

export default function RequestForm({
  categories,
  cities,
  areas,
  defaultCategoryId,
}: {
  categories: Category[];
  cities: City[];
  areas: Area[];
  defaultCategoryId?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    categoryId: defaultCategoryId || "",
    description: "",
    cityId: cities[0]?.id || "",
    areaId: "",
    preferredWhen: "",
    budgetAmount: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function next() {
    setError("");
    if (step === 1 && !form.categoryId) return setError("Alege o categorie de serviciu.");
    if (step === 2 && !form.description.trim()) return setError("Descrie lucrarea.");
    if (step === 4 && !form.preferredWhen) return setError("Alege o perioadă.");
    setStep((s) => s + 1);
  }

  async function submit() {
    setError("");
    if (!form.customerName.trim() || !form.customerPhone.trim()) {
      setError("Completează numele și telefonul.");
      return;
    }
    setSubmitting(true);
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, budgetAmount: form.budgetAmount || null }),
    });
    setSubmitting(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "A apărut o eroare. Încearcă din nou.");
      return;
    }
    router.push("/cont/joburi?sent=1");
  }

  const dots = (
    <div className="flex gap-1.5 mb-5 mt-2">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className={`h-1 flex-1 rounded ${n <= step ? "bg-forest" : "bg-border"}`} />
      ))}
    </div>
  );

  return (
    <div>
      {step > 1 && (
        <button className="text-sm text-muted mb-2" onClick={() => setStep((s) => s - 1)}>
          ← Înapoi
        </button>
      )}
      {dots}
      {error && <div className="text-sm text-danger mb-3">{error}</div>}

      {step === 1 && (
        <div>
          <div className="text-xs text-muted font-semibold mb-1">Pasul 1 din 6</div>
          <h2 className="font-serif text-[22px] font-medium mb-4">Ce ai nevoie?</h2>
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => update("categoryId", c.id)}
                className={`border-[1.5px] rounded-xl p-3.5 text-sm font-medium ${
                  form.categoryId === c.id ? "border-forest bg-forestLight text-forestDark" : "border-border bg-white"
                }`}
              >
                {c.icon} {c.name}
              </button>
            ))}
          </div>
          <button onClick={next} className="w-full bg-forest text-white font-semibold rounded-[10px] py-3.5">
            Continuă
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="text-xs text-muted font-semibold mb-1">Pasul 2 din 6</div>
          <h2 className="font-serif text-[22px] font-medium mb-4">Descrie lucrarea</h2>
          <textarea
            className="w-full border border-border rounded-xl p-3.5 mb-4 min-h-[100px]"
            placeholder="Ex: Am nevoie de montaj pentru un dulap IKEA în dormitor."
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
          <button onClick={next} className="w-full bg-forest text-white font-semibold rounded-[10px] py-3.5">
            Continuă
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="text-xs text-muted font-semibold mb-1">Pasul 3 din 6</div>
          <h2 className="font-serif text-[22px] font-medium mb-4">Unde?</h2>
          <select
            className="w-full border border-border rounded-xl p-3.5 mb-3"
            value={form.cityId}
            onChange={(e) => update("cityId", e.target.value)}
          >
            {cities.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select
            className="w-full border border-border rounded-xl p-3.5 mb-4"
            value={form.areaId}
            onChange={(e) => update("areaId", e.target.value)}
          >
            <option value="">Alege un cartier/zonă (opțional)</option>
            {areas.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
          <button onClick={next} className="w-full bg-forest text-white font-semibold rounded-[10px] py-3.5">
            Continuă
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <div className="text-xs text-muted font-semibold mb-1">Pasul 4 din 6</div>
          <h2 className="font-serif text-[22px] font-medium mb-4">Când?</h2>
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {["Astăzi", "Mâine", "Săptămâna asta", "Flexibil"].map((w) => (
              <button
                key={w}
                onClick={() => update("preferredWhen", w)}
                className={`border-[1.5px] rounded-xl p-3.5 text-sm font-medium ${
                  form.preferredWhen === w ? "border-forest bg-forestLight text-forestDark" : "border-border bg-white"
                }`}
              >
                {w}
              </button>
            ))}
          </div>
          <button onClick={next} className="w-full bg-forest text-white font-semibold rounded-[10px] py-3.5">
            Continuă
          </button>
        </div>
      )}

      {step === 5 && (
        <div>
          <div className="text-xs text-muted font-semibold mb-1">Pasul 5 din 6</div>
          <h2 className="font-serif text-[22px] font-medium mb-4">Care este bugetul tău?</h2>
          <input
            type="number"
            className="w-full border border-border rounded-xl p-3.5 mb-2"
            placeholder="Sumă estimată în lei (ex: 250)"
            value={form.budgetAmount}
            onChange={(e) => update("budgetAmount", e.target.value)}
          />
          <div className="text-xs text-muted mb-4">Poți negocia și mai târziu cu prestatorul.</div>
          <button onClick={next} className="w-full bg-forest text-white font-semibold rounded-[10px] py-3.5">
            Continuă
          </button>
        </div>
      )}

      {step === 6 && (
        <div>
          <div className="text-xs text-muted font-semibold mb-1">Pasul 6 din 6</div>
          <h2 className="font-serif text-[22px] font-medium mb-4">Datele tale de contact</h2>
          <input
            className="w-full border border-border rounded-xl p-3.5 mb-3"
            placeholder="Nume complet"
            value={form.customerName}
            onChange={(e) => update("customerName", e.target.value)}
          />
          <input
            className="w-full border border-border rounded-xl p-3.5 mb-3"
            placeholder="Telefon"
            value={form.customerPhone}
            onChange={(e) => update("customerPhone", e.target.value)}
          />
          <input
            className="w-full border border-border rounded-xl p-3.5 mb-4"
            placeholder="Email"
            value={form.customerEmail}
            onChange={(e) => update("customerEmail", e.target.value)}
          />
          <button
            disabled={submitting}
            onClick={submit}
            className="w-full bg-forest text-white font-semibold rounded-[10px] py-3.5 disabled:opacity-60"
          >
            {submitting ? "Se trimite..." : "Trimite cererea"}
          </button>
        </div>
      )}
    </div>
  );
}
