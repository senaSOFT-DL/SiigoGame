import app from './app';
import http from 'http';
import dotenv from 'dotenv';
//Read .env
dotenv.config({path:'./env'});
//Importamos sockets
import { sio } from './sockets/io';

//Create server
const server:http.Server=http.createServer(app);

const main = async () => {
	//Get Port
	const PORT = process.env.PORT || 3000;
	//Craete cors sockets
	sio.attach(server, {
		cors:{
			origin:'http://localhost:3000',
			methods:['GET','POST','PUT','PACTH'],
			credentials:true
		}
	});
	//server listening
	server.listen(PORT, ()=> {
		console.log(`
		## Server on port ${PORT} ##
		`);
		
	})

};

//BeforeAll
Promise.all(
	[
		console.log('Initializing...'),
		//Start DBS
	]
).then(()=>{
	// start server
	main();
}).catch((err)=>{
	//get errors
	console.error(`ERROR:: Initializing ${err}`);
});

