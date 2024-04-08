import { Box, List, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import ShapeItem from "./ShapeItem";
import Popup from "../common/Popup";

const ShapeList = () => {
  const state = useAppSelector((state) => state.shapes);

  return (
    <>
      <Box
        sx={{
          zIndex: 500,
          backgroundColor: "#FFF",
          position: "absolute",
          top: "1rem",
          left: "1rem",
          width: "20rem",
          minHeight: "4rem",
          padding: ".5rem",
          borderRadius: "5px",
          maxHeight: "33rem",
          overflowY: "auto",
        }}
      >
        <List
          sx={{
            padding: 0,
          }}
        >
          {state.status === "loading" && (
            <Typography align="center">Загрузка...</Typography>
          )}
          {state.data.map((shape) => (
            <ShapeItem
              key={shape.properties.id}
              id={shape.properties.id}
              name={shape.properties.name}
            />
          ))}
        </List>
      </Box>
      {state.error && <Popup text="Произошла ошибка при загрузке данных." />}
    </>
  );
};

export default ShapeList;
