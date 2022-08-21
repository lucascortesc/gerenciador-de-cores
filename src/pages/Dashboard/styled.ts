import styled from "styled-components";

export const Background = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #212429;

  display: flex;
  justify-content: center;

  .dashboard__container-content {
    max-width: 1600px;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 30px;
  }

  .dashboard__container-lottie {
    max-width: 320px;
    max-height: 320px;

    height: 60vw;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dashboard__flexContainer {
    display: flex;
    flex-direction: column;

    gap: 15px;
  }

  .dashboard__wellcomeText {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 35px;
  }

  h1 {
    color: #fd377e;
    font-size: 26px;
    text-align: center;
  }

  h2 {
    color: white;
    text-align: center;
  }

  Button {
    color: white;
    background-color: #38b000;

    width: 150px;
    height: 38px;

    :hover {
      background-color: #38b000;
      font-weight: bold;
      filter: brightness(1.5);
      transform: scale(1.1);
      transition: transform 0.2s;
    }
  }

  @media screen and (min-width: 1120px) {
    .dashboard__container-content {
      justify-content: space-between;

      padding: 0% 50px;
    }

    .dashboard__container-lottie {
      max-width: 75%;

      height: 60vw;

      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 600px;
      max-height: 600px;
    }

    h1 {
      font-size: 42px;
      text-align: start;
    }

    h2 {
      text-align: start;
    }

    Button {
      margin-top: 40px;
    }
  }
`;
