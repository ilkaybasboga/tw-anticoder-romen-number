const input = document.getElementById("input-num");
const addBtn = document.querySelector(".convert");
const form = document.querySelector(".form");
const displayNumber = document.querySelector(".displayNumber");
const ul = document.createElement("ul");
const section = document.getElementById("re-load");
form.appendChild(ul);

let localList = JSON.parse(localStorage.getItem("localList")) || [];

// ***** 1.kullanıcı sayı girmediğinde 5sn uyarı ver.
//***** 2.Girilen değeri 10 sn ekranda kalacak
//      3.Her girilen doğru değeri tablo halinde sıralayıp son girilen başa gelecek
//      4.Sayfayı re-load yaptıgında silinmeyecek.

//*******************FUNCTİONS ********************/
convert = (num) => {
  let result = "";
  const romanNum = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];
  const decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  for (let i = 0; i < decimal.length; i++) {
    while (num >= decimal[i]) {
      result += romanNum[i];
      num -= decimal[i];
    }
  }
  displayNumber.innerText = result;
  const li = document.createElement("li");
  ul.prepend(li);
  li.className = "li-top";
  li.innerText = result;
  section.prepend(li);
  localList.push(result);
  localStorage.setItem("localList", JSON.stringify(localList));
};
window.addEventListener("load", () => {
  getLocalListFromLocalStorage();
});
const getLocalListFromLocalStorage = () => {
  //get localList from localStorage and load to UI
  localList.forEach((num) => {
    const li = document.createElement("li");
    li.className = "li-bottom";
    li.innerText = num;
    section.prepend(li);
  });
};

/************EVENT*********************************************************************** */

form.addEventListener("submit", (e) => {
  const number = Number(input.value);
  if (input.value != number || input.value == "") {
    displayNumber.innerText = "Sadece sayı giriniz";
    // li.innerText = "Sadece sayı giriniz";

    setTimeout(() => {
      displayNumber.innerText = "";
      // li.innerText = "";
    }, 5000);
  } else if (input.value == number) {
    convert(number);
    setTimeout(() => {
      displayNumber.innerText = "";
      // li.innerText = "";
    }, 3000);
  }

  // input.value = "";
  e.target.closest("form").reset();
  // input.focus();
  e.preventDefault();
});
