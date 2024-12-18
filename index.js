document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

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
    localStorage.setItem("theme", "dark"); // Save user preference
  }

  // Disable Dark Mode
  function disableDarkMode() {
    body.classList.remove("dark-mode");
    themeToggle.textContent = "🌙"; // Switch icon to Moon
    localStorage.setItem("theme", "light"); // Save user preference
  }
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

