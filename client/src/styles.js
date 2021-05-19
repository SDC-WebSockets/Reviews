import styled from 'styled-components';

const initialsColors = ['rgb(77, 171, 101)', 'rgb(156, 70, 127)', 'rgb(240, 189, 79)', 'rgb(115, 114, 108)', 'rgb(40, 150, 169)'];
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const MainStyle = styled.div`
  box-sizing: border-box;
  color: rgb(60, 59, 55);
  display: block;
  font-family: "sf pro text", -apple-system, system-ui, Roboto, "segoe ui", Helvetica, Arial, sans-serif, "apple color emoji", "segoe ui emoji", "segoe ui symbol";
  font-size: 14px;
  font-weight: 400;
  float: left;
  letter-spacing: -0.2px
  line-height: 22.4px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  min-height 701px;
  min-width 600px;
  max-width: 1084px;
  padding-bottom: 0px;
  padding-left: 32px;
  padding-right: 0px;
  padding-top: 32px;
  text-size-adjust: 100%;
  width: 652px;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 28.8px;
  margin-block-start: 0px;
  margin-block-end: 16px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

// Review / Featured components
export const Name = styled.div`
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 700;
  height: 19px;
  line-height: 19.2px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 16px;
  margin-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  width: 200px;
`;

export const Rating = styled.div`
  margin: .8rem 0;
  display: flex;
  align-items: center;
  height: 20px;
`;

export const Moment = styled.span`
  color: #73726c;
  margin-left: .8rem;
`;

export const Comment = styled.div`
`;

export const Helpful = styled.p`
  font-size: 12px;
`;

export const Report = styled.button`
  color: #0f7c90;
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  min-width: auto;
  text-align: center;
  text-rendering: auto;
  white-space: nowrap;
`;

// regular reviews
export const ReviewStyle = styled.div`
  display: flex;
  space-between: 72px;
  border-bottom-color: rgb(220, 218, 203);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  height: auto;
  padding-bottom: 24px;
  padding-top: 16px;
  width: 633px;
`;

export const ReviewerAvatar = styled.div`
  padding-right: 24px;
  width: 72px;
`;

export const ReviewerInitials = styled.div`
  display: inline-flex;
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

export const ReviewerPicture = styled.img`
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

// featured section
export const FeaturedStyle = styled.div`
  background-attachment: scroll;
  background-clip: border-box;
  background-color: rgb(251, 251, 248);
  background-origin: padding-box;
  background-position-x: 0%;
  background-position-y: 0%;
  background-size: auto;
  border-color: rgb(220, 218, 203);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  height: auto;
  line-height: 19.6px;
  margin: 0px;
  padding: 24px;
  width 633px;
`;

export const FeaturedReviewer = styled.div`
  display: flex;
`;

export const FeaturedReviewerAvatar = styled.div`
  margin-right: 8px;
`;

export const FeaturedReviewerInitials = styled.div`
  display: inline-flex;
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

