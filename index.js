import app from "./app.js";
import connectDB from "./src/db/index.js";

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
