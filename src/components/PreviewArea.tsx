import React from "react";
import CatSprite from "./CatSprite";
import { useAppDispatch, useAppSelector } from "hooks/useTypedHooks";
import {
  addCharacter,
  setActive,
  removeCharacter,
} from "../store/characterSlice";

const PreviewArea = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const allCharacters = useAppSelector((state) => state.characters);

  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  let elmnt: any = null;

  function dragMouseDown(e: any, id: string) {
    elmnt = document.getElementById(id);

    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: any) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto p-2 relative">
      <div className="flex justify-between items-center">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select active sprite
          </label>
          <select
            id="sprites"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={"none"}
            onChange={(e) => dispatch(setActive(e.target.value))}
          >
            {allCharacters.characters.map((character, i) => {
              return (
                <option value={character.id} key={i}>
                  {character.id}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <button
            type="button"
            className="bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onClick={() => dispatch(removeCharacter(allCharacters.active))}
          >
            Delete active sprite
          </button>
        </div>
        <div>
          <button
            type="button"
            className="bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onClick={() => dispatch(addCharacter())}
          >
            Create new sprite
          </button>
        </div>
      </div>
      {allCharacters.characters.map((character, index) => {
        return (
          <div
            key={index}
            id={character.id}
            className="absolute top-1/2 right-1/2 transform translate-x-1/2 transition ease-in-out"
            onMouseDown={(e) => dragMouseDown(e, character.id)}
          >
            <div>
              <CatSprite />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PreviewArea;
