import styled from 'styled-components';

export const FeedbackWrapper = styled.div``;

export const NoFeedback = styled.div``;

export const FeedbackStyle = styled.div`
  display: flex;
  width: 600px;
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

export const CourseGrade = styled.div`
  line-height: 64px;
  font-size: 64px;
`;

export const StarsWrapper = styled.div`
  padding: 4px;
`;

export const CourseRatingTitle = styled.div`
`;

export const Tiers = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 32px;
  /* width: 468px; */
  width: 100%;
`;

export const Tier = styled.span`
  display: flex;
  align-items: center;
`;

export const Data = styled.span`
  color: rgb(15, 124, 144);
  display: flex;
  /* width: 468px; */
  width: 100%;
  height: 20px;
  margin-bottom: 8px;
  align-items: center;
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
  position: relative;
`;

export const SearchControlsWrapper = styled.div``;

export const SearchControls = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const TierSelect = styled.select``;

export const TierMenu = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #989586;
  width: 176px;
  height: 46px;

  & ${TierSelect} {
    cursor: pointer;
    padding: 12px;
    margin-right: 12px;
    width: 176px;
    color: rgb(115, 114, 108);
    font-size: 16px;
    border: none;
    background-position: 100% 100%;
    outline: none;
    /* appearance: none; */
  }
`;

export const TierOption = styled.option``;