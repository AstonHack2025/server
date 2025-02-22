const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001; // Make sure it's not conflicting with your Next.js port

app.use(cors());
app.use(express.json()); // Allow JSON requests

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello there human!" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
