import { Comment, PromiseResp } from '../../../types';
import { Button } from '../../atoms/Button/Button';
import styles from './Comments.module.css';

type CommentsProps = {
  data: Comment[];
  status: PromiseResp;
  loadComments: () => any;
};

export function Comments({ data, status, loadComments }: CommentsProps) {
  return (
    <div>
      {status !== 'fulfilled' && (
        <Button disabled={status === 'loading'} onClick={() => loadComments()}>
          Load Comments
        </Button>
      )}
      {status === 'fulfilled' && data.length === 0 && <p>No Comments on this Post yet.</p>}
      {status === 'fulfilled' && data.length > 0 && (
        <>
          <h3>Comments</h3>
          {data.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentHeading}>
                <div className={styles.commentInfo}>
                  <p className={styles.commentAuthor}>
                    {comment.name}({comment.email})
                  </p>
                </div>
              </div>

              <p className={styles.commentBody}>{comment.body}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
