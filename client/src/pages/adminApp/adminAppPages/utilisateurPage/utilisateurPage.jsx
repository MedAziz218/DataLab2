import { Paper, Title } from '@mantine/core';
import ExampleWithProviders from 'components/userstable/userstable';
export default function UtilisateurPage() {
  return (
    <div>
      <Paper shadow="sm" radius="md" p="sm" withBorder my={20}>
        <Title>UtilisateurPage</Title>
    <ExampleWithProviders/>
      </Paper>
    </div>
  );
}
