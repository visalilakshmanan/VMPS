import React, { useState, useEffect } from "react";
import filterToggle from "../store/filterToggle";
import axios from "axios";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IoSearch } from "react-icons/io5";
import { Button,TextField,Box,Flex,Select } from "@radix-ui/themes";

function Categories({setValue,selectCategory,searchValue}) {
  const { status,toggleStatus} = filterToggle();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      const response = await axios.get(
        "https://myhitech.digitalmantraaz.com/api/categorys"
      );
      setCategories(response.data); // Ensure API returns an array
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  return (
    <>
     <Box className="search" width="100%" style={{position:"sticky",top:"75px",zIndex:"2",background:"#0090ff"}}>
                <TextField.Root placeholder="Search the docs…" size="2" value={searchValue} onChange={(e)=>setValue(e.target.value)}>
                    <TextField.Slot>
                        <IoSearch size="14"/>  
                    </TextField.Slot>
                </TextField.Root>
            </Box>
    <div className=" flex justify-between" style={{position:"sticky",top:'120px',marginTop:"10px",zIndex:"2"}}>

 
    <Select.Root 
  defaultValue="all"  // Show "All" by default
  onValueChange={(value) => selectCategory(value)}
>
  <Select.Trigger />  {/* This will show "All" by default */}
  <Select.Content>
    <Select.Group>
      <Select.Item value="all">All</Select.Item> 
      {categories.map((category, index) => (
        <Select.Item value={category.id.toString()} key={index}>
          {category.title}
        </Select.Item>
      ))}
    </Select.Group>
  </Select.Content>
</Select.Root>



<Button onClick={toggleStatus}>{status?"*":"Filter"}</Button>



   
    </div>
    </>
  );
}

export default Categories;
