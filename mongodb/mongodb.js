exports.id = 'mongodb';
exports.title = 'Mongo DB';
exports.group = 'Databases';
exports.color = '#3f3e42';
exports.input = true;
exports.author = 'André Abreu';
exports.version = '1.0.0';
exports.output = 1;
exports.icon = 'database';

exports.html = `<div class="padding">
	<div class="row">
		<div class="col-md-6 m">
			<div data-jc="textbox" data-jc-path="server" class="m" data-jc-config="required:true;maxlength:30;placeholder:@(Localhost)">Server</div>
		</div>
		<div class="col-md-2 m">
			<div data-jc="textbox" data-jc-path="port" class="m" data-jc-config="required:true;maxlength:30;placeholder:@(27017);value:27017">Port</div>
		</div>
		<div class="col-md-4 m">
			<div data-jc="textbox" data-jc-path="database" class="m" data-jc-config="required:true;maxlength:30;placeholder:@(Database)">Database</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4 m">
		<div data-jc="dropdown" data-jc-path="auth" data-jc-config="required:true;items:None,Username/Password;value:None" class="m" >@(Authentication)</div>
		</div>
		<div  data-jc="visible" data-jc-path="auth" data-jc-config="if:value === 'Username/Password'">
			<div class="col-md-4 m">
				<div data-jc="textbox" data-jc-path="username" class="m" data-jc-config="required:true;maxlength:30;placeholder:@(Username)">Username</div>
			</div>
			<div class="col-md-4 m">
				<div data-jc="textbox" data-jc-path="password" class="m" data-jc-config="required:true;maxlength:30;type:password">Password</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4 m">
			<div data-jc="textbox" data-jc-path="collection" class="m" data-jc-config="required:true;maxlength:30;placeholder:@(Collection Name)">Collection</div>
		</div>
		<div class="col-md-4">
			<div data-jc="dropdown" data-jc-path="method" data-jc-config="required:true;items:insert,update,query,remove" class="m">@(Method)</div>
		</div>
	</div>
	
</div>`;

exports.readme = `# MongoDB Connection

The component has to be configured. Connect to MongoDB
Required install: npm install mongodb --save


## Insert
- will insert received data
- expects data to be an Object or an Array of Objects

Returned Object: 

\`\`\`javascript

{
	"result": {
	  "n": 1,
	  "ok": 1
	},
	"connection": {
	  "id": 0,
	  "host": "localhost",
	  "port": 27017
	},
	"ops": [
	  {
		"a": 124,
		"_id": "5d5b003f507ad81d6c48a8de"
	  }
	],
	"insertedCount": 1,
	"insertedId": "5d5b003f507ad81d6c48a8de",
	"n": 1,
	"ok": 1
  }

\`\`\`


## Update

- TODO 

## Remove

- TODO

## Query

- will query DB
- expects data to be an object
- return a array of objects

\`\`\`javascript
{
	"name": "Joseph",
	"city": "São Paulo",
	"age": 23
  }
\`\`\`


`;


var MongoClient = require('mongodb').MongoClient
exports.install = function (instance) {

	var can = false;

	const url = `mongodb://${instance.options.server}:${instance.options.port}/${instance.options.port}`;

	instance.on('data', function (flowdata) {
		can && instance.custom.connect(flowdata);
	});

	instance.custom.connect = async function (flowdata) {
		const client = new MongoClient(url);

		try {
			await client.connect({ useNewUrlParser: true });
			console.log("Connected correctly to server");
			const db = client.db(instance.options.database);
			const col = db.collection(instance.options.collection);

			if (instance.options.method === 'insert') {

				if (Array.isArray(flowdata.data)) {
					const r = await col.insertMany(flowdata.data);
					flowdata.data = r;
				} else {
					const r = await col.insertOne(flowdata.data);
					flowdata.data = r;
				}
				instance.send2(0, flowdata);
			}

			if (instance.options.method === 'query') {
				const docs = await col.find(flowdata.data).toArray();
				flowdata.data = docs;
				instance.send2(0, flowdata);
			}

		} catch (err) {
			console.log(err.stack);
		}

		// Close connection
		client.close();
	};

	instance.reconfigure = function () {
		can = instance.options.server 
		&& instance.options.port 
		&& instance.options.database 
		&& instance.options.auth ? true : false;


		instance.status(can ? '' : 'Not configured', can ? undefined : 'red');




	};

	instance.on('options', instance.reconfigure);
	instance.reconfigure();
};