import { useMemo } from "react";

import { TCellDimensionProp } from "../types";
import { getNumberOfElementsOfSize } from "../utils";

export const useVisibleRowIndexes = ({
  scrollTop,
  scrollLeft,
  rowHeight,
  columnWidth,
  containerWidth,
  containerHeight,
  maxRows,
  maxColumns
}: {
  scrollTop: number;
  scrollLeft: number;
  rowHeight: TCellDimensionProp;
  columnWidth: TCellDimensionProp;
  containerWidth: number;
  containerHeight: number;
  maxRows: number;
  maxColumns: number;
}) => useMemo(() => {
  return {
    firstVisibleRowIndex: getNumberOfElementsOfSize(scrollTop, rowHeight, maxRows),
    lastVisibleRowIndex: getNumberOfElementsOfSize((scrollTop + containerHeight), rowHeight, maxRows),
    firstVisibleColumnIndex: getNumberOfElementsOfSize(scrollLeft, columnWidth, maxColumns),
    lastVisibleColumnIndex: getNumberOfElementsOfSize((scrollLeft + containerWidth), columnWidth, maxColumns),
  };
}, [columnWidth, containerHeight, containerWidth, maxColumns, maxRows, rowHeight, scrollLeft, scrollTop]);
