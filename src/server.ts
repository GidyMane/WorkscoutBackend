// Import the 'express' module along with 'Request' and 'Response' types from express
import express, { Request, Response } from 'express';
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import compression from "compression"
import routes from './routes/profile.routes';


// Create an Express application
const app = express();

// Specify the port number for the server
const port: number = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use("/api/v1", routes)


// Define a route for the root path ('/')
app.get('/', (req: Request, res: Response) => {
  // Send a response to the client
  res.send('Hello, TypeScript + Node.js + Express!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});
