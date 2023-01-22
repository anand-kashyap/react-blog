import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Post from './pages/Post/Post';
import PostList from './pages/PostList/PostList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PostList />,
  },
  {
    path: "/:postId",
    element: <Post />,
  },
]);

export function Router () {
  return <RouterProvider router={router} />
}