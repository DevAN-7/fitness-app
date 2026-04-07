import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import {
  excerciseOptions,
  fetchData,
  youtubeOptions,
} from "../utils/fetchData";

import Detail from "../components/Detail";
import ExcerciseVideos from "../components/ExcerciseVideos";
import SimilarExcercises from "../components/SimilarExcercises";

const ExcerciseDetail = () => {
  const [excerciseDetail, setExcerciseDetail] = useState({});
  const { id } = useParams();
  const [excerciseVideos, setExcerciseVideos] = useState([]);
  const [targetMuscleExcercises, setTargetMuscleExcercises] = useState([]);
  const [equipmentExcercises, setEquipmentExcercises] = useState([]);

  useEffect(() => {
    const fetchExcercieData = async () => {
      const excerciseDbUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      const excerciseDetailData = await fetchData(
        `${excerciseDbUrl}/exercises/exercise/${id}`,
        excerciseOptions,
      );
      setExcerciseDetail(excerciseDetailData);

      const excerciseVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${excerciseDetailData.name}`,
        youtubeOptions,
      );
      setExcerciseVideos(excerciseVideosData);

      const targetMuscleExcercisesData = await fetchData(
        `${excerciseDbUrl}/exercises/target/${excerciseDetailData.target}`,
        excerciseOptions,
      );
      setTargetMuscleExcercises(targetMuscleExcercisesData);
      const equipmentExcercisesData = await fetchData(
        `${excerciseDbUrl}/exercises/equipment/${excerciseDetailData.equipment}`,
        excerciseOptions,
      );
      setEquipmentExcercises(equipmentExcercisesData);
    };

    fetchExcercieData();
  }, [id]);

  return (
    <Box>
      <Detail excerciseDetail={excerciseDetail} />
      <ExcerciseVideos
        excerciseVideos={excerciseVideos.contents}
        name={excerciseDetail.name}
      />
      <SimilarExcercises
        targetMuscleExcercises={targetMuscleExcercises}
        equipmentExcercises={equipmentExcercises}
      />
    </Box>
  );
};

export default ExcerciseDetail;
