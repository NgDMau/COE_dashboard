import styled from "styled-components";

export const WidgetsWrapper = styled.div`
  width: 24%;
  background-color: ${(props) => props.color || "#321fdb"};
  color: white;
  height: 164px;
  border-radius: 4px;
  padding: 16px;
  .title {
    span {
      font-size: 1.5rem;
      margin-right: 4px;
    }
  }
`;
