"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const categories = ["All", "Development", "Design", "AI Tools", "Data", "Marketing"];

export function CourseFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "All";

  function setCategory(category: string) {
    const params = new URLSearchParams(searchParams);
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/courses?${params.toString()}`);
  }

  return (
    <div className="my-6 flex flex-wrap gap-2">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={active === category ? "default" : "secondary"}
          className="cursor-pointer hover:bg-primary/20 transition-colors"
          onClick={() => setCategory(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}
