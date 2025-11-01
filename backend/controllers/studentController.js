const db = require("../db");
const nodemailer = require("nodemailer");

const registerStudent = (req, res) => {
  const { fullname, email, phone, department } = req.body;

  if (!fullname || !email || !phone || !department) {
    return res.status(400).json({ message: "All fields are required" });
  }


  const sql = "INSERT INTO patients (fullname, email, phone, department) VALUES (?, ?, ?, ?)";
  db.query(sql, [fullname, email, phone, department], (err, result) => {
    if (err) {
      console.error("❌ Error inserting patient:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yourmail",     
        pass: "pass"    
      }
    });

    const mailOptions = {
      from: "yourmail@gmail.com",
      to: email,
      subject: "Hospital Registration Successful",
      text: `Hello ${fullname},\n\nYou have successfully registered for ${department} department.\n\nRegards,\nHospital Team`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("❌ Error sending email:", err);
        return res.status(500).json({ message: "Registration done, but email failed" });
      }
      console.log("📧 Email sent:", info.response);
      res.status(201).json({ message: "Patient registered & email sent successfully" });
    });
  });
};

module.exports = { registerStudent };
