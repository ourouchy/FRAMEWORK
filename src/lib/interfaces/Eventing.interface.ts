export type Callback = () => void;


export interface IEventing {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void
}