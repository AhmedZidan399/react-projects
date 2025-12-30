import styled from "styled-components";

const StyledEmpty = styled.p`
  text-align: center;
`;

function Empty({ message }) {
  return <StyledEmpty>{message || "Not found."}</StyledEmpty>;
}

export default Empty;
