import type { ModuleName, ModulesImport } from "@/cms/modules";
import { RichContentModule } from "@/components/modules/RichContentModule";

export type ModuleComponent<N extends ModuleName> = React.FC<NonNullable<ModulesImport>[number] & { type: N }>;

const moduleMap = {
  richContent: RichContentModule,
} as const satisfies { [K in ModuleName]: ModuleComponent<K> };

export const RenderModules: React.FC<{ modules: ModulesImport }> = ({ modules }) =>
  modules?.map((props, index) => {
    const { type } = props;
    const key = `${type} (${index + 1}/${modules.length})`;

    if (type && type in moduleMap) {
      const MappedModule = moduleMap[type] as ModuleComponent<typeof type>;
      return (
        <div data-testid="RenderModules" data-module-key={key} key={key}>
          <MappedModule {...props} type={type} />
        </div>
      );
    }

    const error = new Error(`Module not mapped to component: ${key}`);
    console.error(error);
    return <template data-module-error={error.stack ?? error} key={key} />;
  });
