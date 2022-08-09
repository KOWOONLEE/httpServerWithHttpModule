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

const createPost = (req, res) => {
  const { id, title, content, userId } = req.body.data;

  posts.push({
    id: id,
    title: title,
    content: content,
    userId: userId,
  });

  // console.log("post:", posts);
  res.json({ message: "POST_CREATED" });
};

module.exports = { createPost, createUser };
