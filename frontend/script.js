document.getElementById("examForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  let fullname = document.getElementById("fullname").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let exam = document.getElementById("exam").value; 

  if (fullname === "" || email === "" || phone === "" || exam === "") {
    alert("⚠ Please fill all fields correctly.");
    return;
  }

  try {

    const response = await fetch("http://localhost:5000/api/students/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: fullname,
        email: email,
        phone: phone,
        department: exam
      })
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById("successMessage").style.display = "block";
      document.getElementById("examForm").reset();
    } else {
      alert("❌ " + data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("⚠ Could not connect to backend server.");
  }
});
