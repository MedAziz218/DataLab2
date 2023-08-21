import { Transition, Paper, Title } from "@mantine/core";
import { Table4 } from "components/tables";
import { useEffect, useState } from "react";
import { FileInput } from "@mantine/core";
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
            <Title order={4}>{" Piece Jointe"}</Title>
            <FileInput
              placeholder="Pick file"
              label="Your resume"
              withAsterisk
            />
          </Paper>
        </div>,
        <div style={styles}>
          <Paper shadow="sm" radius="md" p="sm" withBorder my={20}>
            <Title order={4}>{"Notes"}</Title>
            <TextEditor compName="Notes"/>
          </Paper>
        </div>,
      ]}
    </Transition>
  );
}
