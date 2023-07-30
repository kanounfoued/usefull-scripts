import React, { useState } from "react";
import { Space, Table, Button } from "antd";
import {
  useAddPost,
  useGetPosts,
  useUpdatePost,
  useDeletePost,
} from "./hooks/post";
import { useQueryClient } from "react-query";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";

export default function ReactQueryExample() {
  const [state, setState] = useState({
    current: 1,
    pageSize: 10,
    total: 200,
  });

  const queryClient = useQueryClient();

  const { data, isLoading } = useGetPosts(state.current, state.pageSize);

  const { mutate } = useAddPost();
  const { mutate: updateArticle } = useUpdatePost();
  const { mutate: deleteArticle } = useDeletePost();

  function addNewPost() {
    mutate({
      userId: 1,
      title: "This is a title",
      body: "This is a body",
    });
  }

  function onUpdateArticle(article) {
    updateArticle({
      ...article,
      title: "This is my title",
    });
  }

  function onDeleteArticle(article) {
    deleteArticle(article);
  }

  const onChange = (pagination) => {
    setState(pagination);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "user ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => onUpdateArticle(record)}>Edit</Button>
          <Button onClick={() => onDeleteArticle(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  if (isLoading) return <div>Is Loading</div>;

  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <button onClick={addNewPost}>add article</button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        onChange={onChange}
        pagination={{
          ...state,
        }}
      />
    </div>
  );
}
