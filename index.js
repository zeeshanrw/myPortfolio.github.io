document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const yorkuLogo = document.getElementById("yorku-logo");

  // Check if user has a preferred theme saved in localStorage
  if (localStorage.getItem("theme") === "dark") {
    enableDarkMode();
  }

  // Event listener for theme toggle
  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });

  // Enable Dark Mode
  function enableDarkMode() {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀️"; // Switch icon to Sun
    if (yorkuLogo) {
      yorkuLogo.src = "./assets/imgs/dar_logo2.png"; // Update logo for dark mode
    }
    localStorage.setItem("theme", "dark"); // Save user preference
  }

  // Disable Dark Mode
  function disableDarkMode() {
    body.classList.remove("dark-mode");
    themeToggle.textContent = "🌙"; // Switch icon to Moon
    if (yorkuLogo) {
      yorkuLogo.src = "./assets/imgs/yorkUlogo.png"; // Revert to light mode logo
    }
    localStorage.setItem("theme", "light"); // Save user preference
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show"); // Toggle "show" class on click
  });
});


  // Weather widget
  async function getWeather() {
    const apiKey = "1c368058d76e28a15aac03c199cf065f";
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Unable to fetch weather data");
        }
        const weatherData = await response.json();
        const temp = Math.round(weatherData.main.temp);
        document.getElementById("weather-temp").textContent = `${temp}°C`;
      });
    } catch (error) {
      console.error(error);
      document.getElementById("weather-temp").textContent = "N/A";
    }
  }

  getWeather(); // Call the weather function

  document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    try {
      const response = await fetch("http://localhost:3000/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
  
      const data = await response.json();
      alert(data.message); // Display success or error message
      e.target.reset(); // Reset the form
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again.");
    }
  });
  document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    try {
      const response = await fetch("http://localhost:3000/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
  
      const data = await response.json();
      if (response.ok) {
        showNotification(); // Show the notification
        e.target.reset(); // Reset the form
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again.");
    }
  });
  
  // Function to Show Notification
  function showNotification() {
    const notification = document.getElementById("notification");
    notification.style.display = "block";
  
    // Hide after 3 seconds
    setTimeout(() => {
      notification.style.display = "none";
    }, 4000);
  }
  