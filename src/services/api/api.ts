import axios from "axios";
import {
  ADD_DEVICE_TO_COMPANY,
  BASE_URL,
  CREATE_COMPANY_LOCAL,
  DELETE_COMPANY_DEVICES,
  DELETE_COMPANY_LOCAL,
  DEVICES_AVAILABLE,
  FIND_ALL_COMPANY_DEVICES,
  FIND_COMPANY_LOCALS,
  FORGOT_PASSWORD,
  INSERT_VALUE_TO_COMPANY_DEVICE,
  OVERVIEW,
  SIGN_IN,
  SIGN_UP,
  UPDATE_COMPANY_LOCAL,
  PROFILE,
  UPDATE_COMPANY_DEVICE,
} from "./constants";
import {
  CompanyDeviceData,
  ForgotPasswordData,
  SignInData,
  SignUpData,
  UpdateProfileData,
} from "../../validations/validation.interfaces";
import {
  CreateCompanyLocal,
  DeleteCompanyDevice,
  InsertValueToCompanyDevice,
  UpdateCompanyLocal,
} from "../../contexts/Company/Company.interfaces";
import { UpdateBody, UpdateQueryParams } from "./api.interface";

export const signUp = async (body: SignUpData, headers: any) => {
  return await axios.post(BASE_URL + SIGN_UP, body, headers);
};

export const signIn = async (body: SignInData, headers: any) => {
  return await axios.post(BASE_URL + SIGN_IN, body, headers);
};

export const forgotPassword = async (
  body: ForgotPasswordData,
  headers: any
) => {
  return await axios.post(BASE_URL + FORGOT_PASSWORD, body, headers);
};

export const updateProfile = async (body: UpdateProfileData, headers: any) => {
  return await axios.put(BASE_URL + PROFILE, body, headers);
};

export const findDevicesAvailable = async (headers: any) => {
  return await axios.get(BASE_URL + DEVICES_AVAILABLE, headers);
};

export const findCompanyLocals = async (headers: any) => {
  return await axios.get(BASE_URL + FIND_COMPANY_LOCALS, headers);
};

export const createCompanyLocal = async (
  body: CreateCompanyLocal,
  headers: any
) => {
  return await axios.post(BASE_URL + CREATE_COMPANY_LOCAL, body, headers);
};

export const updateCompanyLocal = async (
  body: UpdateCompanyLocal,
  headers: any,
  id: number
) => {
  return await axios.put(BASE_URL + UPDATE_COMPANY_LOCAL + id, body, headers);
};

export const deleteCompanyLocal = async (headers: any, id: number) => {
  return await axios.delete(BASE_URL + DELETE_COMPANY_LOCAL + id, headers);
};

export const addDeviceToCompany = async (
  body: CompanyDeviceData,
  headers: any,
  id: number
) => {
  return await axios.post(BASE_URL + ADD_DEVICE_TO_COMPANY + id, body, headers);
};

export const findAllCompanyDevices = async (headers: any, id: number) => {
  return await axios.get(BASE_URL + FIND_ALL_COMPANY_DEVICES + id, headers);
};

export const deleteCompanyDevice = async (
  body: DeleteCompanyDevice,
  headers: any
) => {
  return await axios.delete(BASE_URL + DELETE_COMPANY_DEVICES, {
    headers: headers,
    data: body,
  });
};

export const insertValueToCompanyDevice = async (
  body: InsertValueToCompanyDevice,
  headers: any,
  deviceId: number
) => {
  return await axios.post(
    BASE_URL + INSERT_VALUE_TO_COMPANY_DEVICE + deviceId,
    body,
    headers
  );
};

export const overview = async (headers: any, id: number) => {
  return await axios.get(BASE_URL + OVERVIEW + id, headers);
};

export const findProfile = async (headers: any) => {
  return await axios.get(BASE_URL + PROFILE, headers);
};

export const updateCompanyDevice = async (
  body: UpdateBody,
  header: any,
  query: UpdateQueryParams
) => {
  return await axios.put(BASE_URL + UPDATE_COMPANY_DEVICE, body, {
    headers: header.headers,
    params: query,
  });
};
