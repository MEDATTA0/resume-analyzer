import app from "./app";
import { connectDB } from "./db/prisma";

const PORT = process.env.PORT;

try {
  connectDB();
} catch (err) {
  throw err;
}

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
