import Hero from "@/components/home/Hero";
import Marquees from "@/components/home/Marquees";
import NewArrivals from "@/components/home/NewArrivals";

export default async function Home() {
  const res = await fetch("http://localhost:8000/api/new-arrival");
  const data = await res.json();

  return (
    <>
      <Hero />
      <Marquees />
      <NewArrivals book={data}/>
    </>
  );
}
