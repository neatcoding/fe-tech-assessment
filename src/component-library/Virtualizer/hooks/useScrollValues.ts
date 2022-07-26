import { UIEventHandler, useCallback, useState } from "react";

export const useScrollValues = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onScroll = useCallback<UIEventHandler<HTMLElement>>(
    ({ currentTarget }) => {
      const { scrollTop: newScrollTop, scrollLeft: newScrollLeft } = currentTarget;
      setScrollTop(newScrollTop);
      setScrollLeft(newScrollLeft);
    },
    []
  );

  return { onScroll, scrollTop, scrollLeft };
}
