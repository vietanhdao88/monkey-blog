import { useEffect } from "react";
import Heading from "../../components/layout/Heading";
import PostItem from "./PostItem";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseconfig";
import { useState } from "react";

const PostRelated = ({ categoryId = "" }) => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("categoryId", "==", categoryId)
    );
    onSnapshot(docRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPost(results);
    });
  }, [categoryId]);
  console.log(post);
  return (
    <div className="post-related">
      <Heading>Bài viết liên quan</Heading>
      <div className="grid-layout grid-layout--primary">
        {post.length > 0 &&
          post.map((data) => <PostItem key={data.id} data={data}></PostItem>)}
      </div>
    </div>
  );
};

export default PostRelated;
