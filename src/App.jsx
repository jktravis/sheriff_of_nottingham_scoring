import {useState} from "react";
import * as R from "ramda";
import Logo from "./Logo.jsx";
import LeaderOfHeader from "./LeaderOfHeader.jsx";
import Score from "./Score.jsx";
import {cx} from '@emotion/css'
console.log(import.meta.env.BASE_URL)

const playerOrder = ["black", "blue", "green", "purple", "red", "yellow"];

function getWinner(scores, value, idx, array) {
  let message = {
    result: "",
    context: "",
  };

  const maxScore = R.reduce(R.max, 0, array);

  let isWinner = R.compose(
    R.allPass([
      R.none(R.gt(R.__, value)),
      R.none(R.equals(value)),
      R.always(value !== 0),
    ]),
    R.remove(idx, 1),
  )(array);

  message = isWinner ? {result: "Winner!"} : message;

  const isTied =
    R.filter(R.allPass([R.equals(value), R.always(value !== 0)]), array)
      .length > 1;

  const legalGoods = scores.map((score) => {
    return score.apples + score.bread + score.cheese + score.chickens;
  });

  if (!isWinner && isTied) {
    isWinner = R.compose(
      R.allPass([
        R.none(R.gt(R.__, legalGoods[idx])),
        R.none(R.equals(legalGoods[idx])),
        R.always(legalGoods[idx] !== 0),
      ]),
      R.remove(idx, 1),
    )(legalGoods);

    message = isWinner
      ? {result: "Winner!", context: "(by number of legal goods)"}
      : message;
  }

  return {
    message,
    maxScore,
    isTied,
    isWinner,
  };
}

function getRoyalty(player, idx, array, food) {
  const numOfFood = player[food];

  const withoutThis = R.remove(idx, 1, array);
  const isTied = R.any(
    (otherPlayer) =>
      otherPlayer[food] === numOfFood && otherPlayer.name !== player.name,
    withoutThis,
  );

  const kingScore = R.reduce(
    (result, currentPlayer) => {
      if (result < currentPlayer[food]) {
        return currentPlayer[food];
      }
      return result;
    },
    0,
    array,
  );

  const kingCount = R.filter(
    R.allPass([R.complement(R.propEq)(0, food), R.propEq(kingScore, food)]),
    array,
  ).length;

  const isTiedForKing = kingCount > 1 && numOfFood === kingScore;
  const isKing = numOfFood > 0 && numOfFood === kingScore && !isTiedForKing;

  const queenScore = R.reduce(
    (result, currentPlayer) => {
      if (result < currentPlayer[food] && currentPlayer[food] < kingScore) {
        return currentPlayer[food];
      }
      return result;
    },
    0,
    array,
  );

  const queenCount = R.filter(
    R.allPass([R.complement(R.propEq)(0, food), R.propEq(queenScore, food)]),
    array,
  ).length;

  const isTiedForQueen = queenCount > 1 && numOfFood === queenScore;
  const isQueen =
    !isTied && numOfFood === queenScore && numOfFood > 0 && !isTiedForQueen;

  return {
    isTiedForQueen,
    isTiedForKing,
    kingCount,
    queenCount,
    isKing,
    isTied,
    isQueen,
  };
}

const ITEM_SCORES = {
  apples: {
    king: 20,
    queen: 10,
    each: 2,
  },
  bread: {
    king: 15,
    queen: 10,
    each: 3,
  },
  cheese: {
    king: 15,
    queen: 10,
    each: 3,
  },
  chickens: {
    king: 10,
    queen: 5,
    each: 4,
  },
};

const scoringOrder = [
  "apples",
  "bread",
  "cheese",
  "chickens",
  "contraband",
  "kingOfApples",
  "kingOfBread",
  "kingOfCheese",
  "kingOfChickens",
  "money",
];

const player = {
  apples: 0,
  bread: 0,
  cheese: 0,
  chickens: 0,
  contraband: 0,
  money: 0,
};

const initialScores = R.map((name) => {
  return R.assoc("name", name, player);
})(playerOrder);

function App() {
  const [scores, setScores] = useState(initialScores);

  const computedScores = scores.reduce(
    (results, score, idx, array) => {
      results.apples.push(score.apples);
      results.bread.push(score.bread);
      results.cheese.push(score.cheese);
      results.chickens.push(score.chickens);
      results.contraband.push(score.contraband);
      results.money.push(score.money);

      const apples = getRoyalty(score, idx, array, "apples");
      const cheese = getRoyalty(score, idx, array, "cheese");
      const chickens = getRoyalty(score, idx, array, "chickens");
      const bread = getRoyalty(score, idx, array, "bread");

      results.kingOfBread.push(bread.isKing);
      results.tiedForBreadKing.push(bread.isTiedForKing);
      results.queenOfBread.push(bread.isQueen);
      results.tiedForBreadQueen.push(bread.isTiedForQueen);

      results.kingOfApples.push(apples.isKing);
      results.tiedForAppleKing.push(apples.isTiedForKing);
      results.queenOfApples.push(apples.isQueen);
      results.tiedForAppleQueen.push(apples.isTiedForQueen);

      results.kingOfChickens.push(chickens.isKing);
      results.tiedForChickenKing.push(chickens.isTiedForKing);
      results.queenOfChickens.push(chickens.isQueen);
      results.tiedForChickenQueen.push(chickens.isTiedForQueen);

      results.kingOfCheese.push(cheese.isKing);
      results.tiedForCheeseKing.push(cheese.isTiedForKing);
      results.queenOfCheese.push(cheese.isQueen);
      results.tiedForCheeseQueen.push(cheese.isTiedForQueen);

      results.total.push(
        [
          score.contraband,
          score.money,

          score.apples * ITEM_SCORES.apples.each,
          score.bread * ITEM_SCORES.bread.each,
          score.cheese * ITEM_SCORES.cheese.each,
          score.chickens * ITEM_SCORES.chickens.each,

          apples.isKing ? ITEM_SCORES.apples.king : 0,
          bread.isKing ? ITEM_SCORES.bread.king : 0,
          cheese.isKing ? ITEM_SCORES.cheese.king : 0,
          chickens.isKing ? ITEM_SCORES.chickens.king : 0,

          apples.isQueen ? ITEM_SCORES.apples.queen : 0,
          bread.isQueen ? ITEM_SCORES.bread.queen : 0,
          cheese.isQueen ? ITEM_SCORES.cheese.queen : 0,
          chickens.isQueen ? ITEM_SCORES.chickens.queen : 0,

          apples.isTiedForKing
            ? Math.floor(
              (ITEM_SCORES.apples.king + ITEM_SCORES.apples.queen) /
              apples.kingCount,
            )
            : 0,
          bread.isTiedForKing
            ? Math.floor(
              (ITEM_SCORES.bread.king + ITEM_SCORES.bread.queen) /
              bread.kingCount,
            )
            : 0,
          cheese.isTiedForKing
            ? Math.floor(
              (ITEM_SCORES.cheese.king + ITEM_SCORES.cheese.queen) /
              cheese.kingCount,
            )
            : 0,
          chickens.isTiedForKing
            ? Math.floor(
              (ITEM_SCORES.chickens.king + ITEM_SCORES.chickens.queen) /
              chickens.kingCount,
            )
            : 0,

          apples.isTiedForQueen
            ? Math.floor(ITEM_SCORES.apples.queen / apples.queenCount)
            : 0,
          bread.isTiedForQueen
            ? Math.floor(ITEM_SCORES.bread.queen / bread.queenCount)
            : 0,
          cheese.isTiedForQueen
            ? Math.floor(ITEM_SCORES.cheese.queen / cheese.queenCount)
            : 0,
          chickens.isTiedForQueen
            ? Math.floor(ITEM_SCORES.chickens.queen / chickens.queenCount)
            : 0,
        ].reduce(R.add, 0),
      );

      return results;
    },
    {
      apples: [],
      bread: [],
      cheese: [],
      chickens: [],
      contraband: [],
      kingOfApples: [],
      kingOfBread: [],
      kingOfCheese: [],
      kingOfChickens: [],
      money: [],
      queenOfApples: [],
      queenOfBread: [],
      queenOfCheese: [],
      queenOfChickens: [],
      tiedForBreadKing: [],
      tiedForAppleKing: [],
      tiedForCheeseKing: [],
      tiedForChickenKing: [],
      tiedForBreadQueen: [],
      tiedForAppleQueen: [],
      tiedForCheeseQueen: [],
      tiedForChickenQueen: [],
      total: [],
    },
  );

  return (
    <div>
      <main>
        <table>
          <thead>
          <tr>
            <th className="logo-cell">
              <Logo/>
            </th>
            {playerOrder.map((name) => {
              return (
                <th key={name} scope="col">
                  <img
                    alt={`${name} player`}
                    src={`images/${name}Player.gif`}
                  />
                </th>
              );
            })}
          </tr>
          </thead>
          <tbody>
          {scoringOrder.map((name, idx) => {
            const stringSplit = name.split("kingOf");
            const kingOfName = stringSplit[1]?.toLowerCase();
            const valueKey = computedScores[kingOfName] ? kingOfName : name;
            const queenOfName = kingOfName
              ? name.replace("kingOf", "queenOf")
              : null;

            console.log('')
            return (
              <tr key={name} className={cx({
                stripe: idx % 2 === 0
              })}>
                {
                  <th>
                    {kingOfName ? (
                      <LeaderOfHeader name={kingOfName}/>
                    ) : (
                      <img
                        className="header-icons"
                        key={name}
                        alt={`${name} score`}
                        src={`images/${name}.gif`}
                      />
                    )}
                  </th>
                }
                {computedScores[valueKey].map((value, idx) => {
                  const key = `${name}-value-${idx}`;

                  const score = computedScores[name][idx];

                  const isHeader = Boolean(kingOfName);
                  const isKingOf = kingOfName
                    ? computedScores[kingOfName][idx]
                    : false;
                  const isQueenOf = queenOfName
                    ? computedScores[queenOfName][idx]
                    : false;

                  const isTied = R.any(R.identity, [
                    computedScores["tiedForBreadKing"][idx] || false,
                    computedScores["tiedForAppleKing"][idx] || false,
                    computedScores["tiedForCheeseKing"][idx] || false,
                    computedScores["tiedForChickenKing"][idx] || false,
                    computedScores["tiedForBreadQueen"][idx] || false,
                    computedScores["tiedForAppleQueen"][idx] || false,
                    computedScores["tiedForCheeseQueen"][idx] || false,
                    computedScores["tiedForChickenQueen"][idx] || false,
                  ]);

                  return (
                    <Score
                      key={key}
                      name={name}
                      score={score}
                      isHeader={isHeader}
                      isTied={isTied}
                      isKingOf={isKingOf}
                      isQueenOf={isQueenOf}
                      lowerName={kingOfName}
                      setScores={setScores}
                      computedScores={computedScores}
                      idx={idx}
                      value={value}
                    />
                  );
                })}
              </tr>
            );
          })}

          <tr className="total-row">
            <td className="total-header">Total</td>
            {computedScores.total.map((value, idx, array) => {
              const {maxScore, message} = getWinner(
                scores,
                value,
                idx,
                array,
              );
              return (
                <td key={idx}>
                  <div className="total-value">{value}</div>
                  <div className="total-result">
                    <div>{maxScore === value && message.result}</div>
                    <div className="total-message-context">
                      {message.context}
                    </div>
                  </div>
                </td>
              );
            })}
          </tr>
          </tbody>
        </table>
      </main>
      <footer>
        <div>
          If there's still a tie, the winner will be the one with the most
          contraband. Otherwise, the victory is shared. All other tiebreakers are
          taken into consideration within the app.
        </div>

        <div>
          Heavily inspired by the provided score sheet found at <a
          href="https://www.cmon.com/wp-content/uploads/2023/06/SHF004-ScoreSheet-1.pdf" target="_blank"
          rel="noopener noreferrer"
        >CMON.com</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
