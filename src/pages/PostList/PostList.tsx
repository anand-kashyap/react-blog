import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/atoms/Card/Card';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchPosts, selectPosts } from '../../redux/posts/postsSlice';

export default function PostList() {
  const { data: posts, status } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Blog</h1>
      {status === 'loading' && <p>Loading...</p>}
      {posts.map((post) => (
        <Card key={post.id} onClick={() => navigate(`/${post.id}`)} description={post.body} title={post.title} />
      ))}
    </div>
  );
}
