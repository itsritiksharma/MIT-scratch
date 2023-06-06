import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  characters: Array<{ id: string; angle: number }>;
  active: string;
}

const initialState: InitialState = {
  characters: [{ id: "sprite0", angle: 0 }],
  active: "sprite0",
};

export const characterSlice = createSlice({
  name: "sprite",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },
    addCharacter: (state) => {
      state.characters.push({
        id: `sprite${state.characters.length}`,
        angle: 0,
      });
    },
    removeCharacter: (state, action) => {
      if (state.characters.length === 1) {
        return;
      }
      state.characters = state.characters.filter(
        (charac) => charac.id !== action.payload
      );
      state.active = state.characters[0].id;
    },
    setAngle: (state, action) => {
      state.characters[0].angle = state.characters[0].angle + action.payload;
    },
  },
});

export const { setActive, addCharacter, removeCharacter, setAngle } =
  characterSlice.actions;

export default characterSlice.reducer;
