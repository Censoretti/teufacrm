import express from 'express';
import productRouter from './routes/product.router';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', productRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
