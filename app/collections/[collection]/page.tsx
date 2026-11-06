import { notFound } from "next/navigation";
import type { Category } from "../../catalog";
import CollectionClient from "./collection-client";

export function generateStaticParams() {
  return [{ collection: "sunglasses" }, { collection: "optical" }];
}

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const category: Category | undefined = collection === "sunglasses" ? "Sunglasses" : collection === "optical" ? "Optical" : undefined;

  if (!category) notFound();

  return <CollectionClient category={category} />;
}

