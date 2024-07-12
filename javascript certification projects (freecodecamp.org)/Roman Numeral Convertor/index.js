const num = document.getElementById("number");
const resultDisplay = document.getElementById("output");
const convert = document.getElementById("convert-btn");

const intToRomanMap = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
];

convert.addEventListener("click", event => {

    const input = num.value;

    if (input ===""){
        resultDisplay.textContent = "Please enter a valid number";
        resultDisplay.classList.add("errorMessage");
    } else if (input <= 0){
        resultDisplay.textContent = "Please enter a number greater than or equal to 1";
        resultDisplay.classList.add("errorMessage");
    } else if (input > 3999) {
        resultDisplay.textContent = "Please enter a number less than or equal to 3999";
        resultDisplay.classList.add("errorMessage");
    } else {
        resultDisplay.textContent = intToRoman(input);
    }
});

function intToRoman(num){
        let result = '';
    
        for (const { value, symbol } of intToRomanMap) {
            while (num >= value) {
                result += symbol;
                num -= value;
            }
        }
    
        return result;

}