import type { Metadata, ResolvingMetadata } from "next";

type ParamsBase = Record<string, string | string[] | undefined>;

export type GenerateStaticParams<
  ParentParams extends ParamsBase = {},
  ResultParams extends ParamsBase = ParamsBase,
> = (props: { params: ParentParams }) => ResultParams[] | Promise<ResultParams[]>;

export type PageProps<Params extends ParamsBase, SearchParams extends ParamsBase = ParamsBase> = Readonly<{
  params: Params;
  searchParams: SearchParams;
}>;

export type InferPagePropsFromGSP<StaticParamsFn extends GenerateStaticParams<ParamsBase> = GenerateStaticParams<{}>> =
  PageProps<Awaited<ReturnType<StaticParamsFn>>[number]>;

export type GenerateMetadata<Props extends PageProps<ParamsBase> = PageProps<{}>> = (
  props: Props,
  parent: ResolvingMetadata,
) => Metadata | Promise<Metadata>;

export type InferGenerateMetadataFromGSP<
  StaticParamsFn extends GenerateStaticParams<ParamsBase> = GenerateStaticParams<{}>,
> = GenerateMetadata<InferPagePropsFromGSP<StaticParamsFn>>;
