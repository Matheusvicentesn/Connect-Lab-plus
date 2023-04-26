import { UpdateBody, UpdateQueryParams } from "../../services/api/api.interface";
import { CompanyDeviceData, UpdateProfileData } from "../../validations/validation.interfaces";

export interface CompanyProviderProps {
  children: React.ReactNode;
}

export interface DevicesAvailable {
  id: number;
  name: string;
}

export interface CreateCompanyLocal {
  name: string;
  latitude: number;
  longitude: number;
}

export interface CompanyLocal extends CreateCompanyLocal {
  id: number;
}

export interface UpdateCompanyLocal {
  name?: string;
  latitude?: number;
  longitude?: number;
}

export interface CompanyDevice {
  id: number;
  nickname: string;
  name: string;
  type: string;
  status: boolean;
  macAddress: string;
  createdAt: Date;
}



export interface DeleteCompanyDevice {
  companyLocalId: number;
  deviceId: number;
}

export interface InsertValueToCompanyDevice {
  value: number;
}

export interface OverviewData{
  id: number;
  nickname: string;
  value: number;
  createdAt: string;
}

export interface ProfileData{
  name: string;
  cnpj: string;
  owner: string;
  email: string;
  phone: string;
}

export interface CompanyType {
  isLoading: boolean;
  profileUpdated: boolean;
  handleUpdateProfile: (body: UpdateProfileData) => Promise<void>;
  devicesAvailable: DevicesAvailable[];
  handleDevicesAvailable: () => Promise<void>;
  handleCreateCompanyLocal: (body: any) => Promise<void>;
  companyLocals: CompanyLocal[];
  handleCompanyLocals: () => Promise<void>;
  handleUpdateCompanyLocal: (
    body: UpdateCompanyLocal,
    localId: number
  ) => Promise<void>;
  handleDeleteCompanyLocal: (localId: number) => Promise<void>;
  handleAddDeviceToCompany: (
    body: CompanyDeviceData,
    localId: number
  ) => Promise<void>;
  companyDevices: CompanyDevice[];
  handleGetAllCompanyDevices: (localId: number) => Promise<void>;
  handleDeleteCompanyDevice: (body: DeleteCompanyDevice) => Promise<void>;
  handleInsertValueToCompanyDevice: (
    body: InsertValueToCompanyDevice,
    deviceId: number
  ) => Promise<void>;
  handleOverview: (localId: number) => Promise<void>;
  overviewData: OverviewData[]; 
  handleCurrentLocal: (localId: number) => void;
  currentLocal: number;
  error: boolean;
  handleError: () => void;
  profileData: ProfileData;
  handleProfile: () => Promise<void>;
  handleUpdateCompanyDevice: (body: UpdateBody, query: UpdateQueryParams) => Promise<void>;
  message: string;
  handleClearMessage: () => void;
}
