// import Image from "next/image";
import Hero from "./hero/page";
import NavBar from "./components/navbar";
import Footer from "./components/footer";

export default function Home() {
  // console.log("What am I? -- SERVER?")
  return (
    <>
      <Hero />
    </>
  );
}

// app/layout.tsx
// import "./globals.css";
// import NavBar from "./components/navbar";
// import Footer from "./components/footer";

// export const metadata = { title: "My Portfolio" };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="antialiased">
//         <NavBar />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }
