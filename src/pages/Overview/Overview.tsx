import Map from "../../components/Maps/Maps";
import {
  BoxValueChildren,
  BoxValueContainer,
  CenterContent,
  Container,
  ContainerMapStyled,
  ContainerMiddle,
  ImgStyle,
  TempStyle,
} from "./Overview.style";
import { Box, Typography } from "@mui/material";
import { useCompany } from "../../contexts/Company/UseCompany";
import { useEffect, useState } from "react";
import {
  CompanyLocal,
  OverviewData,
} from "../../contexts/Company/Company.interfaces";
import { SensorGrafic } from "../../components/SensorGrafic/SensorGrafic";

interface result {
  date: string;
  value: number;
  nickname: string;
}

const mockedData = [
  { date: "2023-04-20", value: 10 },
  { date: "2023-04-21", value: 20 },
  { date: "2023-04-22", value: 15 },
  { date: "2023-04-23", value: 25 },
  { date: "2023-04-24", value: 18 },
];

export const Overview = () => {
  const { companyLocals, currentLocal, handleOverview, overviewData } =
    useCompany();
  const [atualLocal, setAtualLocal] = useState<CompanyLocal>({
    id: 0,
    latitude: 1,
    longitude: 1,
    name: "",
  });
  const [sensorValues, setSensorValues] = useState<any[]>([]);

  const handleCurrentLocal = () => {
    const local = companyLocals.find((local) => local.id === currentLocal);
    if (local) {
      setAtualLocal(local);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().substr(0, 10);
  };

  function transformArray(arr: OverviewData[]): result[] {
    const result: result[] = [];
    arr.forEach((subArr: any) => {
      const lastReading = subArr[subArr.length - 1];
      const nickname = subArr[0].nickname;
      const averageValue =
        subArr.reduce((acc: number, { value }) => acc + parseFloat(value), 0) /
        subArr.length;
      result.push({
        date: formatDate(lastReading.createdAt),
        value: averageValue,
        nickname: nickname,
      });
    });
    return result;
  }

  const flatValues = (sensorArrays: result[]): result[] => {
    return sensorArrays.flat();
  };

  useEffect(() => {
    handleCurrentLocal();
    if (currentLocal > 0 && currentLocal != atualLocal.id) {
      handleOverview(currentLocal);
    }
    if (overviewData.length > 0) {
      setSensorValues(flatValues(transformArray(overviewData)));
    }
  }, [companyLocals, currentLocal, overviewData.length]);

  if (currentLocal <= 0) {
    return <p>Selecione um local</p>;
  }

  if (overviewData.length > 0) {
    return (
      <Container>
        <Box sx={ContainerMiddle}>
          <CenterContent>
            <h3>Médias</h3>
            <Box sx={ContainerMiddle}>
              {sensorValues.length > 0 ? (
                <>
                  {sensorValues.map((item, i) => (
                    <Box key={i + "_box"} sx={BoxValueContainer}>
                      <img
                        key={i + "_img"}
                        style={ImgStyle}
                        src={
                          item.nickname.toUpperCase().includes("TEMPERATURA")
                            ? "public/temperature 1.png"
                            : "public/humidity.png"
                        }
                        alt={
                          item.nickname.toUpperCase().includes("TEMPERATURA")
                            ? "ícone temperatura"
                            : "ícone umidade"
                        }
                      />
                      <Box key={i + "_chBox"} sx={BoxValueChildren}>
                        <Typography key={i + "_typName"} sx={TempStyle}>
                          {item.nickname}
                        </Typography>
                        <Typography key={i + "_typValue"}>
                          {item.nickname.toUpperCase().includes("TEMPERATURA")
                            ? item.value.toFixed(2) + " ºC"
                            : item.value.toFixed(2) + " %"}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </>
              ) : (
                ""
              )}
            </Box>
          </CenterContent>
          <CenterContent>
            <Box>
              <Map
                latitude={atualLocal.latitude}
                longitude={atualLocal.longitude}
              />
            </Box>
          </CenterContent>
        </Box>
        <Box sx={ContainerMiddle}>
          <CenterContent>
            <h3>Histórico de consumo de Água</h3>
            <p>Em litros (L)</p>
            <SensorGrafic data={mockedData}></SensorGrafic>
          </CenterContent>
          <CenterContent>
            <h3>Histórico de Umidade do Solo</h3>
            <p>Em porcentagem</p>
            <SensorGrafic data={mockedData}></SensorGrafic>
          </CenterContent>
        </Box>
      </Container>
    );
  }

  return (
    <ContainerMapStyled>
      <Box>
        <h3>Localização</h3>
        <Map latitude={atualLocal.latitude} longitude={atualLocal.longitude} />
      </Box>
    </ContainerMapStyled>
  );
};
