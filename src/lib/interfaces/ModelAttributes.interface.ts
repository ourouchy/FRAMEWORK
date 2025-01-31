export interface IModelAttributes<P> {
  get<K extends keyof P>(key: K): P[K];
  set(data: P): void;
  getAll(): P;
}