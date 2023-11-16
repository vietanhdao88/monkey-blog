import styled from "styled-components";
import Layout from "../components/layout/Layout";
import PostImg from "../modules/post/PostImg";
import PostCategory from "../modules/post/PostCategory";
import PostInfo from "../modules/post/PostInfo";
import Heading from "../components/layout/Heading";
import PostItem from "../modules/post/PostItem";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
import { useState } from "react";
import parse from "html-react-parser";
import AuthorBox from "../components/author/AuthorBox";
import PostRelated from "../modules/post/PostRelated";
const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  padding-inline: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 20px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
    @media screen and (max-width: 1023.98px) {
      padding-bottom: 40px;
      .post {
        &-header {
          flex-direction: column;
        }
        &-feature {
          height: auto;
        }
        &-heading {
          font-size: 26px;
        }
        &-content {
          margin: 40px 0;
        }
      }
      .author {
        flex-direction: column;
        &-image {
          width: 100%;
          height: auto;
        }
      }
    }
  }
`;

const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  useEffect(() => {
    async function fecthData() {
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
          doc.data() && setPostInfo(doc.data());
        });
      });
    }
    fecthData();
  }, [slug]);
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
  if (!slug) return <NotFoundPage></NotFoundPage>;
  console.log(postInfo);
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImg url={postInfo?.image} className="post-feature"></PostImg>
            <div className="post-info">
              <PostCategory className="mb-6">
                {postInfo?.category?.name}
              </PostCategory>
              <h1 className="post-heading">{postInfo?.title}</h1>
              <PostInfo
                date={new Date(postInfo?.createdAt?.seconds * 1000).toUTCString(
                  "VI-vi"
                )}
                name={postInfo?.user?.fullname}
              ></PostInfo>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">{parse(postInfo.content || "")}</div>
            <AuthorBox data={postInfo}></AuthorBox>
          </div>
          <PostRelated categoryId={postInfo.categoryId}></PostRelated>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
