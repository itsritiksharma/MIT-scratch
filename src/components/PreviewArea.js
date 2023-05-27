import React from "react";
import CatSprite from "./CatSprite";
import { useDispatch, useSelector } from "react-redux";
import {
  addCharacter,
  setActive,
  removeCharacter,
} from "../store/characterSlice";

const PreviewArea = () => {
  const dispatch = useDispatch();
  const allCharacters = useSelector((state) => state.characters);

  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  let elmnt = null;

  function dragMouseDown(e, id) {
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

  function elementDrag(e) {
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
              <div
                id={`${character.id}-message-box-1`}
                className="hidden relative rounded-full border-2 border-solid border-gray-500 p-2 "
              >
                <div className="absolute rounded-full border-2 border-solid border-gray-500 p-2 w-2 top-11 right-2"></div>
              </div>
              <div
                id={`${character.id}-message-box-2`}
                className="w-24 hidden relative rounded border-2 border-solid border-gray-500 p-2"
              ></div>
              <CatSprite />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PreviewArea;
