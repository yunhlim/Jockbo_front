const express = require("express");
const app = express();
var cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
app.use(express.urlencoded({ extended: true })); //slu : nodejs 에서 html body를 제대로 읽어오려면 이 옵션을 넣어줘야함
app.use(express.json());
app.use(cors());
var db;

MongoClient.connect(
  "mongodb+srv://jokbo:1111@cluster0.kawqw2r.mongodb.net/?retryWrites=true&w=majority",
  function (e, client) {
    if (e) return console.log(e);
    app.listen(8080, function () {
      console.log("listening on 8080");
      db = client.db("jokbonode");
    });
  }
);
///for dummy sending--------


const dummydata = [
  {
    _id: 1,
    mySae: 1,
    myName: '이병철',
    children: [
      {
        _id: 2,
        mySae: 2,
        myName: '이맹희',
        children: [
          {
            _id: 8,
            mySae: 3,
            myName: '이미경',
          },
          {
            _id: 9,
            mySae: 3,
            myName: '이재현',
          },
        ],
      },
      {
        _id: 3,
        mySae: 2,
        myName: '이창희',
      },
      {
        _id: 4,
        mySae: 2,
        myName: '이건희',
        children: [
          {
            _id: 10,
            mySae: 3,
            myName: '이재용',
          },
          {
            _id: 11,
            mySae: 3,
            myName: '이부진',
          },
          {
            _id: 12,
            mySae: 3,
            myName: '이서현',
          },
        ],
      },
      {
        _id: 5,
        mySae: 2,
        myName: '이인희',
        children: [
          {
            _id: 13,
            mySae: 3,
            myName: '조동혁',
          },
          {
            _id: 14,
            mySae: 3,
            myName: '조동만',
          },
          {
            _id: 15,
            mySae: 3,
            myName: '조동길',
          },
        ],
      },
      {
        _id: 6,
        mySae: 2,
        myName: '이숙희',
      },
      {
        _id: 7,
        mySae: 2,
        myName: '이명희',
        children: [
          {
            _id: 16,
            mySae: 3,
            myName: '정용진',
          },
          {
            _id: 17,
            mySae: 3,
            myName: '정유경',
          },
        ],
      },
    ],
  },
];


///--------------------------

app.set("view engine", "ejs");

app.get("", function (r, a) {
  a.send("server on duty");
});
app.get("/admin", function (r, a) {
  a.sendFile(__dirname + "/admin.html");
});
app.post("/create", function (r, a) {
  a.send("create 실행됨");
  console.log("UID " + r.body._id + " 에 대한 정보 생성 시작");
  db.collection("post").insertOne(
    {
      _id: r.body._id,
      ancUID: r.body.ancUID,
      mySae: r.body.mySae,
      myName: r.body.myName,
      myNamechi: r.body.myNamechi,
      ect: r.body.ect,
      moddate: r.body.moddate,
    },
    function (e, r) {
      console.log("에러사항 : " + e);
      console.log("결과 : ");
      console.log(r);
      console.log("저장완료");
    }
  );
});
app.get("/list", function (r, a) {
  db.collection("post")
    .find()
    .toArray(function (e, r) {
      console.log(r);
      a.send(r);
    });
});
app.get("/all", function (r, a) {
  db.collection("post")
    .find()
    .toArray(function (e, r) {
      console.log(dummydata);
      a.send(dummydata);
    });
});