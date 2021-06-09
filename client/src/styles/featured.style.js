import styled from 'styled-components';

export const FeaturedReviewWrapper = styled.div``;

export const FeaturedReviewStyle = styled.div`
  background-attachment: scroll;
  background-clip: border-box;
  background-color: rgb(251, 251, 248);
  border-color: rgb(220, 218, 203);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  height: auto;
  line-height: 19.6px;
  margin-bottom: 24px;
  padding: 24px;
  width: auto;
  min-width: 250px;
  max-width: 650px;
`;

export const FeaturedReviewer = styled.div`
  display: flex;
`;

export const FeaturedReviewerAvatar = styled.div`
  margin-right: 8px;
`;

export const FeaturedReviewerInitials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  object-fit: cover;
  font-size: 16px;
  font-weight: 700;
  color: rgb(255, 255, 255);
  width: 64px;
  height: 64px;
  aspect-ratio: auto 64 / 64;
`;

export const FeaturedReviewerPicture = styled.img`
  border-color: rgb(220,218,203);
  border-style: solid;
  border-width: 1px;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  aspect-ratio: auto 64 / 64;
`;

export const FeaturedReviewerMetadata = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FeaturedReviewerCoursesTaken = styled.div``;

export const FeaturedReviewerReviews = styled.div``;