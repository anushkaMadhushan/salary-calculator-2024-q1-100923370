import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }

    @media print {
        body {
            font-size: 12px;
        }

        .no-print {
            display: none;
        }

        .print-container {
            width: 100%;
            margin: 0;
            padding: 0;
            border: none;
        }

        .print-section {
            page-break-inside: avoid;
            margin: 0;
        }

        .print-result {
            margin: 5px 0;
        }

        .print-modal {
            position: relative;
            width: 100%;
            max-width: none;
            background: white;
            padding: 20px;
            border: none;
            box-shadow: none;
        }
    }
`;

export default GlobalStyle;
