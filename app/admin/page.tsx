import { prisma } from "@/lib/prisma";
import { getActiveCommissionPercent } from "@/lib/commission";
import CommissionForm from "./CommissionForm";
import ProviderActions from "./ProviderActions";

// TODO productie: protejeaza aceasta pagina cu autentificare + rol ADMIN
export default async function AdminPage() {
  const [jobs, providers, commissionPercent] = await Promise.all([
    prisma.job.findMany({ include: { category: true } }),
    prisma.providerProfile.findMany({ orderBy: { createdAt: "desc" } }),
    getActiveCommissionPercent(),
  ]);

  const totalCommission = await prisma.payment.aggregate({ _sum: { platformCommissionAmount: true } });
  const pendingProviders = providers.filter((p) => p.verificationStatus === "PENDING");
  const customerCount = new Set((await prisma.job.findMany({ select: { customerPhone: true } })).map((j) => j.customerPhone)).size;

  return (
    <div className="pt-4">
      <h2 className="font-serif text-[22px] font-medium mb-4">Panou admin</h2>

      <div className="grid grid-cols-2 gap-2.5 mb-2">
        <div className="bg-white border border-border rounded-xl p-3.5">
          <div className="font-serif text-xl font-medium">{jobs.length}</div>
          <div className="text-[11.5px] text-muted mt-0.5">joburi totale</div>
        </div>
        <div className="bg-white border border-border rounded-xl p-3.5">
          <div className="font-serif text-xl font-medium">{totalCommission._sum.platformCommissionAmount ?? 0} lei</div>
          <div className="text-[11.5px] text-muted mt-0.5">comision încasat</div>
        </div>
        <div className="bg-white border border-border rounded-xl p-3.5">
          <div className="font-serif text-xl font-medium">{providers.length}</div>
          <div className="text-[11.5px] text-muted mt-0.5">prestatori</div>
        </div>
        <div className="bg-white border border-border rounded-xl p-3.5">
          <div className="font-serif text-xl font-medium">{customerCount}</div>
          <div className="text-[11.5px] text-muted mt-0.5">clienți</div>
        </div>
      </div>

      <div className="text-sm text-muted font-medium mt-5 mb-2">Comision platformă</div>
      <CommissionForm currentPercent={commissionPercent} />

      <div className="text-sm text-muted font-medium mt-5 mb-2">Prestatori în așteptare verificare</div>
      <div className="bg-white border border-border rounded-card p-4">
        {pendingProviders.length === 0 && <div className="text-sm text-muted text-center py-3">Niciun prestator în așteptare.</div>}
        {pendingProviders.map((p) => (
          <ProviderActions key={p.id} id={p.id} name={p.fullName} />
        ))}
      </div>

      <div className="text-sm text-muted font-medium mt-5 mb-2">Toate joburile</div>
      <div className="bg-white border border-border rounded-card p-4">
        {jobs.map((j) => (
          <div key={j.id} className="flex justify-between text-sm py-2.5 border-b border-border last:border-0">
            <span>{j.id.slice(0, 6)}… · {j.category.name}</span>
            <span className="text-muted">{j.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
