"use client";

import { useState } from "react";
import { Part, PartCategory } from "@/lib/types";
import CategoryCardsGrid from "./CategoryCardsGrid";
import PartsGrid from "./PartsGrid";

interface PartsPageClientProps {
  parts: Part[];
}

export default function PartsPageClient({ parts }: PartsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<PartCategory | "all">("all");

  return (
    <>
      <CategoryCardsGrid selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <PartsGrid parts={parts} selectedCategory={selectedCategory} />
    </>
  );
}
