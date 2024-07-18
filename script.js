
let dropdowns=document.querySelectorAll(".dropdown");
let btn = document.querySelector(".click");
let fromCur = document.querySelector(".from select");
let toCur = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (select of dropdowns) {
    for (curCode in countryList) { 
        let newOpt=document.createElement("option");
        newOpt.innerText = curCode;
        newOpt.value = curCode;
        select.append(newOpt);
        if(select.name=="from" && curCode=="USD"){
            newOpt.selected = "selected";
        } else if(select.name=="to" && curCode=="INR"){ 
            newOpt.selected = "selected";
        }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

function updateFlag(element){
    let curCode = element.value;
    let countryCode = countryList[curCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".input");
    let amountVal = amount.value;
    let URL = `https://v6.exchangerate-api.com/v6/7d8c8338b941cbd24540f730/latest/${fromCur.value.toLowerCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCur.value];
    let convertedAmt = rate*amountVal;
    msg.innerText = `${amountVal} ${fromCur.value} = ${convertedAmt.toFixed(2)} ${toCur.value}`;
    if(amountVal===""){
        msg.innerText = "Please enter amount";
    }
})


