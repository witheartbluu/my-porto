import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { works, type Work, type Category } from "@/app/lib/work";

export default function WorkDetail({
  params,
}: {
  params: { details: string };
}) {
  const work = works.find((w) => w.details === params.details);
  if (!work) return notFound();

  return (
    <article className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/works"
        className="inline-flex items-center gap-2 text-sm rounded-full border hover:scale-105 duration-100 px-3 py-2"
      >
        ←
      </Link>

      <h1 className="mt-4 text-4xl md:text-6xl font-bold">{work.title}</h1>
      <h1 className="mt-4 text-xl md:text-2xl font-semibold text-[#3A328A] opacity-75">
        {work.role}
      </h1>
      <div className="flex grid-cols-2 gap-x-8">
        <p className="mt-4 text-black opacity-50 text-sm font-semibold">
          {work.duration}
        </p>
        <p className="mt-4 opacity-50">|</p>
        <p className="mt-4 text-[#3A3282] opacity-75 text-sm font-semibold">
          {work.category}
        </p>
      </div>
      <div className="mt-6 relative overflow-hidden">
        <div className="relative aspect-[16/9]">
          <Image
            src={work.cover}
            alt={work.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
      {/* Description */}
      <p className="mt-12 text-lg font-md leading-8 text-justify">
        {work.description}
      </p>
      <div className="relative aspect-[16/9] mt-12">
        <Image
          src={work.image}
          alt={work.title}
          fill
          className="object-cover"
        />
      </div>
      {work.content && (
        <div className="mt-8 prose prose-gray max-w-none text-justify">
          <p>{work.content}</p>
        </div>
      )}
    </article>
  );
}
