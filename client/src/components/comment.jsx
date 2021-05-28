import React from 'react';
import { arrowDownPath, arrowUpPath } from '../svg.js';
import {
  CommentStyle,
  gradientStyle,
  defaultStyle,
  ShowMore,
  Arrow,
  ArrowPath
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
      <CommentStyle className="reviewComment" id={`commentId${props.review._id}`}
        style={props.review.comment.length > 300 && props.commentHeight === '100px' ? gradientStyle : {height: 'auto'}}>
        {props.currentSearchTerm ? <CommentWithBoldSearchTerm/> : props.review.comment}
      </CommentStyle>
      {props.review.comment.length > 300 &&

        <div onClick={() => { props.handleClick('showMore'); } }>
          {props.commentHeight === '100px' ?
            <ShowMore>Show more
              <Arrow viewBox="0 0 24 24">
                <ArrowPath strokeWidth="0.1" d={arrowDownPath}/>
              </Arrow>
            </ShowMore> :
            <ShowMore>Show less
              <Arrow viewBox="0 0 24 24">
                <ArrowPath strokeWidth="0.1" d={arrowUpPath}/>
              </Arrow>
            </ShowMore>
          }
        </div>
      }
    </div>
  );

};

export default Comment;