export interface ILoginUser {
  email: string;
  password: string;
}

export interface IAuthUser {
  refresh: string;
  access: string;
  user: {
    id: string;
    email: string;
  };
}

export interface IRegisterUser extends ILoginUser {
  firstName: string;
  lastName: string;
  phone: string;
  confirmPassword: string;
  isAgreeTerms?: boolean;
  isReceiveNewsletters?: boolean;
}

export interface IActiveUser {
  uidb64: string | null;
  token: string | null;
}
