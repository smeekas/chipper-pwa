import { useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./Feed.module.css";
import { url } from "../../utils/constants";
import { POST_STORE, readAllData } from "../../utils/indexDb";
import useOnline from "../../hook/useOnline";
export type PostType = {
  id: string;
  title: string;
  image: string;
  location: string;
}[];
function Feed() {
  const [posts, setPosts] = useState<PostType>([]);
  const online = useOnline();
  const fetchPost = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setPosts(data);
    } catch (err) {
      readAllData(POST_STORE).then((data) => {
        setPosts(data);
      });
      // alert(err);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div className={styles.feedContainer}>
      {!online && <h1>OFFLINE</h1>}
      {online && <h1>ONLINE</h1>}
      <div className={styles.feed}>
        {posts.map((postItem) => {
          return <Card {...postItem} key={postItem.id} />;
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
