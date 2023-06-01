import { Box, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";

export default function SearchBar({ getVal }) {
  let [value, setValue] = useState("");
  let handleChange = (e) => {
    setValue(e.target.value);
  };
  let handleSubmit = () => {
    if (value === "") {
      return alert("Please Enter Something To Search");
    }
    getVal(value);
  };
  return (
    <Box display={"flex"} alignItems={"center"} ml="20px">
      <Input
        placeholder="Search"
        w="200px"
        size="sm"
        value={value}
        onChange={handleChange}
      />
      <Button size="sm" onClick={handleSubmit}>
        Search
      </Button>
    </Box>
  );
}
