import React, { useState, useEffect, useRef } from "react";
import { Transition ,Paper,Title} from "@mantine/core";
import { Table3 } from "components/tables";
export default function CisaillementPage() {
  const [inputValue, setInputValue] = useState("");
  const inputValueRef = useRef("");
  const [mounted, setMounted] = useState(false);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    inputValueRef.current = event.target.value;
  };

  useEffect(() => {
    setMounted(true)
   
  }, []);

  return (
    <Transition
        mounted={mounted}
        transition="slide-left"
        duration={200}
        timingFunction="ease"
      >
        {(styles) => 
    <div style={styles} >
      {Array.from({ length: 4 }).map((_, index) => (
        <Paper key={index} shadow="sm" radius="md" p="sm" withBorder my={20}>
        <Title order={4}>{"Validation N̊" + (index + 1)}</Title>
        
         
            <Table3 index = {index}/>
     
        </Paper>
      ))}
    </div>}
    </Transition>
  );
}
