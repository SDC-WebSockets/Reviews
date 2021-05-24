import styled from 'styled-components';

export const CommentStyle = styled.div`
  width: auto;
  max-width: 600px;
`;

export const ShowMore = styled.button`
  color: rgb(15, 124, 144);
  display: block;
  height: 40px;
  width: 100px;
  background-color: transparent;
  border-width: 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
  cursor: pointer;
  padding: 0;
  text-align: left;
  left: 112px;
`;

export const ShowMoreContainer = styled.div`
  &:hover {
    ${ShowMore} {
      color: rgb(9, 76, 89);
    }
  }
  &:active {
    ${ShowMore} {
      color: rgb(9, 76, 89);
    }
  }
}
`;