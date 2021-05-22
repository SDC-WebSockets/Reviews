import React from 'react';
import { thumbsUp, thumbsDown } from '../svg.js';
import { Helpful, ButtonStyle, ButtonContainer, Thumbs, Report } from '../styles/buttons.style.js';

const Buttons = () => (
  <div>
    <Helpful>Was this review helpful?</Helpful>
    <ButtonStyle>
      <ButtonContainer>
        <Thumbs className="thumbs-up" value="yes">
          <span dangerouslySetInnerHTML={{ __html: thumbsUp }}></span>
        </Thumbs>
      </ButtonContainer>
      <ButtonContainer>
        <Thumbs className="thumbs-down" value="no">
          <span dangerouslySetInnerHTML={{ __html: thumbsDown }}></span>
        </Thumbs>
      </ButtonContainer>
      <ButtonContainer>
        <Report>Report</Report>
      </ButtonContainer>
    </ButtonStyle>
  </div>
);

export default Buttons;