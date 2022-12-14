const http = require("http");
const express = require("express");

const app = express();
app.use(express.json());

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

let posts = [
  // 아래 5번에서 posts 값 재설정 필요 따라서 let으로 변경
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

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("pong");
});

// 1. 회원가입하기
app.post("/signup", (req, res) => {
  const lastUsers = users[users.length - 1];
  if (lastUsers) {
    users.push({
      id: users[users.length - 1].id,
      name: req.body.name,
      eamil: req.body.email,
      password: req.body.password,
    });
  } else {
    users.push({
      id: 1,
      name: req.body.name,
      eamil: req.body.email,
      password: req.body.password,
    });
  }
  res.status(200).json({ message: "USER_CREATED" });
});

//2. 게시글 등록하기
app.post("/createPost", (req, res) => {
  posts.push({
    id: postId++, //1,2 이후에 하나씩 들어감.
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
  });

  res.status(201).json({ message: "POST_CREATED" });
});

app.get("/posts", (req, res) => {
  let postWithUserName = posts.map((post) => {
    //users 안에있는 아이디랑 post.userId랑 같은 애를 찾아서 넣어줌.
    const user = users.find((user) => post.userId === user.id);

    return {
      postId: post.id, // ...post 로 대체 가능
      postTitle: post.title, // 이 단계에서 postid, posttitle, postcontent 추가로 가져오게 됨,
      postContent: post.content,
      userId: post.userId,
      userName: user.name,
    };
  });
  res.json({ data: postWithUserName }); //객체화해서 데이터로 가져옴. 데이터 안에 배열이 들어감. // 여기서 포스트맨 찍으면 새로운 포스트가 들어감
});

app.patch("/post", (req, res) => {
  const { id, content } = req.body;

  const post = posts.find((post) => post.id === id);
  post.content = content;
  const user = users.find((user) => post.userId === user.id);
  const newPost = {
    postId: post.id,
    postTitle: post.title,
    postContent: post.content,
    userId: post.userId,
    userName: user.name,
  };
  res.json({ data: newPost });
});

//5. 삭제하기
app.delete("/post", (req, res) => {
  let { id } = req.query; //구조분해 할당
  // console.log(id) 하단에 1 가지고 오는지 확인

  const newId = Number(id);
  const result = posts.filter((post) => post.id !== newId); //여기서 string 으로 들어가기 때문에 위에 넘버로 바꿔줌.
  posts = result;
  res.json({ data: posts });
});

// 6. 유저와 게시글 조회하기
app.get("/total", (req, res) => {
  const userId = Number(req.query.userId);
  const userInfo = users.find((user) => user.id === userId);
  const postings = posts.filter((post) => post.userId === userId);

  let newPostings = [];

  postings.forEach((post) => {
    let temp = {
      postingId: post.id,
      postingName: post.title,
      postingContent: post.content,
    };
    newPostings.push(temp);
  });

  const newPost = {
    userId,
    userName: userInfo.name,
    postings: newPostings,
  };

  res.json({ data: newPost });
});

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("server is listening on PORT 8000");
});
