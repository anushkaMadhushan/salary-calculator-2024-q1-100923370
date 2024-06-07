import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Earning and Deduction type
interface Earning {
    id: string;
    name: string;
    amount: number;
    epf: boolean;
}

interface Deduction {
    id: string;
    name: string;
    amount: number;
    epf: boolean;
}

interface SalaryState {
    basicSalary: number;
    earnings: Earning[];
    deductions: Deduction[];
}

const initialState: SalaryState = {
    basicSalary: 0,
    earnings: [],
    deductions: [],
};

const salarySlice = createSlice({
    name: 'salary',
    initialState,
    reducers: {
        setBasicSalary(state, action: PayloadAction<number>) {
            state.basicSalary = action.payload;
        },
        addEarning(state, action: PayloadAction<Earning>) {
            state.earnings.push(action.payload);
        },
        updateEarning(state, action: PayloadAction<Earning>) {
            const index = state.earnings.findIndex(e => e.id === action.payload.id);
            if (index !== -1) {
                state.earnings[index] = action.payload;
            }
        },
        removeEarning(state, action: PayloadAction<string>) {
            state.earnings = state.earnings.filter(e => e.id !== action.payload);
        },
        addDeduction(state, action: PayloadAction<Deduction>) {
            state.deductions.push(action.payload);
        },
        updateDeduction(state, action: PayloadAction<Deduction>) {
            const index = state.deductions.findIndex(d => d.id === action.payload.id);
            if (index !== -1) {
                state.deductions[index] = action.payload;
            }
        },
        removeDeduction(state, action: PayloadAction<string>) {
            state.deductions = state.deductions.filter(d => d.id !== action.payload);
        },
        reset(state) {
            state.basicSalary = 0;
            state.earnings = [];
            state.deductions = [];
        },
    },
});

export const {
    setBasicSalary,
    addEarning,
    updateEarning,
    removeEarning,
    addDeduction,
    updateDeduction,
    removeDeduction,
    reset,
} = salarySlice.actions;

export default salarySlice.reducer;
