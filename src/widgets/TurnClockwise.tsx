import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useTypedHooks";
import { updateWidgets } from "store/widgetsSlice";
import { setAngle } from "store/characterSlice";
import Icon from "../components/Icon";

const TurnAntiClock = ({ id }: { id?: string }): JSX.Element => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState(15);
  const characters = useAppSelector((state) => state.characters);

  // Function used for turning Sprite
  const handleClick = () => {
    var active_sprite = characters.active;

    dispatch(setAngle(input));
    var angle = characters.characters[0].angle;

    var sprite = document.getElementById(`${active_sprite}`) as HTMLElement;
    sprite.style.transform = `rotate(${input + angle}deg)`;
  };
  return (
    <div
      id={id}
      className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      onClick={() => handleClick()}
    >
      {"Turn "}
      <Icon name="redo" size={15} className="text-white mx-2" />
      <input
        onChange={(e) => setInput(parseInt(e.target.value))}
        className="w-10 text-black"
        type="number"
        value={input}
      />
      {" degrees"}
    </div>
  );
};

export default TurnAntiClock;
