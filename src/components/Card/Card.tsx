import { Card as AntfCard } from "antd";
import styles from "./Card.module.css";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/constants";
type CardProps = {
  title: string;
  location: string;
  image: string;
  id: string;
  onDelete: (id: string) => void;
};

function Card({ location, image, title, id, onDelete }: CardProps) {
  const navigate = useNavigate();
  const onDeleteHandler = () => {
    fetch(`${url}post/${id}`, { method: "delete" }).then((data) => {
      if (data.ok) {
        onDelete(id);
      }
    });
  };
  const onImageClick = (id: string) => {
    window.navigator.vibrate(200);
    navigate(`/post/${id}`);
  };
  return (
    <AntfCard
      className={styles.card}
      hoverable
      cover={
        <div className={styles.coverImgBg}>
          <img
            onLoad={() => console.log("loaded", title)}
            className={styles.coverImg}
            src={image}
            alt="amsterdam"
            onClick={() => onImageClick(id)}
          />
        </div>
      }
      actions={[<h3 onClick={onDeleteHandler}>delete</h3>]}
    >
      <Meta title={title} description={location} />
    </AntfCard>
  );
}

export default Card;
