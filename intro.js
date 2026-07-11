// Перенаправление на main.html при нажатии на кнопку начала операции
const startButton = document.getElementById("startMission");

if (startButton) {
  startButton.addEventListener("click", (e) => {
    // Поведение ссылки по умолчанию сработает корректно, 
    // но если потребуется кастомный переход, перестрахуемся:
    // window.location.href = "main.html";
  });
}
