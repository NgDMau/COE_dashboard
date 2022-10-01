import styled from "styled-components";

export const ButtonSelectCity = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  div {
    display: flex;
    align-items: center;
  }
  img {
    width: 30px;
    height: 30px;
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
  padding: 20px;
  margin: 20px;
  font-size: 20px;
  .search-input {
    margin-bottom: 20px;
  }
  .container {
    display: flex;
    .city-link {
      width: 20%;
      font-size: 14px;
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
        margin-top: 100px;
      }
    }
  }
  .select-hostpital {
    width: 200px;
  }
`;
