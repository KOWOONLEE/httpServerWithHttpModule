const { application } = require("express");

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];

let postId = 3;

const reviews = [
  {
    userId: 1,
    userName: "Rebekah Johnson",
    postingId: 1,
    postingTitle: "간단한 HTTP API 개발 시작!",
    postingContent:
      "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
  },
  {
    userId: 2,
    userName: "Fabian Predovic",
    postingId: 2,
    postingTitle: "HTTP의 특성",
    postingContent: "Request/Response와 Stateless!!",
  },
];

//1. 회원가입하기
const createUser = (req, res) => {
  const user = req.body.data;

  users.push({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  });

  // console.log("user:", users);
  res.json({ message: "USER_CREATED" });
};

//2. 게시글 등록하기
const createPost = (req, res) => {
  posts.push({
    id: postId++, //1,2 이후에 하나씩 들어감.
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
  });

  // console.log("post:", posts);
  res.json({ message: "POST_CREATED" });
};

//3. 게시글 목록 조회하기
const checkPost = (req, res) => {
  const postsWithUserName = posts.map((post) => {
    post.userId;
    const user = user.find((user) => post.userId === user.id);

    return {
      postId: post.id,
      postTitle: post.title,
      postContent: post.content,
      userId: post.userId,
      userName: user.name,
    };
  });

  ({ data: postsWithUserName });
};

const modifiedPost = (req, res) => {
  const { id, content } = req.body;
  const post = posts.find((post) => post.id === id);
  posts.content = content;

  const user = user.find((user) => post.userId === user.id);
  const newPost = {
    postId: post.id,
    postTitle: post.title,
    postContent: post.content,
    userId: post.userId,
    userName: user.name,
  };

  ({ data: newPost });
};

module.exports = { createPost, createUser, checkPost, modifiedPost };
