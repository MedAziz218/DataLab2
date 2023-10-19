import React, { useEffect, useState } from "react";
import { Paper, Title } from "@mantine/core";
import SearchAndDataTable from "./SearchAndDataTable";

const dataa = [
  { date: "2023-08-27", poste: "Matin", nomPrenom: "John Doe" },
  { date: "2023-08-28", poste: "Nuit", nomPrenom: "Jane Smith" },
  // Add more data entries
];


export default function ConsultationPage() {
  const [data,setData] = useState(dataa)
  
  return (
    <div>
      <Paper shadow="sm" radius="md" p="sm" withBorder my={20}>
        <Title>ConsultationPage</Title>
        <SearchAndDataTable data={data} />
      </Paper>
    </div>
  );
}
