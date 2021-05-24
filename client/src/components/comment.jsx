import React from 'react';
import {
  CommentStyle,
  ShowMoreContainer,
  ShowMore
} from '../styles/comment.style.js';

const Comment = (props) => {
  console.log('Props in Comment:', props);
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
        <ShowMore onClick={() => { props.handleClick('showMore'); } }>{props.wholeView === false ? 'Show more' : 'Show less'}</ShowMore>
      </ShowMoreContainer>
      }
    </div>
  );

};

export default Comment;