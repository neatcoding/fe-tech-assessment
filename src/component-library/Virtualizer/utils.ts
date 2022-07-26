import { CSSProperties } from "react";

import { TCellDimensionProp } from "./types";

export const checkNumberProp = (prop: any, fallback: number): number => {
  if (typeof prop === "number" && !isNaN(prop)) {
    return prop;
  } else {
    return fallback;
  }
};

export const checkNumberOrFunctionProp = (prop: any, fallback: number): TCellDimensionProp => {
  if ((typeof prop === "number" && !isNaN(prop)) || typeof prop === "function") {
    return prop;
  } else {
    return fallback;
  }
};

export const checkFunctionProp = (
  prop: any,
  fallback: () => null
): ((info: {
  rowIndex: number;
  columnIndex: number;
  style: CSSProperties;
}) => JSX.Element | null) => {
  if (typeof prop === "function") {
    return prop;
  } else {
    return fallback;
  }
};

export const getSizeOfNumberOfElements = (totalElements: number, elementSize: TCellDimensionProp): number =>
  typeof elementSize === "number"
    ? totalElements * elementSize
    : new Array(totalElements)
        .fill(null)
        .reduce<number>((acc, _, index) => acc + elementSize(index), 0);

export const getNumberOfElementsOfSize = (totalSize: number, elementSize: TCellDimensionProp, maxElements: number): number => {
  if (typeof elementSize === 'number') {
    return Math.floor(totalSize / elementSize)
  }

  let elementsCount = 0;
  let sizeAccumulated = 0;
  while (elementsCount < maxElements) {
    sizeAccumulated += elementSize(elementsCount);
    if (sizeAccumulated >= totalSize) {
      break;
    }
    elementsCount += 1;
  }
  return elementsCount;
}
