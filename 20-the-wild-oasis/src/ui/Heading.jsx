import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${({ as }) =>
    as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: bolder;
    `}

  ${({ as }) =>
    as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: bolder;
    `}

  ${({ as }) =>
    as === "h3" &&
    css`
      font-size: 1.6rem;
      font-weight: bold;
    `}

  ${({ as = "h4" }) =>
    as === "h4" &&
    css`
      font-size: 2rem;
      font-weight: bold;
    `}
`;

export default Heading;
