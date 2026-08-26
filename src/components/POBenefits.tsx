export const PO_BENEFITS = [
  "Free upgrade fast charger 2000 W senilai jutaan rupiah",
  "Harga pelunasan lebih murah",
  "5 tahun free charging di semua cabang Omoway",
  "5 tahun free maintenance labor",
  "5 tahun free roadside assistance",
  "Gift PO (Helm, topi, kaos, plakat)",
];

export default function POBenefits({
  variant = "light",
  title = "Benefit PO",
}: {
  variant?: "light" | "dark";
  title?: string;
}) {
  const isDark = variant === "dark";

  return (
    <div
      className={
        isDark
          ? "rounded-2xl border border-white/10 bg-white/5 p-5"
          : "rounded-2xl border border-line bg-neutral-50 p-5"
      }
    >
      <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-black"}`}>
        {title}
      </h3>
      <ul className="mt-3 flex flex-col gap-2.5">
        {PO_BENEFITS.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2.5 text-sm">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-black">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3 w-3"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 5.29a1 1 0 010 1.415l-7.09 7.09a1 1 0 01-1.414 0L4.296 9.89a1 1 0 111.414-1.414l3.09 3.09 6.383-6.383a1 1 0 011.521.106z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className={isDark ? "text-white/80" : "text-black/70"}>
              {benefit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
