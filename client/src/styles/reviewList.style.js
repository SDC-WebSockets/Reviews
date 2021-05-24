import styled from 'styled-components';

export const ReviewListStyle = styled.div`
  margin-top: 12px;
`;

export const SeeMoreReviews = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 600px;
  background-color: transparent;
  color: rgb(15, 124, 144);
  border-color: rgb(40, 150, 169);
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding-left: 12px;
  padding-right: 12px;
`;

export const SeeMoreReviewsContainer = styled.div`
  &:hover {
    ${SeeMoreReviews} {
      color: rgb(9, 76, 89);
      border-color: rgb(28, 106, 120);
    }
  }
  &:active {
    ${SeeMoreReviews} {
      color: rgb(9, 76, 89);
      border-color: rgb(28, 106, 120);
    }
  }
`;
