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
    margin-left: auto !important;
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
    margin: 10px 0;
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
`;

export const Step3Container = styled.div``;

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
