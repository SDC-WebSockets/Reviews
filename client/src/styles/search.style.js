import styled from 'styled-components';

export const Inputs = styled.span`
  display: flex;
`;

export const SearchBar = styled.input`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top: 1px solid #989586;
  border-right: 0;
  border-bottom: 1px solid #989586;
  border-left: 1px solid #989586;
  width: 303px;
  height: 44px;
  padding-left: 12px;
  padding-right: 40px;
  line-height: 22.4px;
  font-size: 16px;
  overflow: scroll;
  outline: none;
  &:focus{
    border-color: rgb(60, 59, 55);
  }
`;

export const ClearSearchBar = styled.button`
  height: 30px;
  width: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 2px;
  display: block;
  margin-top: 9px;
  margin-bottom: 5px;
  position: absolute;
  left: 358px;
`;

export const SearchButton = styled.button`
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