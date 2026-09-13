import { prisma } from "@/lib/prisma";
import CompleteButton from "./CompleteButton";
import PayButton from "./PayButton";

const statusLabel: Record<string, string> = {
  OPEN: "Căutăm prestator",
  MATCHED: "Oferte trimise",
  ACCEPTED: "Acceptat",
  COMPLETED: "Finalizat",
  CANCELLED: "Anulat",
  DISPUTED: "Disputat",
};

export default async function CustomerJobsPage() {
  const jobs = await prisma.job.findMany({
    include: { category: true, city: true, area: true, booking: { include: { provider: true, payment: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pt-4">
      <h2 className="font-serif text-[22px] font-medium mb-4">Cererile tale</h2>
      {jobs.length === 0 && <div className="text-center text-muted text-sm py-10">Nu ai nicio cerere activă încă.</div>}
      <div className="flex flex-col gap-3">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white border border-border rounded-card p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="font-semibold text-[15px]">{job.category.name}</div>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-forestLight text-forestDark">
                {statusLabel[job.status] ?? job.status}
              </span>
            </div>
            <p className="text-[13px] text-muted mt-1">{job.description}</p>
            <p className="text-[13px] text-muted mt-1.5">
              {job.area?.name ?? ""}, {job.city.name} · {job.preferredWhen}
              {job.budgetAmount ? ` · buget ${job.budgetAmount} lei` : ""}
            </p>

            {job.booking && job.booking.status === "CONFIRMED" && !job.booking.payment && (
              <PayButton bookingId={job.booking.id} />
            )}

            {job.booking && job.booking.status === "CONFIRMED" && job.booking.payment?.status === "PENDING" && (
              <div className="text-xs text-muted mt-3">Plata este în curs de procesare la Stripe...</div>
            )}

            {job.booking && job.booking.status === "CONFIRMED" && job.booking.payment?.status === "HELD" && (
              <CompleteButton bookingId={job.booking.id} />
            )}

            {job.booking?.payment && job.booking.payment.status === "RELEASED" && (
              <div className="bg-forestLight rounded-xl p-3.5 mt-3 text-[13px] text-forestDark">
                <div className="flex justify-between py-1">
                  <span>Plată totală</span>
                  <span>{job.booking.payment.amountTotal} lei</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Comision platformă ({job.booking.payment.commissionPercentApplied}%)</span>
                  <span>-{job.booking.payment.platformCommissionAmount} lei</span>
                </div>
                <div className="flex justify-between py-1.5 font-bold border-t border-border mt-1">
                  <span>Încasat de prestator</span>
                  <span>{job.booking.payment.providerPayoutAmount} lei</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
