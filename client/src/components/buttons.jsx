import React from 'react';
import { thumbsUpPath, thumbsDownPath } from '../svg.js';
import { ReviewHelpful, ReviewButtonStyle, ReviewThumbs, ReviewReport } from '../styles/buttons.style.js';

const Buttons = (props) => (
  <div>
    {props.reviewState.thumbsUp === true || props.reviewState.thumbsDown === true ?
      <ReviewHelpful>Thank you for your feedback</ReviewHelpful> :
      <ReviewHelpful>Was this review helpful?</ReviewHelpful>
    }
    <ReviewButtonStyle>
      <ReviewThumbs className="thumbs-up" onClick={() => { props.handleClick('thumbsUp'); }}
        style={props.reviewState.thumbsUp === true ?
          { borderColor: 'rgb(15, 124, 144)', backgroundColor: 'rgb(15, 124, 144)', fill: 'rgb(255, 255, 255)' }
          : null
        }>
        <svg viewBox="0 0 24 24">
          <path d={thumbsUpPath}/>
        </svg>
      </ReviewThumbs>
      <ReviewThumbs className="thumbs-down" onClick={() => { props.handleClick('thumbsDown'); }}
        style={props.reviewState.thumbsDown === true ?
          { borderColor: 'rgb(15, 124, 144)', backgroundColor: 'rgb(15, 124, 144)', fill: 'rgb(255, 255, 255)' }
          : null
        }>
        <svg viewBox="0 0 24 24">
          <path d={thumbsDownPath}/>
        </svg>
      </ReviewThumbs>
      <ReviewReport onClick={() => { props.handleClick('report'); }}
        style={props.reviewState.reported === true ? { color: 'rgb(9, 76, 89)'} : null }>
        Report
      </ReviewReport>
    </ReviewButtonStyle>
  </div>
);

export default Buttons;