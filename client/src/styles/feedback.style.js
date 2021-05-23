import styled from 'styled-components';

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

export const ReviewControls = styled.span`
  display: flex;
  width: 600px;
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