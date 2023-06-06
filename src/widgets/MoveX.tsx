import { useAppSelector } from "hooks/useTypedHooks";
import React, { useState } from "react";

const MoveX = ({ id }: { id?: string }): JSX.Element => {
  const [input, setInput] = useState(10);
  const characters = useAppSelector((state) => state.characters);

  // Function used for moving Sprite
  const handleClick = () => {
    var sprite = document.getElementById(`${characters.active}`) as HTMLElement;
    var offset = sprite.offsetLeft - sprite.scrollLeft;

    if (input > 0) {
      sprite.style.left = offset + input + "px";
    } else if (input < 0) {
      sprite.style.left = offset + input + "px";
    }
  };

  return (
    <div
      id={id}
      className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      onClick={() => handleClick()}
    >
      {"Move "}
      <input
        onChange={(e) => setInput(parseInt(e.target.value))}
        className="w-10 text-black"
        type="number"
        value={input}
      />
      {" steps in x"}
    </div>
  );
};

export default MoveX;
