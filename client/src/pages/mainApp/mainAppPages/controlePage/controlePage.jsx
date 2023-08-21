import { Button, Paper, Text, Title, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import { Table1,Table2 } from "components/tables";

export default function ControlePage() {
  const [mounted,setMounted] = useState(false)
  useEffect(()=>{setMounted(true)},[])
  return ([
    <Transition
        mounted={mounted}
        transition="slide-left"
        duration={200}
        timingFunction="ease"
      >
        {(styles) => [
     
    <div style={styles}>
      {Array.from({ length: 1 }).map((key) => (
        <Paper key={key} shadow="sm" radius="md" p="sm" withBorder my={20}>
          <Title order={4}>Paper is the most basic ui component</Title>
          <Table1/>
        </Paper>
      ))}
    </div>
    ,
    
    <div style={styles}>
      {Array.from({ length: 1 }).map((key) => (
        <Paper key={key} shadow="sm" radius="md" p="sm" withBorder my={20}>
          <Title order={4}>Paper is the most basic ui component</Title>
          <Table2/>
        </Paper>
      ))}
    </div>]
    }
   
    </Transition>,
     <Button onClick={()=>setMounted(!mounted)}>click</Button>]
  );
}
