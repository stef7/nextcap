import { ErrorComponent } from "@/components/organisms/ErrorComponent";

export default function NotFound() {
  return <ErrorComponent code={ErrorComponent.StatusCodes.NOT_FOUND} />;
}
