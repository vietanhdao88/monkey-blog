import React, { useEffect, useState } from "react";

import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseconfig";
import PostFeatureItem from "../post/PostFeatureItem";
import Heading from "../../components/layout/Heading";

const HomeFeature = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(3)
    );
    onSnapshot(q, (snapshot) => {
      let results = [];
      snapshot.forEach((item) => {
        results.push({
          id: item.id,
          ...item.data(),
        });
      });

      setPost(results);
    });
  }, []);
  if (post.length <= 0) return;

  return (
    <div className="mt-[60px] page-container">
      <Heading>Feature</Heading>
      <div className="grid w-full grid-cols-3 gap-x-[50px]">
        {post.length > 0 &&
          post.map((item) => (
            <PostFeatureItem key={item.id} data={item}></PostFeatureItem>
          ))}
      </div>
    </div>
  );
};

export default HomeFeature;
