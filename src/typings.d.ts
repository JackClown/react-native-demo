declare module '@/utils/AnalyticsUtil';

declare const window: any;

declare type ArgsType<T> = T extends (...args: infer U) => any ? U : never;

declare type PromiseType<T> = T extends (...args: any) => Promise<infer U> ? U : never;

declare interface LabeledValue<T extends string | number = string | number> {
  label: string;
  value: T;
}

declare interface User {
  id: string;
  name: string;
  mobile: string;
  avatar: string;
  authorities: string[];
}

declare interface ReduxState {
  user: User;
}
