const totalPriceElement = document.getElementById("price");
const cashFromCustomer = document.getElementById("cash");
const resultDisplay = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

const currency = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.10],
    ["QUARTER", 0.25],
    ["ONE", 1.00],
    ["FIVE", 5.00],
    ["TEN", 10.00],
    ["TWENTY", 20.00],
    ["ONE HUNDRED", 100.00]
];

let price = 1.87;
const cid = [
    ["PENNY", 1.01], 
    ["NICKEL", 2.05], 
    ["DIME", 3.1], 
    ["QUARTER", 4.25], 
    ["ONE", 90], 
    ["FIVE", 55], 
    ["TEN", 20], 
    ["TWENTY", 60], 
    ["ONE HUNDRED", 100]
];

purchaseBtn.addEventListener("click", event => {
    const totalPrice = parseFloat(totalPriceElement.textContent.slice(1));
    const customerCash = parseFloat(cashFromCustomer.value); 

    if (customerCash < price) {
        alert("Customer does not have enough money to purchase the item");
    } else if (customerCash === price) {
        resultDisplay.textContent = "No change due - customer paid with exact cash";
    } else {
        const change = (customerCash - price).toFixed(2);
        const result = getChange(change, cid, currency);
        resultDisplay.textContent = `Status: ${result.status} ${result.change.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(' ')}`;
    }
});

const getChange = (change, cid, currency) => {
    let changeRequired = parseFloat(change);
    const totalCid = parseFloat(totalCashInDrawer(cid).toFixed(2));
    let changeArray = [];
    let status = "";

    if (changeRequired > totalCid) {
        status = "INSUFFICIENT_FUNDS";
    } else if (changeRequired.toFixed(2) === totalCid.toFixed(2)) {
        status = "CLOSED";
        changeArray = cid.filter(item => item[1] > 0).reverse().map(item => [item[0], item[1]]);
    } else {
        for (let i = currency.length - 1; i >= 0; i--) {
            let coinName = currency[i][0];
            let coinValue = currency[i][1];
            let coinTotal = cid.find(item => item[0] === coinName)[1];
            let coinAmount = 0;

            while (changeRequired >= coinValue && coinTotal >= coinValue) {
                coinAmount += coinValue;
                changeRequired -= coinValue;
                coinTotal -= coinValue;
                changeRequired = parseFloat(changeRequired.toFixed(2));
            }

            if (coinAmount > 0) {
                changeArray.push([coinName, parseFloat(coinAmount.toFixed(2))]);
            }
        }

        if (changeRequired > 0) {
            status = "INSUFFICIENT_FUNDS";
            changeArray = [];
        } else {
            status = "OPEN";
        }
    }

    return {
        status: status,
        change: changeArray
    };
}

function totalCashInDrawer(cid) {
    return cid.reduce((accumulator, currentValue) => {
        return accumulator + currentValue[1];
    }, 0);
}
