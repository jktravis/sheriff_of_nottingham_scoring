import React from 'react';

function LeaderOf({name}) {
    return (
        <div>
            <img src="/public/images/leaderOf.gif" alt="leader of"/>
            <img src={`/public/images/${name}.gif`} alt={name}/>
        </div>
    );
}

export default LeaderOf;
