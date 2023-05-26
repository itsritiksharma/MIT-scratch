import React from "react";
import CatSprite from "./CatSprite";

const PreviewArea = () => {
  return (
    <div className="flex-none h-full w-full overflow-y-auto p-2 relative">
      <div className=""></div>
      <div
        id="sprite"
        className="absolute top-1/2 right-1/2 transform translate-x-1/2"
      >
        <div
          id="message-box-1"
          className="hidden relative rounded-full border-2 border-solid border-gray-500 p-2 "
        >
          <div className="absolute rounded-full border-2 border-solid border-gray-500 p-2 w-2 top-11 right-2"></div>
        </div>
        <div
          id="message-box-2"
          className="hidden relative rounded border-2 border-solid border-gray-500 p-2"
        ></div>
        <CatSprite />
      </div>
    </div>
  );
};

export default PreviewArea;
