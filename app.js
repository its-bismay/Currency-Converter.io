const url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const btn = document.querySelector("#btn1")

const dropdown = document.querySelectorAll(".dropdown select");

const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")

const msg = document.querySelector(".msg")



for(let select of dropdown){
    for(currCode in countryList){
        let newOptn = document.createElement("option");
        newOptn.innerText = currCode;
        newOptn.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOptn.selected = "selected"
        }else if(select.name === "to" && currCode === "INR"){
            newOptn.selected = "selected"
        }
        select.append(newOptn)
    }


    select.addEventListener("change", (evt) => {
        flag(evt.target)
    })
}

const updateRate = async() =>{
    let amount = document.querySelector("#amt");
    let amountValue = amount.value;
    if(amountValue === "" || amountValue < 1){
        amountValue = 0;
        amount.value = "0"
    }

    const nurl = `${url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(nurl);
    let data = await response.json();

    let rate = data[toCurr.value.toLowerCase()]

    let finalamt = amountValue * rate

    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalamt} ${toCurr.value}`
}

const flag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click",  (evt) =>{
    evt.preventDefault();
    updateRate();
})

window.addEventListener("load", () => {
    updateRate();
})

