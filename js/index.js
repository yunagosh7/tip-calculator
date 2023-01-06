((d) => {
  const $totalAmount = d.getElementById("total-amount");
  const $tipAmount = d.getElementById("tip-amount");
  const $percentBtns = d.querySelectorAll(".percent");
  const $bill = d.getElementById("bill");
  const $numberPeople = d.getElementById("number-people");

  //* Usar este evento como onChange
  $bill.addEventListener("keyup", () => {
      $totalAmount.textContent = "$" + $bill.value;
  });

})(document);
