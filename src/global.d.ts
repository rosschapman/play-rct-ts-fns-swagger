declare namespace RT {
  type NonBodyParameter<P, BP> = Exclude<P, BP>;
  type ChildrenProps<Klass> = Parameters<Klass["props"]["children"]>[0];
  type ChildrenProp<Props, Prop> = ChildrenProps<Props>[Prop];
  type ActivePath = {
    path: string;
    name: string;
    operation: Operation;
  };
}
