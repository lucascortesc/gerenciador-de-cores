import styled from "styled-components";

export const Background = styled.div`
  width: 100vw;
  min-height: 100vh;

  background-color: #212429;

  display: flex;
  justify-content: center;
  align-items: center;

  .register__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .register__header h1 {
    font-weight: bold;
    font-size: 24px;
    color: #fd377e;
  }

  .register__header p {
    font-size: 18px;
    cursor: pointer;
    margin-right: 10px;
  }

  .register__container {
    width: 90%;
    max-width: 480px;
    min-height: 320px;

    background-color: white;

    border-radius: 15px;
    padding: 15px;
  }

  .register__container-form {
    padding: 15px;
  }

  .register__icons-container {
    display: flex;
    margin-top: 15px;
  }

  .register__icon {
    margin-top: 25px;
    margin-left: -30px;
    z-index: 2;
  }

  .register__icon path {
    width: 30px;
    height: 30px;
    color: #757575;
  }

  .erro {
    font-size: 12px;
    color: red;
  }

  .register__lottie {
    margin: 20px 0;
  }

  .register__login {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
  }

  .register__redirect {
    margin-top: 5px;
    cursor: pointer;

    :hover {
      color: #fd377e;
    }
  }

  Button {
    width: 100%;
    background-color: #38b000;
    color: white;
    margin: 20px 0;

    :hover {
      background-color: #38b000;
      font-weight: bold;
      filter: brightness(1.5);

      transform: scale(1.01);
      transition: transform 0.2s;
    }
  }
`;
