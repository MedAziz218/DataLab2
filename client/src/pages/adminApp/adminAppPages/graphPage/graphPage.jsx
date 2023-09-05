import { Box, Button, Paper, Select, Title, Grid } from "@mantine/core";
import RenderLineChart from "components/chart";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { getGraphData } from "apiCalls";
import { formatDateToYearMonthDay } from "utils";

export default function GraphPage() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [typeValue, setTypeValuee] = useState("poids");
  useEffect(() => {
    const params = {
      startDate: formatDateToYearMonthDay(startDate),
      endDate: formatDateToYearMonthDay(endDate),
    }
    // console.log("params: ",params)
    getGraphData(typeValue,params ).then((res) => {
      setData(res);
      // console.log("ress: ", res);
    });
  }, [startDate, endDate, typeValue]);
  return (
    <div style={{ height: "100%" }}>
      <Paper shadow="sm" radius="md" p="sm" withBorder>
        <Box
          shadow="sm"
          radius="md"
          p="sm"
          sx={{
            backgroundColor: "#f5f5f5",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box sx={{ display: "flex", marginLeft: "auto" }}>
            <Select
              label="type"
              value={typeValue}
              onChange={setTypeValuee}
              data={[
                { label: "Controle poids", value: "poids" },
                { label: "Controle S.A.P", value: "sap" },
                { label: "Dynamic Shear Backear OS", value: "os" },
                { label: "Dynamic Shear Backear MS", value: "ms" },
              ]}
            />
            <DateInput
              label="Date Debut"
              placeholder="Date input"
              value={startDate}
              onChange={setStartDate}
              clearable
            />
            <DateInput
              label="Date Fin"
              placeholder="Date input"
              value={endDate}
              onChange={setEndDate}
              clearable
            />

            <Button mt={24} ml={2}>
              {"Ok"}
            </Button>
          </Box>
        </Box>
      </Paper>

      <Paper shadow="sm" radius="md" p="sm" sx={{ height: "100%" }} withBorder>
        <Box sx={{ display: "flex", paddingBottom: 5 }}>
          <Title mr={50}>Courbes</Title>
        </Box>

        <Box h={"100%"} pb={10}>
          <RenderLineChart data={data} typeValue={typeValue}/>
        </Box>
      </Paper>
    </div>
  );
}
