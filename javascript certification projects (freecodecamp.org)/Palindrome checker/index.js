const inputWord = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const resultDisplay = document.getElementById("resultDisplay");

button.addEventListener("click", event => {
    if(inputWord.value === ""){
        alert("Please input a value");
    } else {
        checkPalindrome(inputWord.value);
    }
});

function checkPalindrome(input){
    const cleanedString = input.replace(/[\W_]/g, "").toLowerCase();
    const reversedString = cleanedString.split('').reverse().join('');

    if(cleanedString === reversedString){
        resultDisplay.innerHTML = `<p><b>${input}</b> is a palindrome</p>`;
    } else {
        resultDisplay.innerHTML = `<p><b>${input}</b> is not a palindrome</p>`;
    }
}
