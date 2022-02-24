const getDiv = document.querySelector(".grid-declaration");
const clearDivs = document.querySelector(".btn-clear");
const allGrids = document.querySelectorAll(".grid");
const overLay = document.querySelector(".overlay");
const popUp = document.querySelector(".popup");
const cancelPopupBtn = document.querySelector(".cancel-icon");
const inputedGridNumber = document.querySelector(".form-input");
const inputedGridNumberBtn = document.querySelector(".submit-btn");

//default 16 divs to be displayed on page load
const defaultDiv = function (divNum = 16) {
  //for each loop, create a new div with class name
  for (let i = 0; i < divNum * divNum; i++) {
    const div = document.createElement("div");
    div.classList.add("grid");
    div.classList.add(`grid-${i}`);
    getDiv.appendChild(div);
  }
  // set grid-template-column number of the parent grid-declaration class
  getDiv.style.gridTemplateColumns = `repeat(${divNum}, 1fr)`;
};

defaultDiv();

//create divs accorind to user input, called by submit button click
const userGeneratedDivs = function (divNum) {
  if (divNum > 100 || divNum <= 0) {
    inputedGridNumber.placeholder = "100 or Less";
    return;
  }
  getDiv.textContent = "";
  defaultDiv(divNum);
  removePopup();
};

//leave color trail on hover element
getDiv.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("grid")) return;
  e.target.classList.add("color");
});

//clear divs and generate new ones
clearDivs.addEventListener("click", function () {
  inputedGridNumber.focus();
  const coloredDivs = document.querySelectorAll(".color");
  coloredDivs.forEach(function (div) {
    div.classList.remove("color");
  });
  overLay.classList.add("open-nav");
  popUp.classList.remove("hide");
  popUp.classList.add("open-nav");
});

// close popup window, called by cancel button click
const removePopup = function () {
  overLay.classList.remove("open-nav");
  popUp.classList.add("hide");
  popUp.classList.remove("open-nav");
};

cancelPopupBtn.addEventListener("click", removePopup);

//get user wanted grid number, called by submit button click
const getUserInputedGrid = function (e) {
  e.preventDefault();
  const userDesiredNumber = inputedGridNumber.value;
  inputedGridNumber.value = "";
  inputedGridNumber.focus();
  userGeneratedDivs(userDesiredNumber);
};

inputedGridNumberBtn.addEventListener("click", getUserInputedGrid);
