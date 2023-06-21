const form = document.querySelector("form");
const fieldSets = form.querySelectorAll("fieldset");
const itemDotsContainer = document.querySelector(".item-dots");

// IIFE function to create appropiate amount of dots for filedsets
const createItemDots = (() => {
  fieldSets.forEach(() => {
    itemDotsContainer.insertAdjacentHTML("beforeend", `<li></li>`);
  });

  itemDotsContainer.firstElementChild.classList.add("active");
})();

// this variable is for the click  control of itemDots. At the first user can't go any further, but after each field that has completed user can go to the previous and current field by clicking the specific dot.(not the next dots)
let doneNumber = 0;

const next = (target) => {
  const input = target.previousElementSibling;

  if (input.value === "") {
    document.body.classList.add("error");
    return;
  } else {
    document.body.classList.remove("error");
    doneNumber++;
  }
  const targetFieldSet = document.querySelector("form fieldset.enable");
  const nextFieldSet = targetFieldSet.nextElementSibling;
  targetFieldSet.classList.remove("enable");
  nextFieldSet.classList.add("enable");
  const nextfieldSetInput = nextFieldSet.querySelector("input")
  nextfieldSetInput && nextfieldSetInput.focus()

  const targetDot = form.querySelector("li.active");
  const nextDot = targetDot.nextElementSibling;
  targetDot.classList.remove("active");
  nextDot.classList.add("active");
};

// for dots handler function:
//user can go back to the previous and current field if the current one is done.
//both dots and fields are saved in and individual array. by clicking each dot the index of that dot is returned to fields array to show it.
//user can't go to the next field if the current one isn't completed
const dotsHandler = (target) => {
  if (target.tagName !== "LI") return;

  const dotsArray = Array.from(itemDotsContainer.children);

  const dotIndex = dotsArray.findIndex((dot) => dot === target);

  if (doneNumber < dotIndex) return;

  const fieldSetsArray = Array.from(fieldSets);

  const targetFieldSet = fieldSetsArray[dotIndex];

  const prevDot = itemDotsContainer.querySelector("li.active");
  prevDot.classList.remove("active");
  dotsArray[dotIndex].classList.add("active");

  //if the current field isn't filled correctly the error messege will only disappear when the user goes back to previous fields, not the current ones
  doneNumber !== dotIndex && document.body.classList.remove("error");

  const prevFieldSet = form.querySelector("fieldset.enable");
  prevFieldSet.classList.remove("enable");

  targetFieldSet.classList.add("enable");
};

form.addEventListener("submit", (e) => e.preventDefault());

document.addEventListener("keydown", (e) => {
  const target = form.querySelector("fieldset.enable .bi-arrow-down");
  if (e.keyCode === 13 && target) {
    e.preventDefault();
    next(target);
  }
});

document.addEventListener("mouseup", (e) => {
  e.target.classList.contains("bi-arrow-down") && next(e.target);
});

itemDotsContainer.addEventListener("click", (e) => dotsHandler(e.target));
