import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginSchema } from "../../pages/login";
import { User } from "../../types/User";

export const logIn = createAsyncThunk(
  "user/logIn",
  async (creds: LoginSchema) => {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const user = await response.json();
    return user;
  }
);

export interface UserState {
  user: User | null;
  accessToken: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut(state) {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      logIn.fulfilled,
      (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      }
    );
  },
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
