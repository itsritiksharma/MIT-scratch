import { createSlice } from "@reduxjs/toolkit";

interface Widget {
  id: string;
  action: Array<string>;
  amount?: number;
}

interface InitialState {
  widgetList: Array<Widget>;
}

const initialState: InitialState = {
  widgetList: [
    {
      id: "midAreaList-0",
      action: [],
    },
  ],
};

export const widgetSlice = createSlice({
  name: "sprite",
  initialState,
  reducers: {
    addWidget: (state, action) => {
      if (action.payload.transferAction === "") {
        return;
      }
      state.widgetList[0].action.push(action.payload.transferAction);
    },
    updateWidgets: (state, action) => {
      console.log(action.payload);
      state.widgetList[0].action = action.payload;
    },
  },
});

export const { addWidget, updateWidgets } = widgetSlice.actions;

export default widgetSlice.reducer;
