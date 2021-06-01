import styled from 'styled-components';

export const ReviewStyle = styled.div`
  display: flex;
  border-bottom-color: rgb(220, 218, 203);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  height: auto;
  padding-bottom: 24px;
  padding-top: 16px;
  width: 600px;
`;

export const ReviewReviewerAvatar = styled.div`
  min-width: 72px;
`;

export const ReviewReviewerInitials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  object-fit: cover;
  font-size: 16px;
  font-weight: 700;
  color: rgb(255, 255, 255);
  width: 48px;
  height: 48px;
  aspect-ratio: auto 48 / 48;
`;

export const ReviewReviewerPicture = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
  aspect-ratio: auto 48 / 48;
  border-color: rgb(220,218,203);
  border-style: solid;
  border-width: 1px;
`;

export const ReviewContent = styled.div`
  clear: left;
  display: block;
`;

export const ReviewName = styled.div`
  font-size: 16px;
  font-weight: 700;
  height: 19px;
  line-height: 19.2px;
  margin-right: 16px;
  width: auto;
`;