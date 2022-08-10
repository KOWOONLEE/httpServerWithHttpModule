const http = require("http");
const express = require("express");
const { createPost, createUser, checkPost, modifiedPost } = require("./app");

const app = express();
app.use(express.json());

app.post("/signup", createUser); //유저 회원가입하기
app.post("/post", createPost); // 유저 게시글 등록하기
app.get("/check", checkPost); //유저 게시글 목록 조회하기
app.patch("/check", modifiedPost);

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("server is listening on PORT 8000");
});
