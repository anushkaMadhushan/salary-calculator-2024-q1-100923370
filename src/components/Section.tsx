import React, { ReactNode } from 'react';
import styled from 'styled-components';

// Define the type for the children prop
interface SectionProps {
    children: ReactNode;
}

// Styled component for the section
const SectionWrapper = styled.div`
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 8px;
`;

// Component definition
const Section: React.FC<SectionProps> = ({ children }) => {
    return (
        <SectionWrapper>
            {children}
        </SectionWrapper>
    );
};

export default Section;
