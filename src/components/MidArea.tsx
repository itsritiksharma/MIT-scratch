import React, { useState, useRef } from "react";
import Icon from "./Icon";
import { useAppSelector, useAppDispatch } from "../hooks/useTypedHooks";
import { addWidget, updateWidgets } from "store/widgetsSlice";
import { getWidget } from "widgets/getWidget";

const MidArea = (): JSX.Element => {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dispatch = useAppDispatch();
  const { widgetList } = useAppSelector((state) => state.widgets);

  const dragStart = (e: any, position: any) => {
    dragItem.current = position;
  };

  const dragEnter = (e: any, position: any) => {
    dragOverItem.current = position;
  };

  const drop = (e: any) => {
    let transferAction = e.dataTransfer.getData("widgetAction");
    const copyListItems = [...widgetList[0].action];
    const dragItemContent = copyListItems[dragItem.current!];
    copyListItems.splice(dragItem.current!, 1);
    copyListItems.splice(dragOverItem.current!, 0, dragItemContent);
    if (e.target.id == "droppable") {
      dispatch(addWidget({ transferAction }));
    }
    if (e.target.id === "draggable") {
      dispatch(updateWidgets(copyListItems));
    }
  };

  const dragOver = (e: any) => {
    e.preventDefault();
  };

  const fireEvent = (element: any, elementType: any) => {
    if (element.fireEvent) {
      element.fireEvent("on" + elementType);
    } else {
      var evObj = document.createEvent("Events");
      evObj.initEvent(elementType, true, false);
      element.dispatchEvent(evObj);
    }
  };

  const handleClick = (widgetActions: string[], id: string) => {
    if (widgetActions.length === 0) return;
    let i = 0;

    let str1 = `widget-${widgetActions[i]}-${id}-${i}`;

    var cnt = setInterval(() => {
      console.log(i);
      console.log(widgetActions.length);
      if (i === widgetActions.length) {
        clearInterval(cnt);
        return;
      }
      const str2 = `widget-${widgetActions[i]}-${id}-${i}`;
      fireEvent(document.getElementById(str2), "click");
      i++;
    }, 2000);
  };

  return (
    <div className="w-full">
      {widgetList.map((widget, index) => {
        return (
          <div className="h-full" key={index}>
            <button
              className="flex justify-center bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onClick={() => handleClick(widget.action, widget.id)}
            >
              <Icon name="flag" size={15} className="text-green-600 mx-2" />
            </button>
            <div
              id="droppable"
              className="flex-1 h-full overflow-auto"
              onDragOver={dragOver}
              onDrop={(e) => drop(e)}
            >
              {widgetList &&
                widgetList.map(
                  (widget, index) =>
                    widget.action &&
                    widget.action.map((w, id) => {
                      let str = `${w}`;
                      let widgetId = `widget-${str}-${widget.id}-${id}`;
                      return (
                        <div
                          id="draggable"
                          key={`${str}-${widget.id}-${id}`}
                          onDragStart={(e) => dragStart(e, id)}
                          onDragEnter={(e) => dragEnter(e, id)}
                          onDragEnd={(e) => drop(e)}
                          draggable
                        >
                          {getWidget(str, widgetId)}
                        </div>
                      );
                    })
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MidArea;
