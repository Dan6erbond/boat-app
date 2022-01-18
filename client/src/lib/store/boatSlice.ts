import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Boat } from "../../types/Boat";

export interface BoatState {
  boats: Boat[];
}

const initialState: BoatState = {
  boats: [],
};

export const boatSlice = createSlice({
  name: "boats",
  initialState,
  reducers: {
    addBoat(state, action: PayloadAction<Boat>) {
      state.boats.push(action.payload);
    },
    removeBoat(state, action: PayloadAction<number>) {
      state.boats = state.boats.filter((boat) => boat.id !== action.payload);
    },
    editBoat(state, action: PayloadAction<Boat>) {
      state.boats = state.boats.map((boat) =>
        boat.id === action.payload.id ? action.payload : boat
      );
    },
  },
});

export const { addBoat, removeBoat, editBoat } = boatSlice.actions;

export default boatSlice.reducer;
