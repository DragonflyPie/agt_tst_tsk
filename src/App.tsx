import "./style.css";
import Map from "./components/map/Map";
import Form from "./components/form/Form";
import { useAppDispatch } from "./redux/hooks";
import { fetchShapes } from "./redux/shapesSlice";
import { useEffect } from "react";
import ShapeList from "./components/shapes/ShapeList";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchShapes());
  }, [dispatch]);

  return (
    <>
      <Map />
      <Form />
      <ShapeList />
    </>
  );
}

export default App;
