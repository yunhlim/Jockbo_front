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
app.get("/all", function (req, ans) {
  db.collection("post")
    .find()
    .toArray(function (e, r) {
      var oriArray = r;
      var upgArray = [];
      var maxSae = 0;
      var minSae = 9999;
      for (var a in oriArray) {
        var b = {
          _id: oriArray[a]._id,
          ancUID: oriArray[a].ancUID,
          mySae: oriArray[a].mySae,
          myName: oriArray[a].myName,
          myNamechi: oriArray[a].myNamechi,
          children: [],
        };
        upgArray.push(b); //업글배열 만들기
        if (maxSae < oriArray[a].mySae) {
          //최대세와 최소세 구하기
          maxSae = oriArray[a].mySae;
        }
        if (minSae > oriArray[a].mySae) {
          minSae = oriArray[a].mySae;
        }
      }

      var len = upgArray.length;
      //--------
      for (var tmp = maxSae; tmp >= minSae; tmp--) {
        //기능 : upgArray의 해당 세의 얘들을 찾아서 자기네들 조상의 child 배열에 push 한 후 , 해당 애들을 제거한다.
        console.log(tmp + " 세에 대한 작업============="); //마지막세부터 직속 조상에 넣어줌 2023-01-01 slu Park
        for (i = 0; i < len; i++) {
          if (upgArray[i].mySae == tmp) {
            console.log(
              upgArray[i].myName +
                " 님이 " +
                tmp +
                " 세로 판명되어 작업 들어갑니다."
            );
            for (j in upgArray) {
              if (upgArray[j]._id == upgArray[i].ancUID) {
                upgArray[j].children.push(upgArray[i]);
                upgArray.splice(i, 1);
                len -= 1;
                i -= 1;
                break;
              }
            }
          }
        }
      }
      //--------c
      ans.send(upgArray);
    });
});

app.get("/search", async function (r, a) {
  if (r.fatherName || r.grandpaName) {
    a.send("조부 및 부 검색 기능 점검중");
    return;
  }
  db.collection("post")
    .find(r.query)
    .toArray(async (e, items) => {
      console.log("db응답@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log(items);

      var updarray = [];

      for (let item of items) {
        var ufo;
        var ugo;
        const r = await db
          .collection("post")
          .find({ _id: item.ancUID })
          .toArray();
        ufo = r[0];

        const r2 = await db
          .collection("post")
          .find({ _id: ufo.ancUID })
          .toArray();

        ugo = r2[0];
        var uf = {
          _id: ufo._id,
          myName: ufo.myName,
          myNamechi: ufo.myNamechi,
        };

        var ug = {
          _id: ugo._id,
          myName: ugo.myName,
          myNamechi: ugo.myNamechi,
        };

        var u = {
          _id: item._id,
          mySae: item.mySae,
          myName: item.myName,
          myNamechi: item.myNamechi,
          father: uf,
          grandPa: ug,
        };
        updarray.push(u);
      }
      console.log("#");
      console.log(updarray);

      // 전송
      a.send(updarray);
    });
});

[
  {
    _id: "~",
    mySae: "~",
    myName: "~",
    myNamechi: "~",
    father: { _id: "~", myName: "~", myNamechi: "~" },
    grandPa: { _id: "~", myName: "~", myNamechi: "~" },
  },
];
