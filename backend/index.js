const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.post("/bfhl", (req, res) => {
  const { data } = req.body;
  console.log(data);

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      user_id: null,
      email: null,
      roll_number: null,
      numbers: [],
      alphabets: [],
      highest_alphabet: [],
    });
  }

  const fullName = "john_doe";
  const dob = "17091999";
  const email = "john@xyz.com";
  const rollNumber = "ABCD123";
  const userId = `${fullName}_${dob}`;

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
  const highestAlphabet = alphabets.length
    ? [alphabets.sort((a, b) => b.localeCompare(a))[0]]
    : [];

  res.json({
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: highestAlphabet,
  });
});

app.get("/bfhl", (req, res) => {
  res.json({
    operation_code: 1,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
