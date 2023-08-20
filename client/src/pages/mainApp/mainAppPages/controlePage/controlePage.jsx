import { Button, Paper, Text, Title, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
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
        {(styles) => 
     
    <div style={styles}>
      {Array.from({ length: 10 }).map((key) => (
        <Paper key={key} shadow="sm" radius="md" p="sm" withBorder my={20}>
          <Title>Paper is the most basic ui component</Title>
          <Text>
            Use it to create cards, dropdowns, modals and other components that
            require background with shadow
          </Text>
        </Paper>
      ))}
    </div>
    
    }
   
    </Transition>,
     <Button onClick={()=>setMounted(!mounted)}>click</Button>]
  );
}
