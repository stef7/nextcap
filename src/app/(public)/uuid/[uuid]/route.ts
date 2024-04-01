import { getAnyFolderEntryByUuid } from "@/cms/api";

export async function GET(request: Request, { params }: { params: { uuid: string } }) {
  return await getAnyFolderEntryByUuid(params.uuid)
    .then((data) => {
      return Response.redirect(new URL(data.uri, request.url));
    })
    .catch((error) => {
      return Response.error();
      return Response.json({ error: error?.message || error }, { status: 500 });
    });
}
