import { getCabins } from "@/app/_lib/data-service";

export async function GET(request) {
  try {
    const cabin = await getCabins();

    return Response.json({ cabin });
  } catch {
    return Response.json({ error: "Cabins cannot be found" }, { status: 404 });
  }
}
