import React from 'react';
import { arrowDownPath, arrowUpPath } from '../svg.js';
import {
  ReviewCommentStyle,
  ReviewShowMore,
  ReviewArrow,
  ReviewArrowPath,
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
      <div className="commentWithBoldSearchTerm" dangerouslySetInnerHTML={{ __html: newComment}}></div>
    );
  };



  return (
    <div>
      <ReviewCommentStyle className="reviewComment" id={`commentId${props.review._id}`}
        style={props.review.comment.length > 300 && props.commentHeight === '100px' ? reviewGradientStyle : {height: 'auto'}}>
        {props.currentSearchTerm ? <CommentWithBoldSearchTerm/> : props.review.comment}
      </ReviewCommentStyle>
      {props.review.comment.length > 300 &&

        <div onClick={() => { props.handleClick('showMore'); } }>
          {props.commentHeight === '100px' ?
            <ReviewShowMore>Show more
              <ReviewArrow viewBox="0 0 24 24">
                <ReviewArrowPath strokeWidth="0.1" d={arrowDownPath}/>
              </ReviewArrow>
            </ReviewShowMore> :
            <ReviewShowMore>Show less
              <ReviewArrow viewBox="0 0 24 24">
                <ReviewArrowPath strokeWidth="0.1" d={arrowUpPath}/>
              </ReviewArrow>
            </ReviewShowMore>
          }
        </div>
      }
    </div>
  );

};

export default Comment;