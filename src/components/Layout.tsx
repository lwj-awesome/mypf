/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import ReactStarView from "./three/ReactStarView";

const layoutStyle = css`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -10;
`;

const Layout = (): JSX.Element => {
  return (
    <div css={layoutStyle}>
      <ReactStarView />
    </div>
  );
};

export default Layout;
