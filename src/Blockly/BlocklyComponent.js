import React, { useEffect, useRef } from "react";
import Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import locale from "blockly/msg/en";
import "blockly/blocks";
import Icon from "../components/Icon";

Blockly.setLocale(locale);

const BlocklyComponent = (props) => {
  // Refs
  const blocklyDiv = useRef();
  const toolbox = useRef();
  let primaryWorkspace = useRef();

  // Function to generate and run code
  const generateCode = () => {
    var code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
    console.log(code);
    new Function(code)();
  };

  // Blocky injection in a container
  useEffect(() => {
    const { initialXml, toolbox, children, ...rest } = props;

    primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox,
      ...rest,
    });
  }, [primaryWorkspace, toolbox, blocklyDiv, props]);

  return (
    <>
      <div className="w-full flex flex-col">
        <button
          className="flex justify-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={generateCode}
        >
          <Icon name="flag" size={15} className="text-green-600 mx-2" />
        </button>

        <div ref={blocklyDiv} id="blocklyDiv" className="h-full w-full" />
      </div>

      <div style={{ display: "none" }} ref={toolbox}>
        {props.children}
      </div>
    </>
  );
};

export default BlocklyComponent;
