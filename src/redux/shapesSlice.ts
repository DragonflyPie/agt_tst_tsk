import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const fetchShapes = createAsyncThunk(
  "shapes/fetchShapes",
  async () => {
    const response = await fetch("/shapes.json");
    const data = await response.json();
    return data as Polygon[];
  },
  {
    condition: (_, thunkAPI) => {
      const { shapes } = thunkAPI.getState() as RootState;
      if (shapes.data.length) {
        return false;
      }
    },
  }
);

export type LatLngTuple = [number, number];

interface Point {
  type: string;

  properties: {
    id: number;
    name: string;
  };
  geometry: {
    coordinates: LatLngTuple;
    type: "Point";
  };
}

interface Polygon {
  type: string;
  properties: {
    id: number;
    name: string;
  };
  geometry: {
    coordinates: Array<Array<LatLngTuple>>;
    type: "Polygon";
  };
}

interface ShapesSlice {
  data: Array<Polygon | Point>;
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

const initialState: ShapesSlice = {
  data: [],
  status: "idle",
  error: null,
};

export const shapesSlice = createSlice({
  name: "shapes",
  initialState,
  reducers: {
    addShape: (state, action: PayloadAction<Point>) => {
      state.data.push(action.payload);
    },
    deleteShape: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(
        (shape) => shape.properties.id !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchShapes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShapes.fulfilled, (state, action) => {
        state.status = "success";
        state.data = state.data.concat(action.payload);
      })
      .addCase(fetchShapes.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) {
          state.error = action.error.message;
        }
      });
  },
});

export const { deleteShape, addShape } = shapesSlice.actions;

export const selectLastId = (state: RootState) =>
  state.shapes.data[state.shapes.data.length - 1]?.properties.id;

export default shapesSlice.reducer;
