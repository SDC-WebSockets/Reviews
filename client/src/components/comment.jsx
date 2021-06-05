import React from 'react';
import { arrowDownPath, arrowUpPath } from '../svg.js';
import {
  CommentWrapper,
  CommentStyle,
  ShowMore,
  ArrowSVG,
  ArrowSVGPath,
  CommentWithBoldSearchTermWrapper,
  ShowMoreWrapper,
  reviewGradientStyle
} from '../styles/comment.style.js';

const Comment = (props) => {
  const CommentWithBoldSearchTerm = () => {
    const comment = props.review.comment;
    const searchTerm = props.currentSearchTerm;
    const boldString = (string, term) => {
      let regExp = new RegExp ('(' + term + ')', 'gi');
      return string.replaceAll(regExp, '<strong>$1</strong>');
    };
    const newComment = boldString(comment, searchTerm);

    return (
      <CommentWithBoldSearchTermWrapper className="commentWithBoldSearchTerm" dangerouslySetInnerHTML={{ __html: newComment}}/>
    );
  };



  return (
    <CommentWrapper>
      <CommentStyle className="reviewComment" id={`commentId${props.review._id}`}
        style={props.review.comment.length > 300 && props.commentHeight === '100px' ? reviewGradientStyle : {height: 'auto'}}>
        {props.currentSearchTerm ? <CommentWithBoldSearchTerm/> : props.review.comment}
      </CommentStyle>
      {props.review.comment.length > 300 &&

        <ShowMoreWrapper onClick={() => { props.handleClick('showMore'); } }>
          {props.commentHeight === '100px' ?
            <ShowMore>Show more
              <ArrowSVG viewBox="0 0 24 24">
                <ArrowSVGPath strokeWidth="0.1" d={arrowDownPath}/>
              </ArrowSVG>
            </ShowMore> :
            <ShowMore>Show less
              <ArrowSVG viewBox="0 0 24 24">
                <ArrowSVGPath strokeWidth="0.1" d={arrowUpPath}/>
              </ArrowSVG>
            </ShowMore>
          }
        </ShowMoreWrapper>
      }
    </CommentWrapper>
  );

};

export default Comment;