import React, { useState, useEffect } from 'react';
import { TaxBracket, taxBrackets as initialTaxBrackets } from '../data/taxBrackets';

const MasterData: React.FC = () => {
    const [taxBrackets, setTaxBrackets] = useState<TaxBracket[]>(initialTaxBrackets);

    useEffect(() => {
        const savedBrackets = localStorage.getItem('taxBrackets');
        if (savedBrackets) {
            setTaxBrackets(JSON.parse(savedBrackets));
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('taxBrackets', JSON.stringify(taxBrackets));
        alert('Data saved successfully!');
    };

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
        <div>
            <h1>Master Data: Tax Brackets</h1>
            <button onClick={addTaxBracket}>Add Tax Bracket</button>
            <table>
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
                            <td><input type="number" value={bracket.min} onChange={e => handleInputChange(index, 'min', e.target.value)} /></td>
                            <td><input type="number" value={bracket.max} onChange={e => handleInputChange(index, 'max', e.target.value)} /></td>
                            <td><input type="number" value={bracket.rate} onChange={e => handleInputChange(index, 'rate', e.target.value)} /></td>
                            <td><input type="number" value={bracket.deduction} onChange={e => handleInputChange(index, 'deduction', e.target.value)} /></td>
                            <td><button onClick={() => removeTaxBracket(index)}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default MasterData;
