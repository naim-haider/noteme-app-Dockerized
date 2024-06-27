import { BASE_URL } from "@/lib/baseUrl";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isloading: false,
  noteApiData: [],
  isError: false,
};

export const fetchApiNote = createAsyncThunk("fetchApiNote", async () => {
  let result = await fetch(`${BASE_URL}/api/notes`, {
    method: "GET",
  });
  result = await result.json();
  return result;
});

const noteSlice = createSlice({
  name: "addNote",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchApiNote.pending, (state, action) => {
      state.isloading = true;
    });
    builder.addCase(fetchApiNote.fulfilled, (state, action) => {
      (state.isloading = false), (state.noteApiData = action.payload);
    });

    builder.addCase(fetchApiNote.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default noteSlice.reducer;
