import cx from 'classnames';
import style from './Card.module.css';

type CardProps = {
  title: string;
  description: string;
  onClick?: () => any;
};

export function Card({ title, description, onClick }: CardProps) {
  return (
    <div className={cx(style.card, onClick && style.link)} onClick={onClick}>
      <div className={style.cardContent}>
        <p className={style.cardTitle}>{title}</p>
        <p className={style.description}>{description}</p>
      </div>
    </div>
  );
}
