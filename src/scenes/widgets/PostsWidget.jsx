import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { SERVER_URL } from "constants";

const PostsWidget = ({ userId, isProfile }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`${SERVER_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getAllPosts = (posts) => {
    if(posts === null || posts === undefined) {
      return [];
    }
    if(Array.isArray(posts)) {
      return posts;
    }
    return [];
  }

  const getUserPosts = async () => {
    const response = await fetch(
      `${SERVER_URL}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const allPosts = getAllPosts(posts);

  return (
    <>
      {allPosts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          pictureBase, // TODO : MIGHT NEED TO REVERT
          userPictureBase,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            isProfile={isProfile}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            pictureBase={pictureBase}
            userPictureBase={userPictureBase}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;