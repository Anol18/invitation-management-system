const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");
// const fs = require("fs");

// const { param } = require("express-validator");

const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
// require("dotenv").config();
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// const port = process.env.PORT; //5000 port

app.listen(parseInt(5000), () => {
  console.log("Server is running...");
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "university_convocation",
});

app.post("/api/submit", async (req, res) => {
  // [
  //   studentId,
  //   studentName,
  //   studentGender,
  //   studentDeparment,
  //   sessionStart,
  //   sessionEnd,
  //   graduate,
  //   guardian1Name,
  //   relation1,
  //   guardian1Nid,
  //   guardian1Phone,
  //   guardian1Email,
  //   report1Date,

  //   guardian2Name,
  //   relation2,
  //   guardian2Nid,
  //   guardian2Phone,
  //   guardian2Email,
  //   report2Date,
  // ] = req.body;
  const studentId = req.body.studentId;
  const studentName = req.body.studentName;
  const studentGender = req.body.studentGender;
  const studentDeparment = req.body.studentDeparment;
  const sessionStart = req.body.sessionStart;
  const sessionEnd = req.body.sessionEnd;
  const graduate = req.body.graduate;
  const guardian1Name = req.body.guardian1Name;
  const relation1 = req.body.relation1;
  const guardian1Nid = req.body.guardian1Nid;
  const guardian1Phone = req.body.guardian1Phone;
  const guardian1Email = req.body.guardian1Email;
  const report1Date = req.body.report1Date;

  const guardian2Name = req.body.guardian2Name;
  const relation2 = req.body.relation2;
  const guardian2Nid = req.body.guardian2Nid;
  const guardian2Phone = req.body.guardian2Phone;
  const guardian2Email = req.body.guardian2Email;
  const report2Date = req.body.report2Date;

  const sqlInsert1 =
    "INSERT INTO `students`(`student_id`,`name`, `gender`, `department`, `session_start`, `session_end`, `graduate`) VALUES (?,?,?,?,?,?,?);";
  const sqlInsert2 =
    "INSERT INTO `guardians`(`guardian_name1`, `relations1`, `nid1`, `phone1`, `email1`, `reporting_date1`, `guardian_name2`, `relations2`, `nid2`, `phone2`, `email2`, `reporting_date2`, `student_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);";
  db.query(
    sqlInsert1,
    [
      studentId,
      studentName,
      studentGender,
      studentDeparment,
      sessionStart,
      sessionEnd,
      graduate,
    ],
    (err, result) => {
      if (err) throw err;
    }
  );
  db.query(
    sqlInsert2,
    [
      guardian1Name,
      relation1,
      guardian1Nid,
      guardian1Phone,
      guardian1Email,
      report1Date,
      guardian2Name,
      relation2,
      guardian2Nid,
      guardian2Phone,
      guardian2Email,
      report2Date,
      studentId,
    ],
    (err, result) => {
      if (err) throw err;
    }
  );
});

app.get("/api/getdata", (req, res) => {
  const sqlSelect =
    "SELECT `name`, `gender`, `department`, `session_start`, `session_end`,`guardians_id`, `guardian_name1`, `relations1`, `nid1`, `phone1`, `email1`, `reporting_date1`, `guardian_name2`, `relations2`, `nid2`, `phone2`, `email2`, `reporting_date2` from university_convocation.students, university_convocation.guardians where students.student_id = guardians.student_id;";
  db.query(sqlSelect, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});
