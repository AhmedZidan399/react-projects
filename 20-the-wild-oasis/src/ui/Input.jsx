import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  padding: 0.4rem 0.8rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);

  &:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }
`;

export default Input;
