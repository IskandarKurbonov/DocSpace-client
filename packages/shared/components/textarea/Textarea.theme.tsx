import React, { PropsWithChildren, forwardRef, useContext } from "react";
import { ThemeContext } from "styled-components";

import { ScrollbarType } from "../scrollbar";

import { StyledThemeTextarea } from "./Textarea.styled";
import { TextareaThemeProps } from "./Textarea.types";

const TextareaTheme = forwardRef<
  HTMLDivElement,
  PropsWithChildren<TextareaThemeProps>
>((props, ref) => {
  const defaultTheme = useContext(ThemeContext);

  const currentColorScheme = defaultTheme?.currentColorScheme;

  return (
    <StyledThemeTextarea
      {...props}
      ref={ref}
      $currentColorScheme={currentColorScheme}
      stype={ScrollbarType.mediumBlack}
    />
  );
});

TextareaTheme.displayName = "TextareaTheme";

export { TextareaTheme };
