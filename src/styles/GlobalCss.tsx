import { Global } from "@emotion/react";
import { resetCSS } from "./resetCss";

export default function GlobalStyles() {
  return <Global styles={[resetCSS]} />;
}
