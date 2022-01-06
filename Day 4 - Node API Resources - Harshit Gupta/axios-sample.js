const axios = require('axios');

// Requesting using axios (GET request)
axios.get('https://jsonplaceholder.typicode.com/todos/1')
	.then(response => {
		console.log('Response Code:', response.status, response.statusText);
		process.stdout.write(JSON.stringify(response.data));
	})
	.catch(error => console.error(error));
