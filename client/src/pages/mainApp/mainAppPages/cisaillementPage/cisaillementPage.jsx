
import React, { useState, useEffect, useRef } from 'react';
import { TextInput } from '@mantine/core';

export default function CisaillementPage() {

    const [inputValue, setInputValue] = useState('');
    const inputValueRef = useRef('');
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
      inputValueRef.current = event.target.value;
    };
  
    useEffect(() => {
      return () => {
        console.log('Component is being unmounted. Value:', inputValueRef.current);
      };
    }, []);
  
    return (
      <div>
        <TextInput
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type something..."
        />
        <p>Value: {inputValue}</p>
      </div>
    );
  }
  
