import { NextResponse } from "next/server";
import { vocab } from "@/data/vocab";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const levelParam = searchParams.get("level");

  if (levelParam && ["1", "2", "3"].includes(levelParam)) {
    const level = Number(levelParam) as 1 | 2 | 3;
    return NextResponse.json(vocab.filter((v) => v.level === level));
  }

  return NextResponse.json(vocab);
}
