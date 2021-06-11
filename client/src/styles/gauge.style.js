import styled from 'styled-components';

export const GaugeStyle = styled.span`
  display: grid;
  flex-basis: 380px;
  width: auto;
  min-width: 280px;
  max-width: 380px;
  margin-right: 16px;
`;

export const BlackBar = styled.div`
  height: 8px;
  background-color: rgb(115, 114, 108);
  grid-column: 1;
  grid-row: 1;
  z-index: 2;
`;

export const GreyBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgb(220, 218, 203);
  margin-right: 16px;
  grid-column: 1;
  grid-row: 1;
  z-index: 1;
`;