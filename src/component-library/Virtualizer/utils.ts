export const checkNumberProp = (prop: any, fallback: number): number => {
  if (typeof prop === "number" && !isNaN(prop)) {
    return prop;
  } else {
    return fallback;
  }
};

export const checkNumberOrFunctionProp = (
  prop: any,
  fallback: number
): number | ((index: number) => number) => {
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
  style: React.CSSProperties;
}) => JSX.Element | null) => {
  if (typeof prop === "function") {
    return prop;
  } else {
    return fallback;
  }
};
