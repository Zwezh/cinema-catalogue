export type ToastType = 'success' | 'danger';

export type Toast = {
  readonly type: ToastType;
  readonly translateKey: string;
  readonly translateParams?: { [key: string]: string };
  readonly delay?: number;
};
