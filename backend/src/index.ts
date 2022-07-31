import express, { Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import UserRouter from './routes/users.route';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', UserRouter);

app.use('*', (req: Request | any, res: Response) => {
  res.status(404).send({ message: 'Path not found' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
