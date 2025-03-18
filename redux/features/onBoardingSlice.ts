import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

type TState = {
    order: number;
    email: string;
};
const initialState: TState = {
    order: 0,
    email: '',
};

// onboarding slice
export const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        incrementOnboardingOrder: state => {
            state.order = state.order + 1;
        },
        decrementOnboardingOrder: state => {
            state.order = state.order - 1;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
    },
});

// Action creators are automatically generated for each case reducer function
export const { incrementOnboardingOrder, decrementOnboardingOrder, setEmail } = onboardingSlice.actions;

export default onboardingSlice.reducer;
