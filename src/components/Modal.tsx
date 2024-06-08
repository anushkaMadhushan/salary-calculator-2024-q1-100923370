import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ModalContainer = styled.div`
    background: white;
    padding: 10px; /* Reduced padding */
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    position: relative;

    @media print {
        size: A5;
        width: 148mm;
        height: 210mm;
        padding: 10mm; /* Set padding suitable for A5 */
        border-radius: 0;
        box-shadow: none;
        margin: 0;
        display: block; /* Ensures the modal takes up the entire A5 page */
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;

    @media print {
        display: none;
    }
`;

const PrintButton = styled.button`
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #0070f3;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #005bb5;
    }

    @media print {
        display: none;
    }
`;

const Modal: React.FC<{ onClose: () => void; onPrint: () => void; children: React.ReactNode }> = ({ onClose, onPrint, children }) => {
    return (
        <Overlay className="print-container">
            <ModalContainer className="print-modal">
                <CloseButton onClick={onClose}>&times;</CloseButton>
                {children}
                <PrintButton onClick={onPrint}>Print Payslip</PrintButton>
            </ModalContainer>
        </Overlay>
    );
};

export default Modal;
