import React, { useState } from 'react'
import { Box, IconButton, InputBase, useTheme } from '@mui/material'
import { AddComment } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'state';
import { SERVER_URL } from 'constants';

const CommentBox = ({ loggedInUserId, postId }) => {
  const { palette } = useTheme();
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const handleCommentSubmit = async () => {
    const response = await fetch(`${SERVER_URL}/posts/${postId}/addComment`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId, commentText }),
      });

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setCommentText("");
  };

  return (
    <>
      <InputBase
            placeholder="Add comment..."
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
            sx={{
              width: "100%",
              height: "20px",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        <Box m="0.5rem" />
        <IconButton 
          onClick={handleCommentSubmit}
          disabled={commentText.trim().length > 0 ? false : true}
          sx={{
              height: "20px",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 1rem",
          }}
        >
            <AddComment />
        </IconButton>
      </>
  )
}

export default CommentBox