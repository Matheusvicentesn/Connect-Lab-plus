import { useEffect, useState } from "react";
import { CompanyContext } from "./Company.context";
import {
  CompanyDevice,
  CompanyLocal,
  CompanyProviderProps,
  CompanyType,
  CreateCompanyLocal,
  DeleteCompanyDevice,
  DevicesAvailable,
  InsertValueToCompanyDevice,
  OverviewData,
  ProfileData,
  UpdateCompanyLocal,
} from "./Company.interfaces";
import {
  addDeviceToCompany,
  createCompanyLocal,
  deleteCompanyDevice,
  deleteCompanyLocal,
  findAllCompanyDevices,
  findCompanyLocals,
  findDevicesAvailable,
  findProfile,
  insertValueToCompanyDevice,
  overview,
  updateCompanyDevice,
  updateCompanyLocal,
  updateProfile,
} from "../../services/api/api";
import {
  CompanyDeviceData,
  UpdateProfileData,
} from "../../validations/validation.interfaces";
import { useNavigate } from "react-router-dom";
import {
  UpdateBody,
  UpdateQueryParams,
} from "../../services/api/api.interface";
import { useAuthentication } from "../Authentication/UseAuthentication";

export const CompanyProvider: React.FC<CompanyProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileUpdated, setProfileUpdated] = useState<boolean>(false);
  const [devicesAvailable, setDevicesAvailable] = useState<DevicesAvailable[]>(
    []
  );

  const [companyLocals, setCompanyLocals] = useState<CompanyLocal[]>([]);
  const [companyDevices, setCompanyDevices] = useState<CompanyDevice[]>([]);
  const [overviewData, setOverviewData] = useState<OverviewData[]>([]);
  const [currentLocal, setCurrentLocal] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    cnpj: "",
    email: "",
    owner: "",
    phone: "",
  });

  const user = localStorage.getItem("TOKEN");

  const navigate = useNavigate();
  const headerConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user}`,
    },
  };
  const { handleLogout } = useAuthentication();

  const handleUpdateProfile = async (body: UpdateProfileData) => {
    setIsLoading(true);
    await updateProfile(body, headerConfig)
      .then((response) => {
        setError(false);
        alert(response.data.message);

        setProfileUpdated(true);
        setIsLoading(false);
        handleLogout();
      })
      .catch((error) => {
        if (error.response.status != 400) {
          alert(error.data.message);
        } else {
          alert("Ocorreu um erro ao atualizar, tente novamente");
        }
        setProfileUpdated(false);
        setIsLoading(false);
      });
  };

  const handleDevicesAvailable = async () => {
    setIsLoading(true);
    await findDevicesAvailable(headerConfig)
      .then((response: any) => {
        setDevicesAvailable(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleCreateCompanyLocal = async (body: CreateCompanyLocal) => {
    await createCompanyLocal(body, headerConfig)
      .then((response: any) => {
        setIsLoading(false);
        alert(response.data.message);
      })
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      });
  };

  const handleCompanyLocals = async () => {
    setIsLoading(true);
    await findCompanyLocals(headerConfig)
      .then((response: any) => {
        currentLocal == 0 ? setCurrentLocal(-1) : setCurrentLocal(currentLocal);
        setCompanyLocals(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateCompanyLocal = async (
    body: UpdateCompanyLocal,
    localId: number
  ) => {
    setIsLoading(true);
    await updateCompanyLocal(body, headerConfig, localId)
      .then((response) => {
        alert(response.data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      });
  };

  const handleDeleteCompanyLocal = async (localId: number) => {
    setIsLoading(true);
    await deleteCompanyLocal(headerConfig, localId)
      .then((response: any) => {
        alert(response.data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      });
  };

  const handleAddDeviceToCompany = async (
    body: CompanyDeviceData,
    localId: number
  ) => {
    setIsLoading(true);
    await addDeviceToCompany(body, headerConfig, localId)
      .then((response: any) => {
        setIsLoading(false);
        alert(response.data.message);
        handleGetAllCompanyDevices(currentLocal);
      })
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      });
  };

  const handleGetAllCompanyDevices = async (localId: number) => {
    setIsLoading(true);
    await findAllCompanyDevices(headerConfig, localId)
      .then((response: any) => {
        setCompanyDevices(response.data);
        setIsLoading(false);
        navigate("/devices");
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteCompanyDevice = async (body: DeleteCompanyDevice) => {
    setIsLoading(true);
    await deleteCompanyDevice(body, headerConfig.headers)
      .then((response) => {
        alert(response.data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      });
  };

  const handleInsertValueToCompanyDevice = async (
    body: InsertValueToCompanyDevice,
    deviceId: number
  ) => {
    setIsLoading(true);
    await insertValueToCompanyDevice(body, headerConfig, deviceId)
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleOverview = async (localId: number) => {
    setIsLoading(true);
    await overview(headerConfig, localId)
      .then((response: any) => {
        setOverviewData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.data.code == 404) {
          setOverviewData([]);
        }
        setIsLoading(false);
      });
  };

  const handleProfile = async () => {
    setIsLoading(true);
    await findProfile(headerConfig)
      .then((response: any) => {
        setProfileData(response.data);
        setError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setMessage(error.response.data.message);
        setError(true);
      });
  };

  const handleUpdateCompanyDevice = async (
    body: UpdateBody,
    query: UpdateQueryParams
  ) => {
    setIsLoading(true);
    await updateCompanyDevice(body, headerConfig, query)
      .then((response) => {
        alert(response.data.message);
        setError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
        setError(true);
        setIsLoading(false);
      });
  };

  const handleCurrentLocal = (localId: number) => {
    setCurrentLocal(localId);
  };

  const handleError = () => {
    setError(false);
  };

  const handleClearMessage = () => {
    setMessage("");
  };

  useEffect(() => {
    if (user) {
      handleProfile();
      handleCompanyLocals();
    }
  }, [user]);

  const companyContextValue: CompanyType = {
    isLoading,
    profileUpdated,
    handleUpdateProfile,
    handleDevicesAvailable,
    devicesAvailable,
    handleCreateCompanyLocal,
    companyLocals,
    handleCompanyLocals,
    handleUpdateCompanyLocal,
    handleDeleteCompanyLocal,
    handleAddDeviceToCompany,
    handleGetAllCompanyDevices,
    companyDevices,
    handleDeleteCompanyDevice,
    handleInsertValueToCompanyDevice,
    handleOverview,
    overviewData,
    handleCurrentLocal,
    currentLocal,
    error,
    handleError,
    profileData,
    handleProfile,
    handleUpdateCompanyDevice,
    message,
    handleClearMessage,
  };

  return (
    <CompanyContext.Provider value={companyContextValue}>
      {children}
    </CompanyContext.Provider>
  );
};
