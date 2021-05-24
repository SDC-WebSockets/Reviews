import styled from 'styled-components';

export const CommentStyle = styled.div`
  width: auto;
  max-width: 600px;
`;

export const ShowMore = styled.button`
  color: rgb(15, 124, 144);
  display: block;
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
`;

export const Arrow = styled.svg`
  width: 24px;
  height: 15px;
  margin-left: 6px;
`;

export const ArrowPath = styled.path`
  stroke: rgb(15, 124, 144);
  fill: rgb(15, 124, 144);
`;

export const ShowMoreContainer = styled.div`
  &:hover {
    ${ShowMore} {
      color: rgb(9, 76, 89);
    }
    ${ArrowPath} {
      stroke: rgb(9, 76, 89);
      fill: rgb(9, 76, 89);
    }
  }
  &:active {
    ${ShowMore} {
      color: rgb(9, 76, 89);
    }
    ${ArrowPath} {
      stroke: rgb(9, 76, 89);
      fill: rgb(9, 76, 89);
    }
  }
}
`;