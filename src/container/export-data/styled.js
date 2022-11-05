import styled from "styled-components";
import { rem } from "../../helpers/rem/px-to-rem";

export const ExportWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .page {
    padding: ${rem(20)} ${rem(40)};
    margin-top: ${rem(20)};
    border-radius: ${rem(4)};
    width: ${rem(800)};
    background-color: white;
    height: fit-content;
    /* box-shadow: 3px 3px 3px 3px #dcdde1; */
  }
`;
