
import { Paper, Title } from '@mantine/core';
import SearchForm from './tableSearch';
export default function ConsultationPage() {
  return (
    <div>
      <Paper shadow="sm" radius="md" p="sm" withBorder my={20}>
        <Title>ConsultationPage</Title>
      <SearchForm />
      </Paper>
    </div>
  );
}
