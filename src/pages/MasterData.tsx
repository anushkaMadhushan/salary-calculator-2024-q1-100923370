import React, { useState } from 'react';
import styled from 'styled-components';
import { TaxBracket, taxBrackets as initialTaxBrackets } from '../data/taxBrackets';

const Container = styled.div`
    padding: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    th {
        background-color: #f2f2f2;
        text-align: left;
    }
`;

const Button = styled.button`
    padding: 10px;
    margin: 5px;
    color: white;
    background-color: #0070f3;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #005bb5;
    }
`;

const Input = styled.input`
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
`;

const MasterData: React.FC = () => {
    const [taxBrackets, setTaxBrackets] = useState<TaxBracket[]>(initialTaxBrackets);

    const handleInputChange = (index: number, field: keyof TaxBracket, value: string) => {
        const updatedBrackets = [...taxBrackets];
        updatedBrackets[index][field] = field === 'rate' || field === 'deduction' ? parseFloat(value) : parseInt(value, 10);
        setTaxBrackets(updatedBrackets);
    };

    const addTaxBracket = () => {
        setTaxBrackets([...taxBrackets, { min: 0, max: 0, rate: 0, deduction: 0 }]);
    };

    const removeTaxBracket = (index: number) => {
        setTaxBrackets(taxBrackets.filter((_, i) => i !== index));
    };

    return (
        <Container>
            <h1>Master Data: Tax Brackets</h1>
            <Button onClick={addTaxBracket}>Add Tax Bracket</Button>
            <Table>
                <thead>
                    <tr>
                        <th>Min</th>
                        <th>Max</th>
                        <th>Rate (%)</th>
                        <th>Deduction</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {taxBrackets.map((bracket, index) => (
                        <tr key={index}>
                            <td><Input type="number" value={bracket.min} onChange={e => handleInputChange(index, 'min', e.target.value)} /></td>
                            <td><Input type="number" value={bracket.max} onChange={e => handleInputChange(index, 'max', e.target.value)} /></td>
                            <td><Input type="number" value={bracket.rate} onChange={e => handleInputChange(index, 'rate', e.target.value)} /></td>
                            <td><Input type="number" value={bracket.deduction} onChange={e => handleInputChange(index, 'deduction', e.target.value)} /></td>
                            <td><Button onClick={() => removeTaxBracket(index)}>Remove</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default MasterData;
