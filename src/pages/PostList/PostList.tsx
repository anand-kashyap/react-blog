import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/atoms/Card/Card';
import { Searchbox } from '../../components/molecules/Searchbox/Searchbox';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchPosts, selectPosts } from '../../redux/posts/postsSlice';
import styles from './PostList.module.css';

export default function PostList() {
  const { data: posts, status } = useAppSelector(selectPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm('');
    dispatch(fetchPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={styles.blogHeader}>
        <h1>Blog</h1>
        <Searchbox
          onSearch={(inputVal) => {
            dispatch(fetchPosts(inputVal));
            setSearchTerm(inputVal);
          }}
        />
      </div>
      {searchTerm !== '' && <h2>Search Results for "{searchTerm}"</h2>}
      {status === 'loading' && <p>Loading...</p>}
      {posts.map((post) => (
        <Card key={post.id} onClick={() => navigate(`/${post.id}`)} description={post.body} title={post.title} />
      ))}
    </div>
  );
}
