const http = require('http');
const port = 3001;
const fs = require('fs');
const querystring = require('querystring');

const today = +(new Date());
const dayInMillis= 24*60*60*1000

const destinations = ['Melbourne', 'Goldcoast', 'Perth', 'Tasmania', 'Vietnam', 'Hongkong', 'Istanbul'];
const imageName = ['melb', 'goldcoast', 'perth','tas', 'hochi', 'hongkong', 'istanbul'];
const results = destinations.map((destination, idx)=> {
	return {
		imgUrl: constructImgUrl(imageName[idx]), 
		title: destination, 
		price: 200 + Math.random() * 100 + (idx * 100),
		date: (Math.random() * 5) *  dayInMillis + today
	}
});


function constructImgUrl(name){
 
   return "http://localhost:3001/images/" + name + ".jpg"
}

const server = http.createServer((req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}

	if (/\/images/.test(req.url)) {
		res.writeHead(200);
		res.end(fs.readFileSync(__dirname + req.url));
		return;
	}

	if (req.url === '/results') {
		res.setHeader('Content-Type', 'application/json');
	  	res.end(JSON.stringify(results));
	  	return;
	}

	res.status(404).send('Not found');
});


server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});

function getResults() {
	const data = querystring.stringify({
        "request": {
            "passengers": {
                "adultCount": 1
            },
            "slice": [
                {
                    "origin": "SYD",
                    "destination": "MEL",
                    "date": "2017-11-01"
                }
            ]
        }
	});
	const postOptions = {
		host: 'https://www.googleapis.com',
		port: 80,
		path: '/qpxExpress/v1/trips/search?key=AIzaSyAFoYB5w3LU2YehLwt-g1eH4m8dIeg0E7Q',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
	        'Content-Length': Buffer.byteLength(data),
		}
	};

  var req = http.request(postOptions, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });
  req.write(data);
  req.end();
}