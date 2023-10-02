import { Button, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../utils/constants";
import { SinglePostType } from "../Feed/Feed";
import styles from "./Pos.module.css";
function Post() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<SinglePostType | null>(null);
  useEffect(() => {
    fetch(`${url}post/${params.id}`)
      .then((data) => data.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      });
  }, []);
  const onShare = () => {
    navigator
      .share({
        title: post?.title,
        text: post?.title,
        url: `https://react-pwa-three-green.vercel.app/post/${params.id}`,
      })
      .then(() => console.log("Post shared successfully."))
      .catch((error) => console.log("Error sharing", error));
  };
  const canShare = !!navigator.share;
  return (
    <div className={styles.post}>
      {loading && <Skeleton active />}
      {!loading && post && (
        <div className={styles.postContent}>
          <img src={post.image} width={320} />
          <h2>{post.title}</h2>
          <h3>&#128205; {post.location}</h3>
          {canShare ? (
            <Button onClick={onShare} className={styles.btn} type="link">
              SHARE
            </Button>
          ) : (
            <p className={styles.btn}>
              share Api is not supported on your device!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Post;
