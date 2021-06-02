import styled from 'styled-components';

export const ReviewCommentWrapper = styled.div``;

export const ReviewCommentStyle = styled.div`
  width: auto;
  max-width: 600px;
  overflow: hidden;
`;

export const ReviewShowMoreWrapper = styled.div``;

export const ReviewArrow = styled.svg`
  width: 24px;
  height: 15px;
  margin-left: 6px;
`;

export const ReviewArrowPath = styled.path`
  stroke: rgb(15, 124, 144);
  fill: rgb(15, 124, 144);
  &:hover {
    stroke: rgb(9, 76, 89);
    fill: rgb(9, 76, 89);
  }
`;

export const ReviewShowMore = styled.button`
  display: flex;
  align-items: center;
  color: rgb(15, 124, 144);
  height: 40px;
  width: 120px;
  background-color: transparent;
  border-width: 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 16.8px;
  cursor: pointer;
  padding: 0;
  text-align: left;
  left: 112px;
  &:hover {
    color: rgb(9, 76, 89);
    ${ReviewArrowPath} {
      stroke: rgb(9, 76, 89);
      fill: rgb(9, 76, 89);
    }
  }
  &:active {
    color: rgb(9, 76, 89);
    ${ReviewArrowPath} {
      stroke: rgb(9, 76, 89);
      fill: rgb(9, 76, 89);
    }
  }
`;

export const ReviewCommentWithBoldSearchTerm = styled.div``;

export const reviewGradientStyle = {
  height: '100px',
  backgroundColor: 'rgb(60, 59, 55)',
  backgroundImage: 'linear-gradient(180deg, rgb(60, 59, 55), rgb(60, 59, 55) 60px, rgb(255,255,255))',
  backgroundSize: '100%',
  WebkitBackgroundClip: 'text',
  MozBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozTextFillColor: 'transparent'
};

export const reviewDefaultStyle = {
  height: 'auto',
  backgroundColor: 'rgb(60, 59, 55)',
  backgroundImage: 'none',
  backgroundSize: '100%',
  WebkitBackgroundClip: 'none',
  MozBackgroundClip: 'none',
  WebkitTextFillColor: 'rgb(60, 59, 55)',
  MozTextFillColor: 'rgb(60, 59, 55)'
};