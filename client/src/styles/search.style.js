import styled from 'styled-components';

export const SearchWrapper = styled.span`
  display: flex;
  flex-basis: 67%;
  min-width: 300px;
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top: 1px solid #989586;
  border-right: 0;
  border-bottom: 1px solid #989586;
  border-left: 1px solid #989586;
  height: 46px;
  &:hover {
    border-color: rgb(118,118,118);
  }
  &:focus-within {
    border-color: rgb(60, 59, 55);
  }
`;

export const SearchBar = styled.input`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  color: rgb(60, 59, 55);
  width: 100%;
  height: 44px;
  /* padding-top: 2px; */
  padding-left: 12px;
  line-height: 22.4px;
  font-size: 16px;
  overflow: scroll;
  outline: none;
  border: none;
`;

export const ClearSearchBar = styled.button`
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

export const ClearSearchBarSVG = styled.svg``;

export const MagnifyingGlassSVG = styled.svg``;

export const SearchButton = styled.button`
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: rgb(15, 124, 144);
  cursor: pointer;
  height: 48px;
  width: 48px;
  min-width: 48px;
  border: 0;
  display: block;
  &:hover {
    background-color: rgb(9, 76, 89);
  }
  &:active {
    background-color: rgb(9, 76, 89);
  }
`;