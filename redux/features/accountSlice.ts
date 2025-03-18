import type { TUser } from '@/types/user';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

type TState = {
    user: null | TUser;
    access_token: string | null;
    refresh_token: string | null;
};
const initialState: TState = {
    user: null,
    access_token: null,
    refresh_token: null,
};

//carts slice
export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.access_token = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refresh_token = action.payload;
        },
        logoutUser: state => {
            state.user = null;
            state.access_token = null;
            state.refresh_token = null;
        },
    },
});

// Action creators are automatically generated for each case reducer function
export const { setUser, setToken, setRefreshToken, logoutUser } = accountSlice.actions;

export default accountSlice.reducer;
