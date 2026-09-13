import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import Link from "next/link";
import AcceptButton from "./AcceptButton";

export default async function ProviderDashboard() {
  const providerId = cookies().get("ajut_provider_id")?.value;

  if (!providerId) {
    return (
      <div className="pt-10 text-center">
        <p className="text-sm text-muted mb-4">Trebuie să intri în cont pentru a-ți vedea dashboard-ul.</p>
        <Link href="/prestator/login" className="inline-block bg-forest text-white font-semibold rounded-[10px] px-5 py-3">
          Intră în cont
        </Link>
      </div>
    );
  }

  const provider = await prisma.providerProfile.findUnique({ where: { id: providerId } });

  if (!provider) {
    return <div className="text-center text-muted text-sm py-10">Contul nu a fost găsit. Încearcă să te reautentifici.</div>;
  }

  const categoryLinks = await prisma.providerCategory.findMany({ where: { providerId: provider.id } });
  const categoryIds = categoryLinks.map((c) => c.categoryId);

  const matchedJobs = await prisma.job.findMany({
    where: { status: { in: ["OPEN", "MATCHED"] }, categoryId: { in: categoryIds } },
    include: { category: true, city: true, area: true },
    orderBy: { createdAt: "desc" },
  });

  const myBookings = await prisma.booking.findMany({
    where: { providerId: provider.id },
    include: { job: { include: { category: true } }, payment: true },
    orderBy: { confirmedAt: "desc" },
  });

  return (
    <div className="pt-4">
      <h2 className="font-serif text-[22px] font-medium mb-2">Bun venit înapoi, {provider.fullName}</h2>
      <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full ${
        provider.verificationStatus === "VERIFIED" ? "bg-forestLight text-forestDark" : "bg-amberLight text-[#8A6D2E]"
      }`}>
        {provider.verificationStatus === "VERIFIED" ? "✓ Prestator verificat" : "În așteptare verificare"}
      </span>

      <div className="grid grid-cols-2 gap-2.5 mt-4 mb-2">
        <div className="bg-white border border-border rounded-xl p-3.5">
          <div className="font-serif text-xl font-medium">{provider.earnings} lei</div>
          <div className="text-[11.5px] text-muted mt-0.5">câștiguri (net)</div>
        </div>
        <div className="bg-white border border-border rounded-xl p-3.5">
          <div className="font-serif text-xl font-medium">{provider.completedJobsCount}</div>
          <div className="text-[11.5px] text-muted mt-0.5">lucrări finalizate</div>
        </div>
      </div>

      <div className="text-sm text-muted font-medium mt-5 mb-2">Joburi noi pentru tine</div>
      {matchedJobs.length === 0 && (
        <div className="text-center text-muted text-sm py-6">Niciun job disponibil momentan.</div>
      )}
      <div className="flex flex-col gap-3">
        {matchedJobs.map((job) => (
          <div key={job.id} className="bg-white border border-border rounded-card p-4 shadow-sm">
            <div className="font-semibold text-[15px]">JOB NOU · {job.category.name}</div>
            <p className="text-[13px] text-muted mt-1">{job.area?.name ?? ""}, {job.city.name} · {job.preferredWhen}</p>
            <p className="text-[13px] text-muted">Buget client: {job.budgetAmount ? `${job.budgetAmount} lei` : "nespecificat"}</p>
            <AcceptButton jobId={job.id} providerId={provider.id} />
          </div>
        ))}

        {myBookings.map((b) => (
          <div key={b.id} className="bg-white border border-border rounded-card p-4 shadow-sm">
            <div className="flex justify-between">
              <div className="font-semibold text-[15px]">{b.job.category.name}</div>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-forestLight text-forestDark">
                {b.status}
              </span>
            </div>
            {b.payment && (
              <div className="text-[13px] text-muted mt-1">
                Încasat: {b.payment.providerPayoutAmount} lei (comision {b.payment.commissionPercentApplied}%)
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
