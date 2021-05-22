import React from 'react';
import { CommentStyle } from '../styles/comment.style.js';

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
    <CommentStyle className="reviewComment">
      {props.currentSearchTerm ? <CommentWithBoldSearchTerm/> : props.review.comment}
    </CommentStyle>
  );

};

export default Comment;