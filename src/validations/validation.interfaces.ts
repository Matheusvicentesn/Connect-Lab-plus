export interface ForgotPasswordData {
  email: string;
}

export interface SignInData extends ForgotPasswordData {
  password: string;
}

export interface SignUpData extends SignInData {
  name: string;
  cnpj: string;
  owner: string;
  phone: string;
  passwordConfirmation: string;
}

export interface UpdateProfileData {
  phone?: string;
  password?: string;
  passwordConfirmation?: string;
}

export interface CompanyLocalData {
  name: string;
  latitude: number;
  longitude: number;
}

export interface CompanyDeviceData {
  deviceId: number;
  macAddress: string;
  status: boolean;
  nickname: string;
}

export interface UpdateCompanyLocal {
  name?: string;
  latitude?: number;
  longitude?: number;
}
