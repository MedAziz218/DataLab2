import { useEffect, useState } from "react";
import { Textarea } from "@mantine/core";

export function TextEditor({compName = "observation"}) {
  const [value, setValue] = useState(JSON.parse(localStorage.getItem(compName))||"");
  useEffect(()=>{
    return ()=>{
      saveState()
    }
  })
  const saveState = ()=>{
    localStorage.setItem(compName,JSON.stringify(value))
  }
  return (
    <Textarea
      minRows={7}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      placeholder="observation"
    />
  );
}
