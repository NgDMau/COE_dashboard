import styled from "styled-components";

export const ExplainWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  margin-right: 20px;
`;
export const ContainerExplain = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`;
export const BoxColor = styled.div`
  width: 50px;
  height: 16px;
  background-color: ${(props) => props?.color};
  margin-right: 12px;
  border-radius: 4px;
`;
