type ClientServerLeafProps<Props extends JSX.IntrinsicAttributes> = {
  isServer: boolean | undefined;
  client: React.FC<Props>;
  server: React.FC<Props>;
  props: Props;
};
export const ClientServerLeaf = (<Props extends JSX.IntrinsicAttributes>({
  isServer,
  client: ClientLeaf,
  server: ServerLeaf,
  props,
}: ClientServerLeafProps<Props>) =>
  isServer ? <ServerLeaf {...props} /> : <ClientLeaf {...props} />) satisfies React.FC<ClientServerLeafProps<{}>>;
