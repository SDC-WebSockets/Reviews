import styled from 'styled-components';

export const ButtonsWrapper = styled.div`
  display: block;
  line-height: 14px;
`;

export const Helpful = styled.p`
  margin-top: 8px;
  font-size: 12px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const Thumbs = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-color: rgb(40, 150, 169);
  border-width: 1px;
  border-style: solid;
  border-radius: 50%;
  color: rgb(15, 124, 144);
  cursor: pointer;
  margin-right: 8px;
  width: 40px;
  height: 40px;
  fill: rgb(40, 150, 169);
  &:hover {
    border-color: rgb(9, 76, 89);
  }
  &:active {
    border-color: rgb(15, 124, 144);
    background-color: rgb(15, 124, 144);
    fill: rgb(255, 255, 255);
  }
`;

export const Report = styled.button`
  color: rgb(15, 124, 144);
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-family: Arial;
  font-size: 14px;
  letter-spacing: -0.2px;
  line-height: 19.6px;
  margin-left: 8px;
  width: auto;
  text-align: center;
  text-rendering: auto;
  white-space: nowrap;
  writing-mode: horizontal-tb;
  &:hover {
    color: rgb(9, 76, 89);
  }
  &:active {
    color: rgb(9, 76, 89);
  }
`;