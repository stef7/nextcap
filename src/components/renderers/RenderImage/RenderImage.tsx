import { ImageProps } from "next/image";
import { ClientServerLeaf } from "../ClientServerLeaf/ClientServerLeaf";
import { RenderImageOnClient } from "./RenderImageOnClient";
import { RenderImageOnServer } from "./RenderImageOnServer";

type OptionalKeys = "width" | "height";
export type RenderImageProps = Omit<ImageProps, "src" | "alt" | "width" | "height"> &
  Partial<Pick<ImageProps, OptionalKeys>> & {
    src: string | undefined;
    alt: string | undefined;
    width?: string | number;
    height?: string | number;
    isServer: boolean | undefined;
  };

export const RenderImage: React.FC<RenderImageProps> = (props) => (
  <ClientServerLeaf<RenderImageProps>
    isServer={props.isServer}
    props={props}
    client={RenderImageOnClient}
    server={RenderImageOnServer}
  />
);
