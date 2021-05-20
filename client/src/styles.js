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
  width: auto;
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
  width: auto;
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
  max-width: 600px;
`;

export const Helpful = styled.p`
  font-size: 12px;
`;

export const Buttons = styled.div`
  display: flex;
`;

export const Thumbs = styled.button`
  align-items: center;
  background-color: transparent;
  border-color: rgb(40, 150, 169);
  border-width: 1px;
  border-style: solid;
  border-radius: 50%;
  color: gb(15, 124, 144);
  cursor: pointer;
  margin-right: 8px;
  padding: 10px;
  padding: 10px;
  position: relative;
  text-align: center;
  width: 40px;
  height: 40px;
`;

export const Report = styled.button`
  color: #0f7c90;
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-family: Arial;
  letter-spacing: -0.2px;
  line-height: 19.6px;
  min-width: auto;
  text-align: center;
  text-rendering: auto;
  white-space: nowrap;
  writing-mode horizontal-tb;
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
  min-width 600px;
  max-width: 1084px;
  width: auto;
`;

export const ReviewerAvatar = styled.div`
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
  min-width 600px;
  max-width: 1084px;
  width: auto;
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

// Feedback and Search
export const ReviewControls = styled.div`
  display: flex;
  justify-content: space-between;
  min-width 600px;
  max-width: 1084px;
  width: auto;
  padding-top: 16px;
`;

export const Inputs = styled.div`
  display: flex;
`;

export const SearchBar = styled.input`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid #989586;
  min-width: 420px;
  max-width: 500px;
  height: 44px;
  padding-left: 12px;
  line-height: 22.4px;
  font-size: 16px;
  overflow: scroll;
`;

export const SearchButton = styled.button`
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: rgb(15, 124, 144);
  cursor: pointer;
  height: 48px;
  width: 48px;
  border: 0;
  justify-content: center;
`;

export const TierSelect = styled.select`
  color: rgb(115, 114, 108);
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #989586;
  margin-left: 16px;
  width: 180px;
  height: 48px;
  line-height: 22.4px;
  font-size: 16px;
  padding-left: 12px;
  padding-right: 40px;
  background-position: 100% 100%;
`;

// Feedback
export const Tier = styled.div`
  display: flex;
  color: rgb(15, 124, 144);
  height: 20px;
`;

export const TierX = styled.button`
  justify-content: center;
  height: 16px;
  width: 16px;
  background-color: transparent;
  border: none;
  padding: 2px;
`;

