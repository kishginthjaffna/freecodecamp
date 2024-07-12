const inputDisplay = document.getElementById("user-input");
const clearButton = document.getElementById("clear-btn");
const checkButton = document.getElementById("check-btn");
const resultDisplay = document.getElementById("results-div");

function clearBtn(){
    inputDisplay.value = "";
    resultDisplay.textContent = "";
}

checkButton.addEventListener("click", event => {
    const inputNum = inputDisplay.value;

    if(inputNum===""){
        alert("Please provide a phone number");
    } else {
        try {
            checkNum(inputNum);
        } catch (error) {
            console.log(error);
        }
    }
});

function checkNum(input){
    const numberPatter = /^(1\s?)?(\d{3}|\(\d{3}\))[\-\s]?\d{3}[\-\s]?\d{4}$/;

    if (numberPatter.test(input)){
        resultDisplay.textContent = `Valid US number: ${input}`;
    }else {
        resultDisplay.textContent = `Invalid US number: ${input}`;
    }

}