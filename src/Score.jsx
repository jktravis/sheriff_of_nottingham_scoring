import React from "react";
import * as R from "ramda";

function Score({
                 isTied,
  isQueenOf,
  isHeader,
  isKingOf,
  score,
  idx,
  name,
  setScores,
  value,
}) {
  const id = `${name}-value-${idx}`;

  return (
    <td>
      {R.cond([
        [
          R.allPass([R.always(isKingOf), R.always(isHeader), R.always(score)]),
          () => <img src="images/kingOf.gif" alt={`King of ${name}`} />,
        ],
        [
          R.allPass([R.always(isQueenOf), R.always(isHeader)]),
          () => (
            <img src="images/queenOf.gif" alt={`Queen of ${name}`} />
          ),
        ],
        [
          R.allPass([
            R.always(isHeader),
            R.always(isTied),
            R.always(value !== 0),
          ]),
          R.always("Tied!"),
        ],
        [R.always(isHeader), R.always("--")],
        [
          R.T,
          () => (
            <>
              <label
                htmlFor={id}
              >{`Total ${["contraband", "money"].includes(name) ? "Value" : "Number/Count"} Only`}</label>
              <input
                type="number"
                min={0}
                id={id}
                value={value}
                onChange={(event) => {
                  const next = event.target.value;
                  setScores(R.set(R.lensPath([idx, name]), Number(next)));
                }}
              />
            </>
          ),
        ],
      ])()}
    </td>
  );
}

export default Score;
