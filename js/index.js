((d) => {
  const $tipAmount = d.getElementById("tip-amount");
  const $totalAmount = d.getElementById("total-amount");
  const $tipPercentage = d.getElementById("tip-amount");
  const $percentBtns = d.querySelectorAll(".percent");
  const $selectedAmount = d.getElementById("selected-amount");
  const $numberOfPeople = d.getElementById("number-people");

  class Calculator {
    calculateTip(amount, tipPercentage, numberOfPeople = 1) {
      if (isNaN(parseFloat(tipPercentage))) {
        console.log("tipPercentage no es un numero");
        return;
      }
      if (isNaN(parseFloat(numberOfPeople))) {
        console.log("numberOfPeople no es un numero");
        return;
      }
      if (isNaN(parseFloat(amount))) {
        console.log("amount no es un numero");
        return;
      }
      return (amount * tipPercentage) / numberOfPeople;
    }

    calculateAmount(totalAmount, numberOfPeople) {
      if (isNaN(parseFloat(totalAmount))) {
        console.log("totalAMount no es un numero");
        return;
      }
      if (isNaN(parseFloat(numberOfPeople))) {
        console.log("numberOfPeople no es un numero");
        return;
      }
      return totalAmount / numberOfPeople;
    }
  }

  class Display {
    constructor(
      displayTip,
      displayAmount,
      numberOfPeople,
      selectedAmount
    ) {
      this.displayAmount = displayAmount;
      this.displayTip = displayTip;
      this.tip = 0;
      this.amount = 0;
      this.numberOfPeople = numberOfPeople;
      this.selectedTip = 0;
      this.selectedAmount = selectedAmount;
      this.calculator = new Calculator();
    }
    printValues() {
      this.displayTip.textContent = `$${this.tip}`;
      this.displayAmount.textContent = `$${this.amount}`;
    }

    reset() {
      this.displayAmount = "$0.00";
      this.displayTip = "$0.00";
      this.tip = 0;
      this.numberOfPeople = 0;
      this.amount = 0;
      this.selectedAmount = "";
      this.numberOfPeople = "";
      this.selectedTip = "";
    }

    calculate() {
      if (
        this.selectedTip.value == "" ||
        this.selectedAmount == "" ||
        this.numberOfPeople.value == ""
      ) {
        this.displayAmount.textContent = "$0.00";
        this.displayTip.textContent = "$0.00";
        return;
      }
      this.amount = this.calculator.calculateAmount(
        this.selectedAmount,
        this.numberOfPeople
      ).toFixed(2);
      this.tip = this.calculator.calculateTip(
        this.selectedAmount,
        this.selectedTip,
        this.numberOfPeople
      ).toFixed(2);
      this.printValues()
    }
  }


  const display = new Display(
    $tipAmount,
    $totalAmount,
    $numberOfPeople,
    $selectedAmount
  );


  for (let i = 0; i < $percentBtns.length; i++) {
    $percentBtns[i].addEventListener("click", () => {
      let perc = $percentBtns[i].textContent;
      display.selectedTip = parseInt(perc) / 100;
      display.calculate()
    });
  }


  //* Usar este evento como onChange
  $selectedAmount.addEventListener("keyup", (e) => {
    if (isNaN(parseFloat(e.target.value))) {
      console.log("NAN");
      return;
    }
    display.selectedAmount = parseFloat(e.target.value);
    display.calculate()
  });

  $numberOfPeople.addEventListener("keyup", (e) => {
    if (isNaN(parseFloat(e.target.value))) console.log("NaN");
    display.numberOfPeople = parseInt(e.target.value)
    display.calculate()
  });
})(document);
