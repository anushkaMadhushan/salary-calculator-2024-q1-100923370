import React, { useState } from 'react';
import styled from 'styled-components';
import SalaryForm from '../components/SalaryForm';
import MasterData from './MasterData';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Tabs = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

const Tab = styled.button<{ $active: boolean }>`
    padding: 10px;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    background-color: ${({ $active }) => ($active ? '#0070f3' : '#ccc')};
    color: white;

    &:hover {
        background-color: ${({ $active }) => ($active ? '#005bb5' : '#aaa')};
    }
`;

const IndexPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('master');

    return (
        <Container>
            <Tabs>
                <Tab $active={activeTab === 'salary'} onClick={() => setActiveTab('salary')}>Salary Calculator</Tab>
                <Tab $active={activeTab === 'master'} onClick={() => setActiveTab('master')}>Master Data</Tab>
            </Tabs>
            {activeTab === 'salary' ? <SalaryForm /> : <MasterData />}
        </Container>
    );
};

export default IndexPage;
