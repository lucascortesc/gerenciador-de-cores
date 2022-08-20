import styled from "styled-components";

export const Background = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #212429;

  display: flex;
  justify-content: center;
  align-items: center;

  .login__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .login__header h1 {
    font-size: 24px;
    color: #fd377e;
  }

  .login__header p {
    font-size: 18px;
    cursor: pointer;
    margin-right: 10px;
  }

  .login__container {
    width: 90%;
    max-width: 480px;
    min-height: 320px;

    background-color: white;

    border-radius: 15px;
    padding: 15px;
  }

  .login__container-form {
    padding: 15px;
  }

  .login__icons-container {
    display: flex;
    margin-top: 15px;
  }

  .login__icon {
    margin-top: 25px;
    margin-left: -30px;
    z-index: 2;
  }

  .login__icon path {
    width: 30px;
    height: 30px;
    color: #757575;
  }

  .login__register {
    width: 100%;
    text-align: center;
    font-size: 12px;
  }

  .login__redirect {
    margin-top: 5px;
    cursor: pointer;

    :hover {
      color: #fd377e;
    }
  }

  .erro {
    font-size: 12px;
    color: red;
  }

  .login__lottie {
    margin: 20px 0;
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
