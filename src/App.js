import React from "react";
import "./customBlocks/custom_Blocks";
import PreviewArea from "./components/PreviewArea";
import BlocklyComponent from "./Blockly/BlocklyComponent";

const App = () => {
  // Toolbox configuration to be used in blockly
  const toolboxCategories = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Motion",
        colour: "#5C81A6",
        contents: [
          {
            kind: "block",
            type: "move_x",
          },
          {
            kind: "block",
            type: "move_y",
          },
          {
            kind: "block",
            type: "turn_clockwise",
          },
          {
            kind: "block",
            type: "turn_anti_clockwise",
          },
          {
            kind: "block",
            type: "goto_custom_location",
          },
        ],
      },
      {
        kind: "category",
        name: "Looks",
        colour: "#612f93",
        contents: [
          {
            kind: "block",
            type: "sprite_size",
          },
          {
            kind: "block",
            type: "say_message",
          },
          {
            kind: "block",
            type: "say_message_timed",
          },
          {
            kind: "block",
            type: "show_sprite",
          },
          {
            kind: "block",
            type: "hide_sprite",
          },
          {
            kind: "block",
            type: "hide_message",
          },
        ],
      },
      {
        kind: "category",
        name: "Events",
        colour: "#e5db2a",
        contents: [
          {
            kind: "block",
            type: "key_pressed",
          },
        ],
      },
      {
        kind: "category",
        name: "Controls",
        colour: "#ff7b00",
        contents: [
          {
            kind: "block",
            type: "controls_if",
          },
          {
            kind: "block",
            type: "controls_whileUntil",
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          {/* Blockly component which injects blocky workspace */}
          <BlocklyComponent
            readOnly={false}
            trashcan={true}
            toolbox={toolboxCategories}
            move={{
              scrollbars: true,
              drag: true,
              wheel: true,
            }}
            initialXml={`<xml xmlns="https://developers.google.com/blockly/xml" id="workspaceBlocks" style="display: none"></xml>`}
          ></BlocklyComponent>
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea />
        </div>
      </div>
    </div>
  );
};

export default App;
