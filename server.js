const favicon = require('serve-favicon');
const path = require('path');
const express = require('express');
const app = express();

app.use('/css', express.static(process.cwd() + '/css'));
app.use('/js', express.static(process.cwd() + '/js'));
app.use(favicon(path.join(__dirname,'favicon','favicon.ico')));

app.get('/', function(req, res){
			res.sendFile(process.cwd() + '/main.html');
		});

const port = process.env.PORT;
app.listen(port, function() {
	console.log('Node.js listening on port ' + port + '...');
});