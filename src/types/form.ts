export interface UploadFileForm {
  [key: string]: File | null;
}

export type TField<T> = {
  name: keyof T;
  label: string;
  placeholder: string;
  min?: string;
  max?: string;
  rules: {
    required: string;
    pattern: {
      value: RegExp;
      message: string;
    };
  };
  ariaLabel: string;
};

export enum MutationType {
  Create = 'create',
  Edit = 'edit',
}
