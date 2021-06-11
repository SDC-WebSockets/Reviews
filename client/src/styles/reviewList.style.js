import styled from 'styled-components';

export const ReviewListStyle = styled.div`
  margin-top: 12px;
  height: auto;
  min-height: 600px;
  width: auto;
  min-width: 300px;
  max-width: 700px;
`;

export const SeeMoreReviews = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  background-color: transparent;
  color: rgb(15, 124, 144);
  border-color: rgb(40, 150, 169);
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  padding-left: 12px;
  padding-right: 12px;
  margin-bottom: 22px;
  &:hover {
    color: rgb(9, 76, 89);
    border-color: rgb(28, 106, 120);
  }
  &:active {
    color: rgb(9, 76, 89);
    border-color: rgb(28, 106, 120);
  }
`;
