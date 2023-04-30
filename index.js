const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let timer;
  return (seconds) => {
    console.log(seconds);
    timer = setInterval(() => {
      sec = seconds % 60;
      min = (seconds / 60) % 60;
      hour = (seconds / 60 / 60) % 60;
      if (seconds <= 0) {
        clearInterval(timer);
        alert("Время истекло!");
        buttonEl.style.display = "block";
      } else {
        buttonEl.style.display = "none"; // банальная защита против попытки завести еще один таймер во время исполнения текущего
        let strTimer = `${Math.trunc(hour)}:${Math.trunc(min)}:${sec}`;
        timerEl.innerHTML = strTimer;
      }
      --seconds;
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  const res = inputEl.value.replace(/[^\d]/g, "");
  inputEl.value = res;
  // Очистите input так, чтобы в значении
  // оставались только числа
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
