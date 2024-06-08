import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TableRow from './TableRow';
import Section from './Section';

import {
    setBasicSalary,
    addEarning,
    removeEarning,
    addDeduction,
    removeDeduction,
    reset,
} from '../store/salarySlice';
import {
    calculateEPF,
    calculateNetSalary,
    calculateAPIT,
    calculateGrossEarnings,
} from '../utils/calculations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faRedo } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal'; // Import the Modal component

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
    const cts = grossEarnings + employerEPF + employerETF;

    const handlePrint = () => {
        window.print();
    };



    return (
        <div className="form-container">
            <div className="section">
                <label className="label">Basic Salary:</label>
                <input
                    type="number"
                    value={salary.basicSalary}
                    onChange={(e) => dispatch(setBasicSalary(Number(e.target.value)))}
                    className="input"
                />
            </div>
            <div className="section">
                <h2>Earnings</h2>
                {salary.earnings.map((earning) => (
                    <div key={earning.id} className="flex-row">
                        <span>
                            {earning.name}: {earning.amount.toFixed(2)}
                        </span>
                        <button onClick={() => dispatch(removeEarning(earning.id))} className="remove-button">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                ))}
                <div className="flex-row">
                    <input
                        type="text"
                        placeholder="Earning Name"
                        value={earningName}
                        onChange={(e) => setEarningName(e.target.value)}
                        className="input"
                    />
                    <input
                        type="number"
                        placeholder="Earning Amount"
                        value={earningAmount}
                        onChange={(e) => setEarningAmount(Number(e.target.value))}
                        className="input"
                    />
                    <div className="checkbox-container">
                        <label className="label">
                            EPF/ETF Applicable
                            <input
                                type="checkbox"
                                checked={earningEPF}
                                onChange={(e) => setEarningEPF(e.target.checked)}
                                style={{ marginLeft: '10px' }}
                            />
                        </label>
                    </div>
                </div>
                <button onClick={handleAddEarning} className="button">Add Earning</button>
            </div>
            <div className="section">
                <h2>Deductions</h2>
                {salary.deductions.map((deduction) => (
                    <div key={deduction.id} className="flex-row">
                        <span>
                            {deduction.name}: {deduction.amount.toFixed(2)}
                        </span>
                        <button onClick={() => dispatch(removeDeduction(deduction.id))} className="remove-button">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                ))}
                <div className="flex-row">
                    <input
                        type="text"
                        placeholder="Deduction Name"
                        value={deductionName}
                        onChange={(e) => setDeductionName(e.target.value)}
                        className="input"
                    />
                    <input
                        type="number"
                        placeholder="Deduction Amount"
                        value={deductionAmount}
                        onChange={(e) => setDeductionAmount(Number(e.target.value))}
                        className="input"
                    />
                    <div className="checkbox-container">
                        <label className="label">
                            EPF/ETF Applicable
                            <input
                                type="checkbox"
                                checked={deductionEPF}
                                onChange={(e) => setDeductionEPF(e.target.checked)}
                                style={{ marginLeft: '10px' }}
                            />
                        </label>
                    </div>
                </div>
                <button onClick={handleAddDeduction} className="button">Add Deduction</button>
            </div>
            <button onClick={() => dispatch(reset())} className="button">
                <FontAwesomeIcon icon={faRedo} /> Reset
            </button>
            <button onClick={() => setIsModalOpen(true)} className="button">
                Submit
            </button>
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} onPrint={handlePrint}>
                    <Section>
                        <h2>Payslip Details</h2>
                        <table>
                            <tbody>
                                <TableRow label="Basic Salary:" value={salary.basicSalary.toFixed(2)} />
                                <TableRow label="Gross Earnings:" value={totalEarnings.toFixed(2)} />
                                <TableRow label="Gross Deduction:" value={grossDeduction.toFixed(2)} />
                                <TableRow label="Employee EPF (8%):" value={employeeEPF.toFixed(2)} />
                                <TableRow label="APIT:" value={apit.toFixed(2)} />
                                <TableRow label="Net Salary (Take Home):" value={netSalary.toFixed(2)} />
                            </tbody>
                        </table>
                        <h3>Contribution from Employer</h3>
                        <table>
                            <tbody>
                                <TableRow label="Employer EPF (12%):" value={employerEPF.toFixed(2)} />
                                <TableRow label="Employer ETF (3%):" value={employerETF.toFixed(2)} />
                                <TableRow label="CTS (Cost to Company):" value={cts.toFixed(2)} />
                            </tbody>
                        </table>
                    </Section>
                </Modal>

            )}
        </div>
    );
};

export default SalaryForm;
