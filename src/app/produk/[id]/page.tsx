import { notFound, redirect } from "next/navigation";
import { getListingById } from "@/lib/store";
import { generateProductSlug } from "@/lib/types";

export default async function ProdukDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) notFound();

  // Redirect to new slug format: /tipe-warna-id
  const idParts = listing.id.split("-");
  const index = idParts[idParts.length - 1];
  const newSlug = generateProductSlug(listing.tipe, listing.warna, index);
  redirect(`/${newSlug}`);
}
