import express from 'express';
import todoRoutes from './routes/todoRoutes';

const app = express();

app.use("/todos", todoRoutes);

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
})
