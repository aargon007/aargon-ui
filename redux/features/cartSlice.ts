import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

type TCartSliceState = {
    carts: {
        id: string;
        name: string;
        price: number;
        quantity: number;
    }[];
    transactions: {
        id: string;
        name: string;
        price: number;
        quantity: number;
    }[];
};

const initialState: TCartSliceState = {
    carts: [],
    transactions: [],
};

//carts slice
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
});

// cart reducer functions
export const {} = cartSlice.actions;

export default cartSlice.reducer;
