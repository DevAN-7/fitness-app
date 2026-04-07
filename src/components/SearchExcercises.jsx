import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";

import { fetchData, excerciseOptions } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExcercises = ({ setExcercises, bodyPart, setBodyPart }) => {
  const [searchedTerm, setSearchedTerm] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchBodyPartsData = async () => {
      const bodyPartsData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/bodyPartList`,
        excerciseOptions,
      );
      setBodyParts(["all", ...bodyPartsData]);
    };
    fetchBodyPartsData();
  }, []);

  const handleSearch = async () => {
    if (!searchedTerm) return;

    let offset = 0;
    const allExcercises = [];

    for (let i = 0; i < 5; i++) {
      const searchResult = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises?offset=${offset}`,
        excerciseOptions,
      );

      allExcercises.push(...searchResult);
      offset += 10;
      console.log(offset);
    }
    console.log(allExcercises);
    const searchedExcercises = allExcercises.filter(
      (excecise) =>
        excecise.name.toLowerCase().includes(searchedTerm) ||
        excecise.target.toLowerCase().includes(searchedTerm) ||
        excecise.bodyPart.toLowerCase().includes(searchedTerm) ||
        excecise.equipment.toLowerCase().includes(searchedTerm),
    );
    console.log(searchedExcercises);
    setSearchedTerm("");
    setExcercises(searchedExcercises);
  };

  return (
    <Stack alignItems="center" justifyContent="center" mt="37px" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" }, textAlign: "center" }}
        mb="50px"
      >
        Awesome Excercises You <br />
        Should Know
      </Typography>

      <Box mb="72px" position="relative">
        <TextField
          sx={{
            input: {
              fontWeight: "700",
            },

            width: { lg: "800px", xs: "350px" },
            backgroundColor: "#fff",
          }}
          placeholder="Search Excercises"
          type="text"
          value={searchedTerm}
          onChange={(e) => {
            setSearchedTerm(e.target.value.toLowerCase());
          }}
        />
        <Button
          sx={{
            bgcolor: "#ff2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
          }}
          className="search-btn"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ width: "100%", p: "20px", position: "relative" }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyparts
        />
      </Box>
    </Stack>
  );
};

export default SearchExcercises;
