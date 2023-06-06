import React from "react";
import MoveX from "../widgets/MoveX";
import MoveY from "../widgets/MoveY";
import TurnAntiClock from "../widgets/TurnAntiClock";
import TurnClockWise from "../widgets/TurnClockwise";

export const getWidget = (action: string, id?: string) => {
  switch (action) {
    case "MOVE-X":
      return <MoveX id={id} />;
    case "MOVE-Y":
      return <MoveY id={id} />;
    case "TURN-AC":
      return <TurnAntiClock id={id} />;
    case "TURN-C":
      return <TurnClockWise id={id} />;
    default:
      break;
  }
};
