// import Image from "next/image";
import Hero from "./components/hero";
import NavBar from "./components/navbar";
import Footer from "./components/footer";

export default function Home() {
  // console.log("What am I? -- SERVER?")
  return (
    <>
      <NavBar />
      <Hero />
      <Footer />
    </>
  );
}
