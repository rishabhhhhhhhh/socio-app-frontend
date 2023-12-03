import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "state";
import CommentBox from "./CommentBox";
import { SERVER_URL } from "constants";
import { useNavigate } from "react-router-dom";
  
  const PostWidget = ({
    postId,
    isProfile,
    postUserId,
    name,
    description,
    location,
    pictureBase,
    userPictureBase,
    likes,
    comments,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const navigate = useNavigate();
  
    const patchLike = async () => {
      const response = await fetch(`${SERVER_URL}/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };
  
    const margin = isProfile ? "0 0 2rem 0" : "2rem 0";

    return (
      <WidgetWrapper m={margin}>
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPictureBase={userPictureBase}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {pictureBase && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={pictureBase}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>
  
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        <Box mt="0.5rem" />
        <FlexBetween>
          <CommentBox postId={postId}/>
        </FlexBetween>
        {isComments && (
          <Box mt="1rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`} className="comment-box">
                  <div className="comment-box-details">
                    <div className="comment-box-user-image">
                      <img 
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                        width={"45px"}
                        height={"45px"}
                        alt="user"
                        src={comment.userPictureBase}
                      />
                    </div>
                    <div>
                      <Typography 
                        onClick={() => navigate(`/profile/${comment.userId}`)} 
                        sx={{ color: "darkgrey", m: "0.5rem 0", pl: "1rem", "font-weight": "500", "cursor": "pointer" }}>
                          {comment.firstName} {comment.lastName}
                      </Typography>
                      <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                        {comment.commentText}
                      </Typography>
                    </div>
                  </div>
              </Box>
            ))}
          </Box>
        )}
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;
  