const getDiv = document.querySelector(".grid-declaration");
const clearDivs = document.querySelector(".btn-clear");
const allGrids = document.querySelectorAll(".grid");
const overLay = document.querySelector(".overlay");
const popUp = document.querySelector(".popup");
const cancelPopupBtn = document.querySelector(".cancel-icon");
const inputedGridNumber = document.querySelector(".form-input");
const inputedGridNumberBtn = document.querySelector(".submit-btn");
const generateNewColor = document.querySelector(".btn-generate-color");
let color = "black"; //initial hover color is black

/********************** QUICK FUNCTIONS ***************************/
const clearCurrentColor = function () {
  const coloredDivs = document.querySelectorAll(".grid");
  coloredDivs.forEach(function (div) {
    div.style.backgroundColor = "white";
  });
};

// close popup window, called by cancel button click
const removePopup = function () {
  overLay.classList.remove("open-nav");
  popUp.classList.add("hide");
  popUp.classList.remove("open-nav");
};

// show popup window, called by cancel button click
const showPopup = function () {
  overLay.classList.add("open-nav");
  popUp.classList.remove("hide");
  popUp.classList.add("open-nav");
};

const clearAndGenerateNewDivs = function () {
  clearCurrentColor();
  showPopup();
};

const clearColorAndStartNewColor = function () {
  clearCurrentColor();
};
/*****************************************************************/

/********************** WALKTHORUGHS / LOGIC ***************************/

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
  clearCurrentColor();
};

const generateRGB = function () {
  const generatedNumbers = [];
  for (i = 0; i < 3; i++) {
    const randomNumber = Math.floor(Math.random() * 256);
    generatedNumbers.push(randomNumber);
  }
  return `rgb(${generatedNumbers.join(",")})`;
};

const generateColor = function (e) {
  if (!e.target.classList.contains("grid")) return;
  e.target.style.backgroundColor = color;
};

//leave color trail on hover element
const hoverColor = function () {
  getDiv.addEventListener("mouseover", generateColor); //using bubbling
};

hoverColor(); //call on page load

//get user wanted grid number, called by submit button click
const getUserInputedGrid = function (e) {
  e.preventDefault();
  const userDesiredNumber = inputedGridNumber.value;
  inputedGridNumber.value = "";
  color = "black";
  userGeneratedDivs(userDesiredNumber);
};
/*****************************************************************/

/********************** EVENT LISTENERS ***************************/
inputedGridNumberBtn.addEventListener("click", getUserInputedGrid);
cancelPopupBtn.addEventListener("click", removePopup);
//clear divs and generate new ones
clearDivs.addEventListener("click", clearAndGenerateNewDivs);
generateNewColor.addEventListener("click", function (e) {
  color = generateRGB();
  hoverColor();
});
/*****************************************************************/
