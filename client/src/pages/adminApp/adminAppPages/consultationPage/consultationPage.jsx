import  { useState } from "react";
import { Paper, Title } from "@mantine/core";
<<<<<<< HEAD
import SearchAndDataTable from "./SearchAndDataTable";
const dataa = [
  { date: "2023-08-27", poste: "Matin", nomPrenom: "John Doe" },
  { date: "2023-08-28", poste: "Nuit", nomPrenom: "Jane Smith" },
  // Add more data entries
];


=======
import ConsultationTable from "components/consultationTable";
>>>>>>> ac456eb50a1e96a9840993341daa7651f5185a95
export default function ConsultationPage() {

  
  return (
    <div>
      <Paper shadow="sm" radius="md" p="sm" withBorder my={20}>
        <Title>Tableau de fiches</Title>
         <ConsultationTable/>
      </Paper>
    </div>
  );
}
