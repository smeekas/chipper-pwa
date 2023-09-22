import { Card as AntfCard } from "antd";
import styles from "./Card.module.css";
import Meta from "antd/es/card/Meta";
type CardProps = {
  title: string;
  location: string;
  image: string;
};
function Card({ location, image, title }: CardProps) {
  return (
    <AntfCard
      className={styles.card}
      hoverable
      cover={
        // <div className={styles.coverImgBg}>
        <img
          onLoad={() => console.log("loaded", title)}
          className={styles.coverImg}
          src={image}
          alt="amsterdam"
        />
        // </div>
      }
      actions={["delete"]}
    >
      <Meta title={title} description={location} />
    </AntfCard>
  );
}

export default Card;
