const USD = 6.03
const EUR = 6.23
const GBP = 7.38

const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")


amount.addEventListener("input", () => {
    const hasCaractersRegex = /\D+/g 
    amount.value = amount.value.replace(hasCaractersRegex, "")
})

form.onsubmit = (event) => {
    event.preventDefault()

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$") 
            break

        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break

        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break
    }
}

function convertCurrency(amount, price, symbol) {
    try {
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
        
        let total = amount * price

        if (isNaN(total)) {
            return alert("Por favor, digite o valor corretamente para converter.")
        }

        total = formatCurrencyBRL(total).replace("R$", "")

        result.textContent = `${total} Reais`
        
        footer.classList.add("show-result")

    } catch (error) {
        footer.classList.remove("show-result")

        console.log(error)
        alert("Não foi possível converter. Tente novamente.")
    }
}

function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}