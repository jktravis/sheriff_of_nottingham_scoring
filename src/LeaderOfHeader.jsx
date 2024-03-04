import React from "react";

function LeaderOfHeader({ name }) {
  return (
    <div className="header-icons">
      <img src="/public/images/leaderOf.gif" alt="leader of" />
      <img src={`/public/images/${name}.gif`} alt={name} />
    </div>
  );
}

export default LeaderOfHeader;
