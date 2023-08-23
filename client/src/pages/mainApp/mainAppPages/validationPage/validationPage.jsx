import { Transition, Paper, Title } from "@mantine/core";
import { Table4 } from "components/tables";
import { useEffect, useState } from "react";
import { TextEditor } from "components/richtexteditor/editor";
import PosteSelection from "components/postSelection/posteSelection";
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
            <Title order={4}>{" Validation"}</Title>
            <PosteSelection />
          </Paper>
        </div>,
      ]}
    </Transition>
  );
}
