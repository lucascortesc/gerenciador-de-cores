import styled from "styled-components";

export const Step1Container = styled.div`
  .step1__title {
    font-weight: bold;
    font-size: 24px;
    color: #fd377e;
    margin-bottom: 15px;
  }

  .erro {
    font-size: 12px;
    color: red;
  }

  Button {
    display: block;
    margin-top: 25px;
    margin-left: auto;
  }
`;

export const Step2Container = styled.div`
  max-height: 500px;
  overflow: auto;
  padding-right: 10px;

  &::-webkit-scrollbar-track {
    padding: 2px;
    background-color: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #fd377e;
  }

  .step2__title {
    font-weight: bold;
    font-size: 24px;
    color: #fd377e;
  }

  .erro {
    font-size: 12px;
    color: red;
  }

  .step2__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .step2__colorTitle {
  }

  .step2__headerSeparator {
    width: 60%;
    height: 1px;
    background-color: #fd377e;
    margin: 15px auto;
  }

  .step2__container-button Button {
    display: block;
    margin: 10px auto;
    background-color: #38b000;
  }

  .step2__container-color {
    display: flex;
    justify-content: space-between;
  }

  .step2__container-color Button {
    color: black;
  }

  .step2__conteinar-delete {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .step2__container-buttons {
    display: flex;
    justify-content: space-around;
  }
`;

export const Step3Container = styled.div`
  .step3__title {
    font-weight: bold;
    font-size: 24px;
    color: #fd377e;
    margin-bottom: 15px;
  }

  .step3__name {
    color: #fd377e;
    margin-left: 10px;
    font-weight: bold;
  }

  .step3__title {
    margin-bottom: 30px;
  }

  .step3__color {
    width: 50px;
    height: 48px;
  }

  .step3__name-container {
    margin-bottom: 30px;
  }

  .step3__name-color {
    width: 40%;
    font-weight: bold;
  }

  .step3__container-names {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .step3__container-buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
  }

  .step3__container-buttons Button {
    :hover {
      filter: brightness(1.1);

      transform: scale(1.1);
      transition: transform 0.2s;
    }
  }
`;

export const Cover = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 50;

  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.8);

  .popover {
    padding: 10px;
    position: absolute;
    z-index: 51;
  }
`;
