import { Skeleton } from "antd";
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../utils/constants";
import { SinglePostType } from "../Feed/Feed";

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
  return (
    <div>
      {loading && <Skeleton active />}
      {!loading && post && (
        <div>
          <img src={post.image} width={320} />
          <h1>{post.title}</h1>
          <h2>Location: {post.location}</h2>
        </div>
      )}
    </div>
  );
}

export default Post;
