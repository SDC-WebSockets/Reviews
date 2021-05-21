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
  width: auto;
  min-width: 600px;
  max-width: 1084px;
  padding-bottom: 0px;
  padding-left: 32px;
  padding-right: 0px;
  padding-top: 32px;
  text-size-adjust: 100%;
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

export const StarStyle = styled.svg`
  width: 16px;
  height: 16px;
  margin: 2px;
`;

export const StarsStyle = styled.div`
  width: 100px;
  height: 20px;
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
  width: auto;
  max-width: 600px;
`;

export const Helpful = styled.p`
  font-size: 12px;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

export const Thumbs = styled.button`
  align-items: center;
  display: block;
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
  width: 40px;
  height: 40px;
  fill: rgb(15, 124, 144);
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
  width: auto;
  text-align: center;
  text-rendering: auto;
  white-space: nowrap;
  writing-mode: horizontal-tb;
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
  width: 600px;
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
  margin-bottom: 24px;
  padding: 24px;
  width: 550px;
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

// Feedback and Search
export const ReviewControls = styled.span`
  display: flex;
  width: 600px;
`;

export const Inputs = styled.span`
  display: flex;
`;

export const SearchBar = styled.input`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid #989586;
  width: 356px;
  height: 44px;
  padding-left: 12px;
  padding-right: 40px;
  line-height: 22.4px;
  font-size: 16px;
  overflow: scroll;
  outline: none;
`;

export const ClearSearchBar = styled.button`
  height: 30px;
  width: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 2px;
  display: block;
  margin-top: 9px;
  margin-bottom: 5px;
  position: absolute;
  left: 410px;
`;

export const SearchButton = styled.button`
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: rgb(15, 124, 144);
  cursor: pointer;
  height: 48px;
  width: 48px;
  border: 0;
  display: block;
  margin-right: 18px;
`;

export const TierSelect = styled.select`
  color: rgb(115, 114, 108);
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #989586;
  width: 180px;
  height: 48px;
  line-height: 22.4px;
  font-size: 16px;
  padding-left: 12px;
  background-position: 100% 100%;
  outline: none;
`;

export const Message = styled.div`
  font-size: 16px;
  margin: 16px;
  line-height: 22.4px;
`;

// Feedback
export const FeedbackStyle = styled.div`
  display: flex;
`;

export const OverallRating = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(190, 90, 14);
  font-weight: 700;
  height: 132px;
  width: 100px;
`;

export const Grade = styled.div`
  line-height: 64px;
  font-size: 64px;
`;

export const Tiers = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 32px;
  width: 468px;
`;

export const Tier = styled.span`
  display: flex;
  align-items: center;
`;

export const ReviewData = styled.span`
  color: rgb(15, 124, 144);
  display: flex;
  width: 468px;
  height: 20px;
  margin-bottom: 8px;
  align-items: center;
`;

export const BlackBar = styled.div`
  height: 8px;
  background-color: rgb(115, 114, 108);
  grid-column: 1;
  grid-row: 1;
  z-index: 2;
`;

export const GreyBar = styled.div`
  width: 280px;
  height: 8px;
  background-color: rgb(220, 218, 203);
  margin-right: 16px;
  grid-column: 1;
  grid-row: 1;
  z-index: 1;
`;

export const Percentage = styled.span`
  margin-left: 8px;
  margin-right: 10px;
`;

export const TierX = styled.button`
  align-items: center;
  display: block;
  height: 22px;
  width: 22px;
  background-color: transparent;
  border: none;
  margin-bottom: 6px;
  position: absolute;
  left: 620px;
`;

// change color of buttons
export const ButtonContainer = styled.div`
  &:hover {
    ${SearchButton} {
      background-color: rgb(9, 76, 89);
    }
    ${Thumbs} {
      border-color: rgb(9, 76, 89);
    }
    ${Report} {
      color: rgb(9, 76, 89);
    }
  }
  &:active {
    ${Thumbs} {
      border-color: rgb(15, 124, 144);
      background-color: rgb(15, 124, 144);
      fill: rgb(255, 255, 255);
    }
    ${Report} {
      color: rgb(9, 76, 89);
    }
  }
`;


