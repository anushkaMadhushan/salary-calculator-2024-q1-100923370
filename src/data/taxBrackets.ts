export interface TaxBracket {
    min: number;
    max: number;
    rate: number;
    deduction: number;
}

export const taxBrackets: TaxBracket[] = [
    { min: 100000, max: 141667, rate: 6, deduction: 6000 },
    { min: 141667, max: 183333, rate: 12, deduction: 14500 },
    { min: 183333, max: 225000, rate: 18, deduction: 25500 },
    { min: 225000, max: 266667, rate: 24, deduction: 39000 },
    { min: 266667, max: 308333, rate: 30, deduction: 55000 },
    { min: 308333, max: Infinity, rate: 36, deduction: 73500 },
];
