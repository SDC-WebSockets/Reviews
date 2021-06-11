import React from 'react';
import { thumbsUpPath, thumbsDownPath } from '../svg.js';
import {
  ButtonsWrapper,
  Helpful,
  ButtonWrapper,
  Thumbs,
  Report
} from '../styles/buttons.style.js';

const Buttons = (props) => (
  <ButtonsWrapper>
    {props.reviewState.thumbsUp === true || props.reviewState.thumbsDown === true ?
      <Helpful>Thank you for your feedback</Helpful> :
      <Helpful>Was this review helpful?</Helpful>
    }
    <ButtonWrapper>
      <Thumbs className="thumbs-up" onClick={() => { props.handleClick('thumbsUp'); }}
        style={props.reviewState.thumbsUp === true ?
          { borderColor: 'rgb(15, 124, 144)', backgroundColor: 'rgb(15, 124, 144)', fill: 'rgb(255, 255, 255)' }
          : null
        }>
        <svg viewBox="0 0 24 24" width="20px" height="20px">
          <path d={thumbsUpPath}/>
        </svg>
      </Thumbs>
      <Thumbs className="thumbs-down" onClick={() => { props.handleClick('thumbsDown'); }}
        style={props.reviewState.thumbsDown === true ?
          { borderColor: 'rgb(15, 124, 144)', backgroundColor: 'rgb(15, 124, 144)', fill: 'rgb(255, 255, 255)' }
          : null
        }>
        <svg viewBox="0 0 24 24" width="20px" height="20px">
          <path d={thumbsDownPath}/>
        </svg>
      </Thumbs>
      <Report onClick={() => { props.handleClick('report'); }}
        style={props.reviewState.reported === true ? { color: 'rgb(9, 76, 89)'} : null }>
        Report
      </Report>
    </ButtonWrapper>
  </ButtonsWrapper>
);

export default Buttons;