import styled from 'styled-components';

export const TiersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 32px;
  width: 100%;
`;

export const Tier = styled.span`
`;

export const Data = styled.span`
  color: rgb(15, 124, 144);
  display: flex;
  align-items: center;
  width: auto;
  height: 20px;
  margin-bottom: 8px;
`;

export const Percentage = styled.span`
  margin-left: 8px;
  margin-right: 10px;
  min-width: 30px;
  max-width: 30px;
  height: 17px;
`;

export const TierX = styled.button`
  height: 24px;
  width: 24px;
  padding: 4px 0 2px 0;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  position: relative;
`;
