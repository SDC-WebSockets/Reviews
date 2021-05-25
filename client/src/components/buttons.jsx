import React from 'react';
import { thumbsUpPath, thumbsDownPath } from '../svg.js';
import { Helpful, ButtonStyle, Thumbs, Report } from '../styles/buttons.style.js';

const Buttons = (props) => (
  <div>
    {/* {console.log('Props in Buttons:', props.reviewState)} */}
    {props.reviewState.thumbsUp === true || props.reviewState.thumbsDown === true ?
      <Helpful>Thank you for your feedback</Helpful> :
      <Helpful>Was this review helpful?</Helpful>
    }
    <ButtonStyle>
      <Thumbs className="thumbs-up" onClick={() => { props.handleClick('thumbsUp'); }}
        style={props.reviewState.thumbsUp === true ?
          { borderColor: 'rgb(15, 124, 144)', backgroundColor: 'rgb(15, 124, 144)', fill: 'rgb(255, 255, 255)' }
          : null
        }>
        <svg viewBox="0 0 24 24">
          <path d={thumbsUpPath}/>
        </svg>
      </Thumbs>
      <Thumbs className="thumbs-down" onClick={() => { props.handleClick('thumbsDown'); }}
        style={props.reviewState.thumbsDown === true ?
          { borderColor: 'rgb(15, 124, 144)', backgroundColor: 'rgb(15, 124, 144)', fill: 'rgb(255, 255, 255)' }
          : null
        }>
        <svg viewBox="0 0 24 24">
          <path d={thumbsDownPath}/>
        </svg>
      </Thumbs>
      <Report onClick={() => { props.handleClick('report'); }}
        style={props.reviewState.reported === true ? { color: 'rgb(9, 76, 89)'} : null }>
        Report
      </Report>
    </ButtonStyle>
  </div>
);

export default Buttons;