import React from "react";
import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage";
import Heading from "../../components/layout/Heading";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseconfig";
import { useState } from "react";
import PostItem from "../post/PostItem";

const CategoryPage = () => {
  const params = useParams();
  const [post, setPost] = useState([]);
  console.log(params);
  useEffect(() => {
    const fectchData = () => {
      const colRef = query(
        collection(db, "posts"),
        where("category.slug", "==", params.slug)
      );
      onSnapshot(colRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPost(results);
      });
    };
    fectchData();
  }, [params.slug]);

  if (!params.slug) return <NotFoundPage></NotFoundPage>;
  return (
    <Layout>
      <div className="container px-10">
        <div className="pt-10"></div>
        <Heading>Danh mục bài viết về {params.slug}</Heading>
        <div className="grid-layout grid-layout--primary">
          {post.length > 0 &&
            post.map((item) => <PostItem key={item.id} data={item}></PostItem>)}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
