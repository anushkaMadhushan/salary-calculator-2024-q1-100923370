import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
    setBasicSalary,
    addEarning,
    removeEarning,
    addDeduction,
    removeDeduction,
    reset,
} from '../store/salarySlice';
import styled from 'styled-components';
import {
    calculateEPF,
    calculateNetSalary,
    calculateAPIT,
    calculateGrossEarnings,
} from '../utils/calculations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faRedo } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal'; // Import the Modal component

const FormContainer = styled.div`
    padding: 20px;
`;

const Label = styled.label`
    display: block;
    margin: 10px 0 5px;
`;

const Input = styled.input`
    padding: 8px;
    width: calc(100% - 18px);
    margin-bottom: 10px;
`;

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
`;

const Button = styled.button`
    padding: 10px 15px;
    background-color: #0070f3;
    color: white;
    border: none;
    cursor: pointer;
    margin: 5px;

    &:hover {
        background-color: #005bb5;
    }

    &:focus {
        outline: none;
    }
`;

const RemoveButton = styled(Button)`
    background-color: #e53e3e;

    &:hover {
        background-color: #c53030;
    }
`;

const Result = styled.p`
    margin: 10px 0;
`;

const Section = styled.div`
    margin-bottom: 20px;
`;

const FlexRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    & > * {
        margin-right: 10px;
    }
`;

const SalaryForm: React.FC = () => {
    const dispatch = useDispatch();
    const salary = useSelector((state: RootState) => state.salary);

    const [earningName, setEarningName] = useState('');
    const [earningAmount, setEarningAmount] = useState(0);
    const [earningEPF, setEarningEPF] = useState(false);

    const [deductionName, setDeductionName] = useState('');
    const [deductionAmount, setDeductionAmount] = useState(0);
    const [deductionEPF, setDeductionEPF] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddEarning = () => {
        const id = new Date().toISOString();
        dispatch(addEarning({ id, name: earningName, amount: earningAmount, epf: earningEPF }));
        setEarningName('');
        setEarningAmount(0);
        setEarningEPF(false);
    };

    const handleAddDeduction = () => {
        const id = new Date().toISOString();
        dispatch(addDeduction({ id, name: deductionName, amount: deductionAmount, epf: deductionEPF }));
        setDeductionName('');
        setDeductionAmount(0);
        setDeductionEPF(false);
    };

    const { totalEarnings, grossDeduction, grossEarnings, totalEarningsForEPF } = calculateGrossEarnings(
        salary.basicSalary,
        salary.earnings,
        salary.deductions
    );

    const { employeeEPF, employerEPF, employerETF } = calculateEPF(totalEarningsForEPF, grossDeduction);
    const apit = calculateAPIT(grossEarnings);
    const netSalary = calculateNetSalary(grossEarnings, employeeEPF, apit);

    const handlePrint = () => {
        window.print();
    };

    return (
        <FormContainer className="bg-gray-100 p-6"> 
            <Section>
                <Label>Basic Salary:</Label>
                <Input
                    type="number"
                    value={salary.basicSalary}
                    onChange={(e) => dispatch(setBasicSalary(Number(e.target.value)))}
                />
            </Section>
            <Section>
                <h2>Earnings</h2>
                {salary.earnings.map((earning) => (
                    <FlexRow key={earning.id}>
                        <span>
                            {earning.name}: {earning.amount.toFixed(2)} 
                        </span>
                        <RemoveButton onClick={() => dispatch(removeEarning(earning.id))}>
                            <FontAwesomeIcon icon={faTrash} />
                        </RemoveButton>
                    </FlexRow>
                ))}
                <FlexRow>
                    <Input
                        type="text"
                        placeholder="Earning Name"
                        value={earningName}
                        onChange={(e) => setEarningName(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Earning Amount"
                        value={earningAmount}
                        onChange={(e) => setEarningAmount(Number(e.target.value))}
                    />
                    <CheckboxContainer>
                        <Label>
                            EPF/ETF Applicable
                            <Input
                                type="checkbox"
                                checked={earningEPF}
                                onChange={(e) => setEarningEPF(e.target.checked)}
                                style={{ marginLeft: '10px' }}
                            />
                        </Label>
                    </CheckboxContainer>
                </FlexRow>
                <Button onClick={handleAddEarning}>Add Earning</Button>
            </Section>
            <Section>
                <h2>Deductions</h2>
                {salary.deductions.map((deduction) => (
                    <FlexRow key={deduction.id}>
                        <span>
                            {deduction.name}: {deduction.amount.toFixed(2)} 
                        </span>
                        <RemoveButton onClick={() => dispatch(removeDeduction(deduction.id))}>
                            <FontAwesomeIcon icon={faTrash} />
                        </RemoveButton>
                    </FlexRow>
                ))}
                <FlexRow>
                    <Input
                        type="text"
                        placeholder="Deduction Name"
                        value={deductionName}
                        onChange={(e) => setDeductionName(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Deduction Amount"
                        value={deductionAmount}
                        onChange={(e) => setDeductionAmount(Number(e.target.value))}
                    />
                    <CheckboxContainer>
                        <Label>
                            EPF/ETF Applicable
                            <Input
                                type="checkbox"
                                checked={deductionEPF}
                                onChange={(e) => setDeductionEPF(e.target.checked)}
                                style={{ marginLeft: '10px' }}
                            />
                        </Label>
                    </CheckboxContainer>
                </FlexRow>
                <Button onClick={handleAddDeduction}>Add Deduction</Button>
            </Section>
            <Button onClick={() => dispatch(reset())}>
                <FontAwesomeIcon icon={faRedo} /> Reset
            </Button>
            <Button onClick={() => setIsModalOpen(true)}>
                Submit
            </Button>
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} onPrint={handlePrint}>
                    <Section>
                        <h2>Payslip Details</h2>
                        <Result>Total Earnings: {totalEarnings.toFixed(2)}</Result>
                        <Result>Gross Deduction: {grossDeduction.toFixed(2)}</Result>
                        <Result>Gross Earnings: {grossEarnings.toFixed(2)}</Result>
                        <Result>Employee EPF: {employeeEPF.toFixed(2)}</Result>
                        <Result>Employer EPF: {employerEPF.toFixed(2)}</Result>
                        <Result>Employer ETF: {employerETF.toFixed(2)}</Result>
                        <Result>APIT: {apit.toFixed(2)}</Result>
                        <Result>Net Salary: {netSalary.toFixed(2)}</Result>
                    </Section>
                </Modal>
            )}
        </FormContainer>
    );
};

export default SalaryForm;

