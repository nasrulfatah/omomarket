import { getAllListings } from "@/lib/store";
import HomeContent from "@/components/HomeContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const listings = await getAllListings();

  return <HomeContent listings={listings} />;
}
