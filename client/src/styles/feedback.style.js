import styled from 'styled-components';

export const ReviewFeedbackStyle = styled.div`
  display: flex;
`;

export const ReviewOverallRating = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(190, 90, 14);
  font-weight: 700;
  height: 132px;
  width: 100px;
`;

export const ReviewGrade = styled.div`
  line-height: 64px;
  font-size: 64px;
`;

export const ReviewTiers = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 32px;
  width: 468px;
`;

export const ReviewTier = styled.span`
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

export const ReviewPercentage = styled.span`
  margin-left: 8px;
  margin-right: 10px;
`;

export const ReviewTierX = styled.button`
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

export const ReviewControls = styled.div`
  display: flex;
  justify-content: center;
`;

export const ReviewTierSelect = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #989586;
  width: 178px;
  height: 46px;

  & select {
    cursor: pointer;
    padding: 12px;
    margin-right: 12px;
    width: 180px;
    color: rgb(115, 114, 108);
    font-size: 16px;
    border: none;
    background-position: 100% 100%;
    outline: none;
    /* appearance: none; */
  }
`;