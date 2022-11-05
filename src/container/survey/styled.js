import styled from "styled-components";
import { rem } from "../../helpers/rem/px-to-rem";

export const ButtonSelectCity = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  div {
    display: flex;
    align-items: center;
  }
  img {
    width: ${rem(30)};
    height: ${rem(30)};
  }
`;

export const CityWrapper = styled.div`
  font-weight: 500;
`;
export const LinkHeader = styled.div`
  display: flex;
  width: 60vw;
  align-items: center;
  justify-content: space-between;
`;
export const SurveyLinkWrapper = styled.div`
  width: 90%;
  background-size: cover;
  padding: ${rem(20)};
  margin: ${rem(20)};
  font-size: ${rem(20)};
  .search-input {
    margin-bottom: ${rem(20)};
  }
  .container {
    display: flex;
    .city-link {
      width: 20%;
      font-size: ${rem(14)};
      .link-container {
        display: flex;
        align-items: center;
        cursor: pointer;
        width: fit-content;

        :hover {
          text-decoration: underline;
          color: green;
        }
      }
      .not-participate {
        color: #bdc3c7;
      }
      .selected {
        text-decoration: underline;
        color: green;
      }
    }
    .link-selected {
      flex: 88%;
      .link {
        cursor: pointer;
        :hover {
          text-decoration: underline;
          color: blue;
        }
      }
      .chart {
        width: 60vw;
        margin-top: 2em;
        border-radius: 5px;
      }
      .loading-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: ${rem(100)};
      }
    }
  }
  .select-hostpital {
    width: ${rem(200)};
  }
`;
