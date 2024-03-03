import {useState} from "react";
import * as R from 'ramda'
import styled from "@emotion/styled";
import Logo from "./Logo.jsx";
import LeaderOf from "./LeaderOf.jsx";

const hasLength = R.compose(Boolean, R.propOr(false, 'length'))

const playerOrder = [
    'black',
    'blue',
    'green',
    'purple',
    'red',
    'yellow',
]

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
}

const scoringOrder = [
    'apples',
    'bread',
    'cheese',
    'chickens',
    'contraband',
    'leaderOfApples',
    'leaderOfBread',
    'leaderOfCheese',
    'leaderOfChickens',
    'money'
]

const player = {
    apples: 0,
    bread: 0,
    cheese: 0,
    chickens: 0,
    contraband: 0,
    money: 0,
}

const initialScores = R.map(name => {
        return R.assoc('name', name, player)
    }
)(playerOrder)


const HeaderStyle = styled('div')`
    display: flex;
`

const LeftColumnStyle = styled('div')`
    display: flex;
    flex-direction: column;
`

function App() {
    const [scores, setScores] = useState(initialScores)

    const foo = scores.reduce((results, score, idx, array) => {
        results.apples.push(score.apples)
        results.bread.push(score.bread)
        results.cheese.push(score.cheese)
        results.chickens.push(score.chickens)
        results.contraband.push(score.contraband)
        results.money.push(score.money)

        const leaderOfApples = R.compose(hasLength, R.reject(s => s.apples < score.apples))(array)
        const leaderOfBread = R.compose(hasLength, R.reject(s => s.bread < score.bread))(array)
        const leaderOfCheese = R.compose(hasLength, R.reject(s => s.cheese < score.cheese))(array)
        const leaderOfChickens = R.compose(hasLength, R.reject(s => s.chickens < score.chickens))(array)

        results.leaderOfBread.push(leaderOfBread)
        results.leaderOfApples.push(leaderOfApples)
        results.leaderOfChickens.push(leaderOfChickens)
        results.leaderOfCheese.push(leaderOfCheese)

        return results;
    }, {
        apples: [],
        bread: [],
        cheese: [],
        chickens: [],
        contraband: [],
        leaderOfApples: [],
        leaderOfBread: [],
        leaderOfCheese: [],
        leaderOfChickens: [],
        money: [],
    })
    return (
        <table>
            <thead>
            <tr>
                <th>
                    <Logo/>
                </th>
                {
                    playerOrder.map(name => {
                        return (
                            <th key={name} scope="col">
                                <img alt={`${name} player`} src={`/public/images/${name}Player.gif`}/>
                            </th>
                        )
                    })
                }
            </tr>
            </thead>
            <tbody>
            {
                scoringOrder.map(name => {
                    const result = name.split('leaderOf')
                    const lowerName = result[1]?.toLowerCase()
                    const valueKey = foo[lowerName] ? lowerName : name
                    return (
                        <tr key={name}>
                            {
                                <th>
                                    {
                                        lowerName ? (
                                            <LeaderOf name={lowerName}/>
                                        ) : (
                                            <img key={name} alt={`${name} score`} src={`/public/images/${name}.gif`}/>
                                        )
                                    }

                                </th>

                            }
                            {
                                foo[valueKey].map((value, idx) => {
                                    const key = `${name}-value-${idx}`
                                    return (
                                        <td key={key}>
                                            {lowerName ? (
                                                value
                                            ) : (
                                                <>
                                                    <label
                                                        htmlFor={key}>{`Total ${['contraband', 'money'].includes(name) ? 'Value' : 'Number/Count'} Only`}</label>
                                                    <input type='text' id={key} value={value} onChange={event => {
                                                        const playerName = playerOrder[idx]
                                                        const scoreCard = scores[idx]
                                                        const next = event.target.value;
                                                        console.log({playerName, name, scoreCard, next})
                                                        setScores(
                                                            R.set(R.lensPath([idx, name]), Number(next))
                                                        )
                                                    }}/>
                                                </>
                                            )}
                                        </td>
                                    )
                                })
                            }

                        </tr>
                    )
                })
            }

            <tr className="total-row">
                <td>Total</td>
                {
                    playerOrder.map(name => {
                        return (
                            <td key={name}>
                                {name}
                            </td>
                        )
                    })
                }
            </tr>
            </tbody>
        </table>

    )
}

export default App
