import { injectGlobal } from "@emotion/css";

injectGlobal`
    * {
        box-sizing: border-box;
        font-family: "Helvetica Neue", sans-serif;
    }

    body {
        background: #ebe2cb;
        padding-bottom: 5rem;
        margin-bottom: 5rem;
    }

    main {
        display: flex;
        justify-content: center;
    }

    table {
        border-collapse: collapse;

        .stripe {
            background: rgba(183, 174, 154, 0.49);
        }

        td,
        th {
            text-align: center;
            border: 1px solid rgba(149, 149, 149, 0.5);
            border-collapse: collapse;
            padding: .5rem;
        }

        thead {
            th {
                border-top: none;
                border-left: none;
                border-right: none;
            }
        }

        tbody {
            th {
                border-top: none;
                border-left: none;
                border-bottom: none;
            }
        }

        .logo-cell {
            border-bottom: none;
        }
    }


    label {
        display: block;
        text-align: center;
    }

    input {
        text-align: center;
        font-size: 2rem;
        width: 4em;
        border-radius: 1rem;
        border: 1px solid rgba(121, 121, 121, 0.56);

        &[type=number] {
            -moz-appearance: textfield;
            appearance: textfield;
            margin: 0;

            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }
        }

    }

    .total-header {
        font-size: 2rem;
    }

    .total-row {
        font-size: 1rem;
        background: gray;
        color: white;

        .total-value {
            text-transform: uppercase;
            font-size: 2rem;
        }

        .total-result {
            text-transform: uppercase;
            color: #418e41;
            background: white;
            border-radius: 3px;
        }

        .total-message-context {
            text-transform: none;
            color: #797979;
            font-size: .8rem;
        }
    }

    footer {
        color: #797979;

        &:before {
            content: '*';
        }

        text-align: center;
        padding: 1rem;
        margin: 1rem;
    }
`;
