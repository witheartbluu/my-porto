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
        ← Back
      </Link>

      <h1 className="mt-4 text-4xl md:text-6xl font-bold">{work.title}</h1>
      <h1 className="mt-4 text-xl md:text-2xl font-semibold text-[#3A328A] opacity-75">
        {work.role}
      </h1>
      <div className="mt-3 flex flex-wrap items-center gap-12 text-sm text-black/50">
        {work.duration && (
          <span>
            Duration{" "}
            <div className="font-semibold text-lg">{work.duration}</div>
          </span>
        )}
        {work.category && (
          <span>
            Category
            <div className="font-semibold text-lg">{work.category}</div>
          </span>
        )}
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
