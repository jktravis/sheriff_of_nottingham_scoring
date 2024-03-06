import React from "react";

function LeaderOfHeader({ name }) {
  return (
    <div className="header-icons">
      <img src="images/leaderOf.gif" alt="leader of" />
      <img src={`images/${name}.gif`} alt={name} />
    </div>
  );
}

export default LeaderOfHeader;
