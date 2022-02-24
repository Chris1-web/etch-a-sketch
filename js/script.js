const getDiv = document.querySelector(".grid-container");
const clearDivs = document.querySelector(".btn-clear");
const allGrids = document.querySelectorAll(".grid");
const overLay = document.querySelector(".overlay");
const popUp = document.querySelector(".popup");
const cancelPopupBtn = document.querySelector(".cancel-icon");
const inputedGridNumber = document.querySelector(".form-input");
const inputedGridNumberBtn = document.querySelector(".submit-btn");
const gridContainer = document.querySelector(".container.grid-container");

const defaultDiv = function () {
  for (let i = 0; i < 16 * 16; i++) {
    const div = document.createElement("div");
    div.classList.add("grid");
    div.classList.add(`grid-${i}`);
    getDiv.appendChild(div);
  }
};

defaultDiv();

const userGeneratedDivs = function (divNum) {
  if (divNum > 100 || divNum <= 0) return;
  //   const newDiv = document.createElement("div");
  getDiv.textContent = "";
  //   getDiv.style.gridTemplateColumns = `2`;
  gridContainer.classList.remove("grid-container");
  gridContainer.style.gridTemplateColumns = `repeat(${divNum}, 1fr)`;

  for (let i = 0; i < divNum * divNum; i++) {
    const div = document.createElement("div");
    div.classList.add("grid");
    getDiv.appendChild(div);
  }
};

getDiv.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("grid")) return;
  e.target.classList.add("color");
});

clearDivs.addEventListener("click", function () {
  const coloredDivs = document.querySelectorAll(".color");
  coloredDivs.forEach(function (div) {
    div.classList.remove("color");
  });
  overLay.classList.add("open-nav");
  popUp.classList.remove("hide");
  popUp.classList.add("open-nav");
});

cancelPopupBtn.addEventListener("click", function () {
  overLay.classList.remove("open-nav");
  popUp.classList.add("hide");
  popUp.classList.remove("open-nav");
});

const getUserInputedGrid = function (e) {
  e.preventDefault();
  const userDesiredNumber = inputedGridNumber.value;
  inputedGridNumber.value = "";
  inputedGridNumber.focus();
  userGeneratedDivs(userDesiredNumber);
};

inputedGridNumberBtn.addEventListener("click", getUserInputedGrid);
console.log(gridContainer);
