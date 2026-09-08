import { injectGlobal } from "@emotion/css";

injectGlobal`
    * {
        box-sizing: border-box;
        font-family: "Helvetica Neue", sans-serif;
    }

    body {
        background: #ebe2cb;
        padding-bottom: 5rem;
        margin: 0 0 5rem;
        font-size: clamp(13px, 3vw, 16px);
    }

    main {
        display: flex;
        justify-content: center;
        padding: 0 0.5rem;
    }

    .table-wrapper {
        max-width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    label {
        display: block;
        text-align: center;
    }

    input {
        text-align: center;
        font-size: clamp(1rem, 4vw, 2rem);
        width: 3.5em;
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

    table {
        border-collapse: collapse;
        margin: 0 auto;

        .stripe {
            background: rgba(183, 174, 154, 0.49);
        }

        td,
        th {
            text-align: center;
            border: 1px solid rgba(149, 149, 149, 0.5);
            border-collapse: collapse;
            padding: clamp(0.25rem, 1.5vw, 0.5rem);
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

            img {
                max-width: 100%;
                height: auto;
                display: block;
            }
        }

        th[scope="col"] {
            height: 3rem;        /* fixed header row height, won't grow */
            overflow: hidden;
            padding: 0;
            position: relative;  /* keeps things predictable if you add more here later */
        }

        th[scope="col"] img {
            max-width: 100%;
            height: auto;
            max-height: 2.5rem;
        }
        th[scope="col"] img {
            display: block;
            height: 100%;
            width: auto;
            margin: 0 auto;
            transform: scale(3);       /* the "zoom in" */
            transform-origin: 50% 50%;   /* zoom from the center, so it crops evenly on all sides */
        }

        /* Sticky first column: row icons + logo cell */
        thead th:first-child,
        tbody th:first-child {
            position: sticky;
            left: 0;
            background: #ebe2cb;
            z-index: 1;
        }

        tr.stripe th:first-child {
            background: #d8cfb6;
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

    .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
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
