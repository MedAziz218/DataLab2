import { Transition, Paper, Title } from "@mantine/core";
import { Table5 } from "components/tables";
import { useEffect, useState } from "react";

import { TextEditor } from "components/richtexteditor/editor";
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
            <Title order={4}>{"Observation"}</Title>
            <Table5 />
          </Paper>
        </div>,

        <div style={styles}>
          <Paper shadow="sm" radius="md" p="sm" withBorder my={20}>
            <Title order={4}>{"Observations"}</Title>

            <TextEditor compName="observation"/>
          </Paper>
        </div>,
      ]}
    </Transition>
  );
}
