((d) => {
  const $tipAmount = d.getElementById("tip-amount");
  const $totalAmount = d.getElementById("total-amount");
  const $percentBtns = d.querySelectorAll(".percent");
  const $inputAmount = d.getElementById("input-amount");
  const $numberOfPeople = d.getElementById("number-people");
  const $resetBtn = d.getElementById("reset-btn");
  const $inputTip = d.getElementById("input-tip");

  class Calculator {
    calculateTip(amount, tipPercentage, numberOfPeople) {
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
      if (parseFloat(numberOfPeople) == 0) numberOfPeople = 1;
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
    constructor(displayTip, displayAmount, numberOfPeople, inputAmount) {
      this.displayAmount = displayAmount;
      this.displayTip = displayTip;
      this.tip = 0;
      this.amount = 0;
      this.numberOfPeople = numberOfPeople;
      this.inputAmount = inputAmount;
      this.calculator = new Calculator();
    }

    calculate() {
      if (
        (this.tip ==
          0 || isNaN(this.tip) || this.inputAmount.value == "" || this.numberOfPeople.value == "")
      ) {
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
        console.log(typeof this.tip)
      this.tip = this.calculator
        .calculateTip(
          parseFloat(this.inputAmount.value),
          parseFloat(this.tip),
          parseFloat(this.numberOfPeople.value)
        )
        .toFixed(2);
      this.printValues();
    }

    printValues() {
      this.displayTip.textContent = `$${this.tip}`;
      this.displayAmount.textContent = `$${this.amount}`;
    }

    reset() {
      this.displayAmount.textContent = "$0.00";
      this.displayTip.textContent = "$0.00";
      this.tip = 0;
      this.numberOfPeople.value = "";
      this.amount = 0;
      this.inputAmount.value = "";
      $inputTip.value = "";
      for (let i = 0; i < $percentBtns.length; i++) {
      this.numberOfPeople.value = "";
        if($percentBtns[i].classList.contains("active")) $percentBtns[i].classList.remove("active")
        
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
      let perc = $percentBtns[i].textContent;
      display.tip = parseInt(perc) / 100;
      console.log(display.tip)
      for(let j = 0; j < $percentBtns.length; j++) {
        if($percentBtns[j].classList.contains("active"))$percentBtns[j].classList.remove("active") 
      }
      $inputTip.value = ""
      $percentBtns[i].classList.add("active");
      display.calculate();
    });
  }

  $inputTip.addEventListener("input", (e) => {
    if(e.target.value.trim() != ""){
      display.tip = parseInt(e.target.value) / 100;
    }
    else {display.tip = 1}
    for(let i = 0; i < $percentBtns.length; i++) {
      if($percentBtns[i].classList.contains("active")) {
        $percentBtns[i].classList.remove("active")
      }
    }

      display.calculate();
    });

  $resetBtn.addEventListener("click", () => {
    display.reset();
  });

  //* Usar este evento como onChange
  $inputAmount.addEventListener("input", () => {
    if (isNaN(parseFloat(display.inputAmount.value))) {
      return;
    }
    //! aca no es el problema
    display.calculate();
  });

  $numberOfPeople.addEventListener("input", (e) => {
    if (isNaN(parseFloat(e.target.value))) console.log("NaN");
    display.calculate();
  });
})(document);
