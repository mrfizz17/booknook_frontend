import Hero from "@/components/home/Hero";
import Marquees from "@/components/home/Marquees";
import NewArrivals from "@/components/home/NewArrivals";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/new-arrival`,
    {
      cache:'no-store'
    }
  );
  const data = await res.json();

  return (
    <>
      <Hero />
      <Marquees />
      <NewArrivals book={data}/>
    </>
  );
}
