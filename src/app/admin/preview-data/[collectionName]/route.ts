import { getPreviewData } from "@/cms/api";

export async function GET(_request: Request, { params }: { params: { collectionName: string } }) {
  const data = await getPreviewData(params.collectionName);

  return Response.json(data);
}
