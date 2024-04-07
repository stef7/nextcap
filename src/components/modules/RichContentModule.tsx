import { RenderMarkdown } from "../renderers/RenderMarkdown/RenderMarkdown";
import type { ModuleComponent } from "../renderers/RenderModules/RenderModules";

export const RichContentModule: ModuleComponent<"richContent"> = ({ markdown }) => {
  return (
    <div className="p-container pi-containerInline">
      <RenderMarkdown markdown={markdown} />
    </div>
  );
};
