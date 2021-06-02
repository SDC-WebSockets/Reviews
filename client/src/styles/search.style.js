import styled from 'styled-components';

export const ReviewInputs = styled.span`
  display: flex;
`;

export const ReviewSearchInput = styled.div`
  display: flex;
  align-items: center;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top: 1px solid #989586;
  border-right: 0;
  border-bottom: 1px solid #989586;
  border-left: 1px solid #989586;
  min-width: 303px;
  max-width: 600px;
  height: 46px;
  &:focus-within {
    border-color: rgb(60, 59, 55);
  }
`;

export const ReviewSearchBar = styled.input`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  color: rgb(60, 59, 55);
  min-width: 303px;
  max-width: 600px;
  height: 42px;
  padding-top: 2px;
  padding-left: 12px;
  line-height: 22.4px;
  font-size: 16px;
  overflow: scroll;
  outline: none;
  border: none;
`;

export const ReviewClearSearchBar = styled.button`
  height: 30px;
  width: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 2px;
  display: block;
  margin-right: 9px;
  position: relative;
`;

export const ReviewSearchButton = styled.button`
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: rgb(15, 124, 144);
  cursor: pointer;
  height: 48px;
  width: 48px;
  border: 0;
  display: block;
  margin-right: 18px;
  &:hover {
    background-color: rgb(9, 76, 89);
  }
  &:active {
    background-color: rgb(9, 76, 89);
  }
`;