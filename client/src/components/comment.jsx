import React from 'react';
import { arrowDownPath, arrowUpPath } from '../svg.js';
import {
  CommentStyle,
  ShowMoreContainer,
  ShowMore,
  Arrow,
  ArrowPath
} from '../styles/comment.style.js';

const Comment = (props) => {
  // console.log('Props in Comment:', props);
  const CommentWithBoldSearchTerm = () => {
    const comment = props.review.comment;
    const searchTerm = props.currentSearchTerm;
    const boldString = (string, term) => {
      let regExp = new RegExp ('(' + term + ')', 'gi');
      return string.replaceAll(regExp, '<strong>$1</strong>');
    };
    const newComment = boldString(comment, searchTerm);

    return (
      <div className="commentWithBoldSearchTerm" dangerouslySetInnerHTML={{ __html: newComment}}></div>
    );
  };

  return (
    <div>
      <CommentStyle className="reviewComment">
        {props.currentSearchTerm ? <CommentWithBoldSearchTerm/> : props.review.comment}
      </CommentStyle>
      {props.review.comment.length > 300 &&
      <ShowMoreContainer>
        <ShowMore onClick={() => { props.handleClick('showMore'); } }>{props.wholeView === false ?

          <span style={{display: 'flex', alignItems: 'center'}}>Show more
            <Arrow viewBox="0 0 24 24">
              <ArrowPath strokeWidth="0.1" d={arrowDownPath}/>
            </Arrow>
          </span> :
          <span style={{display: 'flex', alignItems: 'center'}}>Show less
            <Arrow viewBox="0 0 24 24">
              <ArrowPath strokeWidth="0.1" d={arrowUpPath}/>
            </Arrow>
          </span>
        }
        </ShowMore>
      </ShowMoreContainer>
      }
    </div>
  );

};

export default Comment;