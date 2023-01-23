import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '../../components/atoms/Card/Card';
import { Comments } from '../../components/molecules/Comments/Comments';
import { clearComments, fetchCommentsByPostId, selectComments } from '../../redux/comments/commentsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchPostById, selectPost } from '../../redux/post/postSlice';
import { Post as PostType } from '../../types';

export default function Post() {
  const location = useLocation(),
    { data, status } = useAppSelector(selectPost),
    { data: comments, status: commentsStatus } = useAppSelector(selectComments),
    dispatch = useAppDispatch(),
    navigate = useNavigate();

  const postId = location.pathname.slice(1);
  const post = data as PostType;

  useEffect(() => {
    dispatch(fetchPostById(postId));

    return () => {
      dispatch(clearComments());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = post.title + ' | Blog App';
  }, [post.title]);

  return (
    <div>
      <h1>{post.title}</h1>
      {status === 'loading' && <p>Loading Post...</p>}
      <Card key={post.id} onClick={() => navigate(`/${post.id}`)} description={post.body} />
      <Comments data={comments} loadComments={() => dispatch(fetchCommentsByPostId(postId))} status={commentsStatus} />
    </div>
  );
}
