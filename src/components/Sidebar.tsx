import React from "react";
import { widgetList } from "widgets/widgetList";
import { getWidget } from "widgets/getWidget";

const Sidebar = (): JSX.Element => {
  const dragStart = (e: any, action: string) => {
    e.dataTransfer.setData("widgetAction", action);
  };

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      {/* <div className="font-bold"> {"Events"} </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When this sprite clicked"}
      </div> */}
      <div className="font-bold"> {"Motion"} </div>
      {widgetList.map((widget, id) => (
        <div key={id} draggable onDragStart={(e) => dragStart(e, widget)}>
          {getWidget(widget)}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
