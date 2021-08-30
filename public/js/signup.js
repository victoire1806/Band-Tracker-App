const signupFormHandler = async (event) => {
  event.preventDefault();

  // const username = document.querySelector("#username-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const state = document.querySelector("#state-signup").value.trim();

  if (username && password && state) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password, state }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to sign up.");
    }
  }
};

// $(function () {
//   $("#state-signup").selectmenu();
// });

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
