import  { useState } from "react";
import { Paper, Title } from "@mantine/core";
import ConsultationTable from "components/consultationTable";
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
