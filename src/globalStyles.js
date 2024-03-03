import { injectGlobal } from '@emotion/css'

injectGlobal`
    * {
        box-sizing: border-box;
    }

    body {
        background: #ebe2cb;
        padding-bottom: 5rem;
        margin-bottom: 5rem;
    }
    
    table {
        td,
        th {
            text-align: center;
        }
    }
    
    label {
        display: block;
        text-align: left;
    }
    
    input {
        text-align: right;
    }
    
    .total-row {
        text-transform: uppercase;
        font-size: 2rem;
    }
`
