import type { Metadata, ResolvingMetadata } from "next";

type ParamsBase = Record<string, string | string[] | undefined>;

export type GenerateStaticParams<
  ParentParams extends ParamsBase = {},
  Result extends ParamsBase[] = ParamsBase[],
> = (props: { params: ParentParams }) => Result | Promise<Result>;

export type PageProps<Params extends ParamsBase, SearchParams extends ParamsBase = ParamsBase> = {
  params: Params;
  searchParams: SearchParams;
};

export type InferPagePropsFromGSP<StaticParamsFn extends GenerateStaticParams<ParamsBase> = GenerateStaticParams<{}>> =
  PageProps<Awaited<ReturnType<StaticParamsFn>>[number]>;

export type InferParamsFromGSP<StaticParamsFn extends GenerateStaticParams<ParamsBase> = GenerateStaticParams<{}>> =
  InferPagePropsFromGSP<StaticParamsFn>["params"];

export type GenerateMetadata<Props extends PageProps<ParamsBase> = PageProps<{}>> = (
  props: Props,
  parent: ResolvingMetadata,
) => Metadata | Promise<Metadata>;

export type InferGenerateMetadataFromGSP<
  StaticParamsFn extends GenerateStaticParams<ParamsBase> = GenerateStaticParams<{}>,
> = GenerateMetadata<InferPagePropsFromGSP<StaticParamsFn>>;
