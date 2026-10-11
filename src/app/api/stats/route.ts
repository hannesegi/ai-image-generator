import { getStats } from "@/lib/data";

export async function GET() {
  const stats = getStats();
  return Response.json(stats);
}
