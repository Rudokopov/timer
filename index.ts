const inputEl: HTMLInputElement | null = document.querySelector("input");
const buttonEl: HTMLButtonElement | null = document.querySelector("button");
const timerEl: HTMLSpanElement | null = document.querySelector("span");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let timer: number;
  return (seconds: number) => {
    console.log(seconds);
    timer = setInterval(() => {
      const sec: number = seconds % 60;
      const min: number = (seconds / 60) % 60;
      const hour: number = (seconds / 60 / 60) % 60;
      if (seconds <= 0) {
        clearInterval(timer);
        alert("Время истекло!");
        if (buttonEl) {
          buttonEl.style.display = "block";
        }
      } else {
        if (buttonEl) {
          buttonEl.style.display = "none"; // банальная защита против попытки завести еще один таймер во время исполнения текущего
        }
        let strTimer: string = `${Math.trunc(hour)}:${Math.trunc(min)}:${sec}`;
        if (timerEl) {
          timerEl.innerHTML = strTimer;
        }
      }
      --seconds;
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl?.addEventListener("input", () => {
  const res: string = inputEl.value.replace(/[^\d]/g, "");
  inputEl.value = res;
  // Очистите input так, чтобы в значении
  // оставались только числа
});

buttonEl?.addEventListener("click", () => {
  const seconds = Number(inputEl?.value);

  animateTimer(seconds);

  if (inputEl) {
    inputEl.value = "";
  }
});
