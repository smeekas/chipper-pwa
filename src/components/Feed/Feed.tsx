import { useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./Feed.module.css";
import { url } from "../../utils/constants";
import { POST_STORE, readAllData } from "../../utils/indexDb";
import useOnline from "../../hook/useOnline";
import { Skeleton } from "antd";
export type SinglePostType = {
  id: string;
  title: string;
  image: string;
  location: string;
};
export type PostType = SinglePostType[];
function Feed() {
  const [posts, setPosts] = useState<PostType>([]);
  const [loading, setLoading] = useState(true);
  const online = useOnline();
  const fetchPost = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setPosts(data);
      setLoading(false);
    } catch (err) {
      readAllData(POST_STORE).then((data) => {
        setPosts(data);
        setLoading(false);
      });
      // alert(err);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);
  const onDeleteHandler = (id: string) => {
    setPosts((prev) => {
      return prev.filter((post) => post.id != id);
    });
  };
  return (
    <div className={`${styles.feedContainer} ${!online ? styles.offline : ""}`}>
      {!online && <h1>OFFLINE</h1>}
      {online && <h1>ONLINE</h1>}
      {loading && <Skeleton active />}
      <div className={styles.feed}>
        {posts.map((postItem) => {
          return (
            <Card onDelete={onDeleteHandler} {...postItem} key={postItem.id} />
          );
        })}
        {/* <Card
          title="title"
          content="content content content content "
          image="https://cdn.britannica.com/30/180130-138-4FC01CDD/Overview-Amsterdam.jpg?w=800&h=450&c=crop"
        />
        <Card
          title="title"
          content="content content content content "
          image="https://cdn.britannica.com/30/180130-138-4FC01CDD/Overview-Amsterdam.jpg?w=800&h=450&c=crop"
        /> */}
        {/* <Card
          title="title"
          location="content content content content "
          image="https://cdn.britannica.com/30/180130-138-4FC01CDD/Overview-Amsterdam.jpg?w=800&h=450&c=crop"
        />
        <Card
          title="title"
          location="content content content content "
          image="https://cdn.britannica.com/30/180130-138-4FC01CDD/Overview-Amsterdam.jpg?w=800&h=450&c=crop"
        /> */}
      </div>
    </div>
  );
}

export default Feed;
