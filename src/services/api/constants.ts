export const BASE_URL: string = import.meta.env.VITE_API_URL;
export const SIGN_IN: string = "/auth/signin";
export const SIGN_UP: string = "/auth/signup";
export const FORGOT_PASSWORD: string = "/auth/forgotpassword";
export const PROFILE: string = "/company/profile";
export const DEVICES_AVAILABLE: string = "/devices/available";
export const FIND_COMPANY_LOCALS: string = "/companylocals/find";
export const CREATE_COMPANY_LOCAL: string = "/companyLocals/create";
export const UPDATE_COMPANY_LOCAL: string = "/companylocals/update/";
export const DELETE_COMPANY_LOCAL: string = "/companyLocals/delete/";
export const ADD_DEVICE_TO_COMPANY: string = "/companydevices/create/";
export const FIND_ALL_COMPANY_DEVICES: string = "/companydevices/all/";
export const DELETE_COMPANY_DEVICES: string = "/companydevices/remove";
export const INSERT_VALUE_TO_COMPANY_DEVICE: string =
  "/companydevicesinfo/insertvalue/";
export const OVERVIEW: string = "/companydevicesinfo/overview/";
export const UPDATE_COMPANY_DEVICE: string = "/companydevices/update/";
