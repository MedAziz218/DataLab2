import React from 'react';
import { Paper, Title } from '@mantine/core';
import SearchAndDataTable from './SearchAndDataTable';
const data = [
  { date: '2023-08-27', poste: 'Matin', nomPrenom: 'John Doe' },
  { date: '2023-08-28', poste: 'Nuit', nomPrenom: 'Jane Smith' },
  // Add more data entries
];


export default function ConsultationPage() {
  return (
    <div>
      <Paper shadow="sm" radius="md" p="sm" withBorder my={10}>
      <Title
          style={{
            fontSize: "24px", // Customize the font size
            fontWeight: "bold", // Customize the font weight
            color: "#333", // Customize the text color
          }}
        >
          ConsultationPage
        </Title>
      </Paper>
      <SearchAndDataTable data={data} />
    </div>
  );
}
