export type ConfirmationModalData = {
  readonly title: string;
  readonly body: string;
  readonly confirmButton: string;
  readonly cancelButton: string;
  readonly type: 'danger' | 'success' | 'info' | 'warning' | 'primary' | 'secondary';
};
