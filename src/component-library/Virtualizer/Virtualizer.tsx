import React, { CSSProperties, memo } from "react";

import {
  checkFunctionProp,
  checkNumberOrFunctionProp,
  checkNumberProp, getSizeOfNumberOfElements,
} from "./utils";
import { TCellDimensionProp } from "./types";
import {useVisibleRowIndexes} from "./hooks/useVisibleRowIndexes";
import {useScrollValues} from "./hooks/useScrollValues";

export const Virtualizer = memo<{
  numRows: number;
  numColumns: number;
  rowHeight: TCellDimensionProp;
  columnWidth: TCellDimensionProp;
  containerHeight: number;
  containerWidth: number;
  children: (info: {
    rowIndex: number;
    columnIndex: number;
    style: CSSProperties;
  }) => JSX.Element | null;
}>((props) => {
  const numRows = checkNumberProp(props.numRows, 0);
  const numColumns = checkNumberProp(props.numColumns, 0);
  const rowHeight = checkNumberOrFunctionProp(props.rowHeight, 0);
  const columnWidth = checkNumberOrFunctionProp(props.columnWidth, 0);
  const containerHeight = checkNumberProp(props.containerHeight, 0);
  const containerWidth = checkNumberProp(props.containerWidth, 0);
  const children = checkFunctionProp(props.children, () => null);

  const totalHeight = getSizeOfNumberOfElements(numRows, rowHeight);
  const totalWidth = getSizeOfNumberOfElements(numColumns, columnWidth);

  const { onScroll, scrollTop, scrollLeft } = useScrollValues();

  const {
    firstVisibleRowIndex,
    lastVisibleRowIndex,
    firstVisibleColumnIndex,
    lastVisibleColumnIndex
  } = useVisibleRowIndexes({
    scrollTop,
    scrollLeft,
    rowHeight,
    columnWidth,
    containerWidth,
    containerHeight,
    maxRows: numRows,
    maxColumns: numColumns
  });

  return (
    <div
      // Styled components are not used below, because lots of changes are done on runtime
      style={{
        height: containerHeight,
        width: containerWidth,
        overflow: "auto",
      }}
      onScroll={onScroll}
    >
      <div
        style={{
          position: "relative",
          height: totalHeight,
          width: totalWidth,
          overflow: "hidden",
        }}
      >
        {new Array(lastVisibleRowIndex + 1 - firstVisibleRowIndex)
          .fill(null)
          .map((_, y) =>
            new Array(lastVisibleColumnIndex + 1 - firstVisibleColumnIndex)
              .fill(null)
              .map((__, x) => {
                const rowIndex = firstVisibleRowIndex + y;
                const columnIndex = firstVisibleColumnIndex + x;
                const style: React.CSSProperties = {
                  position: "absolute",
                  top: getSizeOfNumberOfElements(rowIndex, rowHeight),
                  left: getSizeOfNumberOfElements(columnIndex, columnWidth),
                  height:
                    typeof rowHeight === "number"
                      ? rowHeight
                      : rowHeight(rowIndex),
                  width:
                    typeof columnWidth === "number"
                      ? columnWidth
                      : columnWidth(columnIndex),
                };
                return children({ rowIndex, columnIndex, style });
              })
          )}
      </div>
    </div>
  );
});
