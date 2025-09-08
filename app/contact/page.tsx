export default function Contact() {
  return (
    <section id="contact" className="mx-20">
      <div className="container p-12">
        <h1 className="text-6xl font-bold">Let's Talk!</h1>
      </div>

      <div className="container px-12">
        <p>
          For questions, collaborations, or opportunities, contact me via the
          channels below. I usually reply within 24 hours.
        </p>
      </div>
      <div className="container px-12 mt-6 grid grid-cols-1 gap-x-16 gap-y-8 items-start">
        {/* Left column */}
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold">hi.aprilkusuma@gmail.com</h2>
          <a
            href="https://www.linkedin.com/in/aprillksm/"
            className="text-md font-medium underline underline-offset-4 text-black hover:text-[#3A328A]"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
        {/* Right column */}
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold">+62 8969 7191 353</h2>
          <a
            href="https://github.com/witheartbluu"
            className="text-md font-medium underline underline-offset-4 text-black hover:text-[#3A328A]"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
        <a
          href="/CV-Aprillia-Kusuma.pdf"
          download={"CV_Aprillia Kusuma"}
          className="w-full border rounded-3xl py-2 px-6 text-center font-medium hover:border-[#3A328A] text-black hover:text-[#3A328A] hover:scale-102 duration-100"
        >
          Download My Resume
        </a>
      </div>
    </section>
  );
}
