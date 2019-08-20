# MongoDB Connection

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