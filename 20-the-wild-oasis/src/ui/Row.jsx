import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${({ type = "horizontal" }) =>
    type === "horizontal" &&
    css`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `}

  ${({ type }) =>
    type === "vertical" &&
    css`
      flex-direction: column;
    `}
`;

export default Row;
