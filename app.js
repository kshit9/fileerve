'use strict';
var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var port = 3001;

app.use(require('morgan')('dev'));
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
  res.render(__dirname + '/index.html');
});

app.get('/2018', function (req, res) {
  res.download(__dirname + '/2018.pdf', '2018.pdf');
});

// routes will go here
app.get('/domain', function(req, res) {
  var domain = req.param('domain');
 

  res.send(domain);
});

app.get("/page/:param", function(req,res) {
    var param = req.params.param
    // let articles = await Article.findAll({tag: param}).exec();

    // res.render('tag', {
    //     articles: articles
    // });
    if(param === "CS"){
          res.send("nibble");
    }
    if(param === "EC"){
      res.send("Quanta");
    }
    if(param === "IT"){
      res.send("MMIL");
    }
    if(param === "Mechanical"){
      res.send("Yantrashilpa");
    }
    if(param === "EC"){
      res.send("Quanta");
    }
    if(param === "English"){
      res.send("Impetus")
    }
    if(param === "Dramatics"){
      res.send("Illuminati");
    }

});

app.get("/ncer/:param", function(req,res){
  var param = req.params.param

  if(param === "10th"){
    res.send("2 May 2018");
  }
    if(param === "11th"){
    res.send("9 May 2018");
  }
    if(param === "12th"){
    res.send("3 May 2018");
  }
    if(param === "8th"){
    res.send("25 April 2018");
  }
    if(param === "7th"){
    res.send("18 April 2018");
  }
})

app.get("/admission/:param", function(req,res){
  var param = req.params.param

  if(param === "BTECH"){
    res.send("100% seats in all branches are filled based on UPSEE merit. Lateral entry in second year is open for Engg. Diploma holders or B.Sc graduates with Mathematics as one of the subject at XII standard.");
  }
    if(param === "MBA"){
    res.send("All seats are filled based on merit of the candidates in UPSEE. Lateral entry in 3rd semester is open for candidates who have passed Bachelors degree course of minimum 3 years in BCA or B.Sc(IT/Computer Science) from any recognized Indian university or its equivalent.");
  }
    if(param === "MCA"){
    res.send("All seats are filled based on merit of the candidates in UPSEE. A Master of Business Administration (MBA) develops skills in business management. Before committing to earning one, understand what an MBA is and if it's the right degree for you. An MBA provides a graduate education in foundational business practices, such as accounting, finance, marketing and management. It is often a beneficial degree choice for working professionals who need to obtain additional education to reach their career goals and climb the corporate ladders of business administration.");
  }
})

app.get("/fee/:param", function (req,res){
  var param = req.params.param

  if(param === "BTECH"){
    res.send("http://jssaten.ac.in/Downloads/B.Tech_1st_Year.pdf");
  }
  if(param === "MBA"){
    res.send("http://jssaten.ac.in/Downloads/MCA%202nd%20Year%20-%20Lateral%20Entry.pdf");
  }
  if(param === "MCA"){
    res.send("http://jssaten.ac.in/Downloads/MCA%20(Lateral%20Entry)%20III%20Year%20-%20AY%202017-18.pdf");
  }
})

app.get("/presentation/:param", function(req,res) {
    var param = req.params.param
    // let articles = await Article.findAll({tag: param}).exec();

    // res.render('tag', {
    //     articles: articles
    // });
    if(param === "CS"){
          res.send("1 May 2018");
    }
    if(param === "EC"){
      res.send("2 may 2018");
    }
    if(param === "IT"){
      res.send("3 may 2018");
    }
    if(param === "Mechanical"){
      res.send("8 May 2018");
    }

    if(param === "English"){
      res.send("Impetus")
    }
    if(param === "Dramatics"){
      res.send("Illuminati");
    }

});

// POST http://localhost:8080/api/users
// parameters sent with 
app.post('/domain', function(req, res) {
    var domain = req.body.domain;


    res.send(domain);
});

app.get('/broken', function (req, res) {
  var options = {
    method: 'GET',
    host: 'localhost',
    port: port,
    path: '/2018'
  };

  var request = http.request(options, function(response) {
    var data = '';

    response.on('data', function(chunk) {
      data += chunk;
    });

    response.on('end', function() {
      console.log('requested content length: ', response.headers['content-length']);
      console.log('parsed content length: ', data.length);
      res.send(data);
    });
  });

  request.end();
});

  app.get('/download-docx', function (req, res) {
  res.download(__dirname + '/demo.docx', 'demo.docx');
})

  app.get('/demo-docx', function (req, res) {
  res.download(__dirname + '/demo.docx', 'demo.docx');
})

app.get('/download', function (req, res) {
  var options = {
    method: 'GET',
    host: 'localhost',
    port: port,
    path: '/2018'
  };



  var request = http.request(options, function(response) {
    var data = [];

    response.on('data', function(chunk) {
      data.push(chunk);
    });

    response.on('end', function() {
      data = Buffer.concat(data);
      console.log('requested content length: ', response.headers['content-length']);
      console.log('parsed content length: ', data.length);
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=working-test.pdf',
        'Content-Length': data.length
      });
      res.end(data);
    });
  });

  request.end();
});

app.listen(port);
