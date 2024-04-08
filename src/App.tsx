import "./style.css";
import Map from "./components/Map";
import Form from "./components/Form";
import { useAppDispatch } from "./redux/hooks";
import { fetchShapes } from "./redux/shapesSlice";
import { useEffect } from "react";
import ShapeList from "./components/ShapeList";

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
