import { Part, PARTS_CATEGORIES, PartCategory } from "./types";

const OTHERS: PartCategory = "Lainnya";
const INTERIOR: PartCategory = "Aksesoris Interior";
const EKSTERIOR: PartCategory = "Aksesoris Eksterior";

export function orderCategories(parts: Part[]): PartCategory[] {
  const count = (category: PartCategory) => parts.filter((p) => p.kategori.includes(category)).length;
  const sorted = PARTS_CATEGORIES.filter((c) => c !== OTHERS).sort((a, b) => count(b) - count(a));

  const interiorIdx = sorted.indexOf(INTERIOR);
  const eksteriorIdx = sorted.indexOf(EKSTERIOR);
  if (interiorIdx !== -1 && eksteriorIdx !== -1) {
    const [first, second] = interiorIdx < eksteriorIdx ? [INTERIOR, EKSTERIOR] : [EKSTERIOR, INTERIOR];
    const rest = sorted.filter((c) => c !== second);
    rest.splice(rest.indexOf(first) + 1, 0, second);
    return [...rest, OTHERS];
  }
  return [...sorted, OTHERS];
}
