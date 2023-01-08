((d) => {
  const $tipAmount = d.getElementById("tip-amount");
  const $totalAmount = d.getElementById("total-amount");
  const $percentBtns = d.querySelectorAll(".percent");
  const $inputAmount = d.getElementById("input-amount");
  const $numberOfPeople = d.getElementById("number-people");
  const $resetBtn = d.getElementById("reset-btn");
  const $inputTip = d.getElementById("input-tip");
  const $numberOfPeopleLabel = d.getElementById("number-people-label");
  const $inputAmountLabel = d.getElementById("input-amount-label");
  const $tipLabel = d.getElementById("tip-label");

  class Calculator {
    calculateTip(amount, tipPercentage, numberOfPeople) {
      return (amount * tipPercentage) / numberOfPeople;
    }

    calculateAmount(totalAmount, numberOfPeople) {
      return totalAmount / numberOfPeople;
    }
  }

  class Display {
    constructor(displayTip, displayAmount, numberOfPeople, inputAmount) {
      this.displayAmount = displayAmount;
      this.displayTip = displayTip;
      this.tipPercentage = 0;
      this.tipValue = 0;
      this.amount = 0;
      this.numberOfPeople = numberOfPeople;
      this.inputAmount = inputAmount;
      this.calculator = new Calculator();
    }

    calculate() {
      if (this.tipPercentage == 0 || isNaN(this.tipPercentage) || this.inputAmount.value == "" || this.numberOfPeople.value == "0" || isNaN(parseInt(this.numberOfPeople.value)) ) {
        this.displayAmount.textContent = "$0.00";
        this.displayTip.textContent = "$0.00";
        return;
      }
      this.amount = this.calculator
        .calculateAmount(
          parseFloat(this.inputAmount.value),
          parseFloat(this.numberOfPeople.value)
        )
        .toFixed(2);

      this.tipValue = this.calculator
        .calculateTip(
          parseFloat(this.inputAmount.value),
          parseFloat(this.tipPercentage),
          parseFloat(this.numberOfPeople.value)
        )
        .toFixed(2);
      this.printValues();
    }

    printValues() {
      this.displayTip.textContent = `$${this.tipValue}`;
      this.displayAmount.textContent = `$${this.amount}`;
    }

    reset() {
      this.displayAmount.textContent = "$0.00";
      this.displayTip.textContent = "$0.00";
      this.tipValue = 0;
      this.tipPercentage = 0;
      this.numberOfPeople.value = "";
      this.amount = 0;
      this.inputAmount.value = "";
      $inputTip.value = "";
      for (let i = 0; i < $percentBtns.length; i++) {
        this.numberOfPeople.value = "";
        if ($percentBtns[i].classList.contains("active"))
          $percentBtns[i].classList.remove("active");
      }
    }
  }

  const display = new Display(
    $tipAmount,
    $totalAmount,
    $numberOfPeople,
    $inputAmount
  );

  for (let i = 0; i < $percentBtns.length; i++) {
    $percentBtns[i].addEventListener("click", () => {
      $tipLabel.textContent = "";
      $inputTip.style.borderColor = "transparent";
      let perc = $percentBtns[i].textContent;
      display.tipPercentage = parseInt(perc) / 100;
      for (let j = 0; j < $percentBtns.length; j++) {
        if ($percentBtns[j].classList.contains("active"))
          $percentBtns[j].classList.remove("active");
      }
      $inputTip.value = "";
      $percentBtns[i].classList.add("active");
      display.calculate();
    });
  }

  $inputTip.addEventListener("input", (e) => {
    if (isNaN(parseFloat(e.target.value)) || parseFloat(e.target.value) == 0) {
      $tipLabel.textContent = "Please enter valid values";
      $inputTip.style.border = "2px solid #e84";
      return;
    }
    display.tipPercentage = parseInt(e.target.value) / 100;
    $tipLabel.textContent = "";
    $inputTip.style.borderColor = "transparent";
    for (let i = 0; i < $percentBtns.length; i++) {
      if ($percentBtns[i].classList.contains("active")) {
        $percentBtns[i].classList.remove("active");
      }
    }
    display.calculate();
  });

  $resetBtn.addEventListener("click", () => {
    display.reset();
  });

  //* Usar este evento como onChange
  $inputAmount.addEventListener("input", () => {
    if (
      isNaN(parseFloat(display.inputAmount.value)) ||
      parseFloat(display.inputAmount.value) == 0
    ) {
      display.inputAmount.style.border = "2px solid #e84";
      $inputAmountLabel.textContent = "Please enter a valid value";
      return;
    }
    display.inputAmount.style.borderColor = "transparent";
    $inputAmountLabel.textContent = "";
    //! aca no es el problema
    display.calculate();
  });

  $numberOfPeople.addEventListener("input", (e) => {
    if (isNaN(parseFloat(e.target.value)) || parseFloat(e.target.value) == 0) {
      $numberOfPeople.style.border = "2px solid #e84";
      $numberOfPeopleLabel.textContent = "Please enter a valid value";
      return;
    }
    $numberOfPeopleLabel.textContent = "";
    $numberOfPeople.style.borderColor = "transparent";
    display.calculate();
  });
})(document);
