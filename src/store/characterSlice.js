import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
      console.log(action.payload);
      state.characters[0].angle = state.characters[0].angle + action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActive, addCharacter, removeCharacter, setAngle } =
  characterSlice.actions;

export default characterSlice.reducer;
