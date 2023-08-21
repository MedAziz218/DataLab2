import { Transition, Paper, Title } from "@mantine/core";
import { Table4 } from "components/tables";
import { useEffect, useState } from "react";

export default function MpPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Transition
      mounted={mounted}
      transition="slide-left"
      duration={200}
      timingFunction="ease"
    >
      {(styles) => [
        <div style={styles}>
          <Paper shadow="sm" radius="md" p="sm" withBorder my={20}>
            <Title order={4}>{"Matiere Premiere"}</Title>
            <Table4 />
          </Paper>
        </div>,
      ]}
    </Transition>
  );
}
