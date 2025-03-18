import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Thunk functions. call in a useeffect
export const getTransactions = createAsyncThunk('reportSlice/getTransactions', async (_, { getState }) => {
    const state = getState() as RootState;
    const transactions = state.carts.transactions;
    const user = state.account.user;
    return { transactions, user };
});

type TState = {
    reports: [];
};

const initialState: TState = {
    reports: [],
};

// report slice
export const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getTransactions.fulfilled, (state, action) => {
            // state came from getTransactions thunk function
        });
        // builder.addCase('transactions', (state, action) => {
        //     const valueA = transactionsFromCart(action.payload.getState());
        //     console.log(valueA);

        // });
    },
});

export const {} = reportSlice.actions;

export default reportSlice.reducer;
