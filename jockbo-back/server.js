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

app.get("/search", async function (r, a) {//2023-01-05 slu Park & lim 비동기 및 동기로 검색결과 찾아줌
  if (r.fatherName || r.grandpaName) {
    a.send("조부 및 부 검색 기능 점검중");
    return;
  }
  db.collection("post")
    .find(r.query)
    .toArray(async (e, dbanswer) => {
      var updarray = [];

      for (i in dbanswer) {
        var ufo;
        var ugo;

        const r = await db
          .collection("post")
          .find({ _id: dbanswer[i].ancUID })
          .toArray();
        ufo = r[0];

        if(ufo==null){
          var uf = {
            _id: "-",
            myName: "-",
            myNamechi: "-",
          };
        }
        else{
        const r2 = await db
          .collection("post")
          .find({ _id: ufo.ancUID })
          .toArray();
        ugo = r2[0];
        
        
        var uf = {
          _id: ufo._id,
          myName: ufo.myName,
          myNamechi: ufo.myNamechi,
        };}

        if(ugo==null){
          var ug = {
            _id:"-",
            myName: "-",
            myNamechi: "-",
          };
  
        }
        else{
          var ug = {
            _id: ugo._id,
            myName: ugo.myName,
            myNamechi: ugo.myNamechi,
          };
        }
        var u = {
          _id: dbanswer[i]._id,
          mySae: dbanswer[i].mySae,
          myName: dbanswer[i].myName,
          myNamechi: dbanswer[i].myNamechi,
          father: uf,
          grandPa: ug,
        };
        updarray.push(u);
      }
      a.send(updarray);
    });
});
//id 로 자명 찾아주는 api (보류)

//id 로 객체 모든정보 띄워주는 api - id만주면됨
app.get("/detail/:_id", function (r, a) {
  let{_id} = r.params;
  db.collection("post")
    .find({_id : _id})
    .toArray(function (e, r) {
      console.log(r);
      a.send(r);
    });
});


//id 받아서 위아래로 2세씩 해서 프랙탈 띄워주는 api
app.get("/5sae/:_id", async function (r, a) {
  let{_id} = r.params;
  var z = await db.collection("post")
    .find({_id : _id})
    .toArray();

    console.log("id조회 끝~~~~~@@@@@ await done")

    var minSae = z[0].mySae -2;
    if(minSae<1)minSae=0;

    db.collection("post")
    .find()
    .toArray(function (e, r) {
      var oriArray = r;
      var upgArray = [];
    
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
          //최대세와 최소세 구하기 (+- 2세까지 없을 경우 안전장치)
      }

      var len = upgArray.length;
      //--------
      for (var tmp = minSae+5; tmp >= minSae; tmp--) {
        console.log(tmp + " 세에 대한 작업=============");
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