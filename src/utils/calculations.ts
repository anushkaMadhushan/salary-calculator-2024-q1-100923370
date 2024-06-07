
interface TaxBracket {
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

export const calculateGrossEarnings = (basicSalary: number, earnings: Array<{ amount: number; epf: boolean }>, deductions: Array<{ amount: number }>) => {
    const totalEarnings = earnings.reduce((acc, curr) => acc + curr.amount, basicSalary);
    const grossDeduction = deductions.reduce((acc, curr) => acc + curr.amount, 0);
    const totalEarningsForEPF = earnings.filter(e => e.epf).reduce((acc, curr) => acc + curr.amount, basicSalary);
    const grossEarnings = totalEarnings - grossDeduction;
    return { totalEarnings, grossDeduction, grossEarnings, totalEarningsForEPF };
};

export const calculateEPF = (totalEarningsForEPF: number, grossDeduction: number) => {
    const employeeEPF = totalEarningsForEPF * 0.08;
    const employerEPF = totalEarningsForEPF * 0.12;
    const employerETF = totalEarningsForEPF * 0.03;
    return { employeeEPF, employerEPF, employerETF };
};

export const calculateAPIT = (grossEarnings: number) => {
    const bracket = taxBrackets.find(bracket => grossEarnings > bracket.min && grossEarnings <= bracket.max);
    if (bracket) {
        return (grossEarnings * (bracket.rate / 100)) - bracket.deduction;
    }
    return 0;
};

export const calculateNetSalary = (grossEarnings: number, employeeEPF: number, apit: number) => {
    return grossEarnings - employeeEPF - apit;
};
