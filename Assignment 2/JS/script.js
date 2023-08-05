document.addEventListener("DOMContentLoaded", function (event) {
  var paymentMethodSelect = document.getElementById("payment_method");
  var cardDetailsSection = document.getElementById("card-details");
  var selectedPaymentMethod; // Declare the variable here

  paymentMethodSelect.addEventListener("change", function () {
    selectedPaymentMethod = paymentMethodSelect.value; // Assign the value inside the event listener

    if (selectedPaymentMethod === "Credit Card" || selectedPaymentMethod === "Debit Card") {
      cardDetailsSection.style.display = "block";
    } else {
      cardDetailsSection.style.display = "none";
    }
  });

  var orderButton = document.getElementById("order-btn");
  orderButton.addEventListener("click", function () {
    var size = document.getElementById("size").value;
    var crust = document.getElementById("crust").value;
    var payment = document.getElementById("payment_method").value;
    var sauce = document.querySelector('input[name="sauce"]:checked');
    var delivery = document.getElementById("delivery").checked;
    var takeout = document.getElementById("takeout").checked;
    var dineinn = document.getElementById("dineinn").checked;

    // Check if a sauce is selected
    if (!sauce) {
      alert("Please select a sauce!");
      return; // Exit the function and prevent further processing
    }

    // Check if delivery option is selected
    if (!delivery && !takeout && !dineinn) {
      alert("Please select a delivery option (Delivery, Take-Out, or Dine-Inn)!");
      return; // Exit the function and prevent further processing
    }

    sauce = sauce.value; // Get the selected sauce value

    // Rest of the code remains the same as before
    var toppings = document.querySelectorAll('input[type="checkbox"]:checked');
    var orderDetails = "Order Details:\n";
    orderDetails += "Size: " + size + "\n";
    orderDetails += "Crust: " + crust + "\n";
    orderDetails += "Sauce: " + sauce + "\n";
    orderDetails += "Toppings: ";
    var toppingsDisplay = "";
    var toppingsPrice = 0;
    for (var i = 0; i < toppings.length; i++) {
      orderDetails += toppings[i].value + " ";
      toppingsDisplay += toppings[i].value + ", ";
      toppingsPrice += 0.99; // Each topping costs $0.99
    }
    orderDetails += "\n";
    orderDetails += "Delivery: " + (delivery ? "Yes" : "No") + "\n";
    orderDetails += "Take-Out: " + (takeout ? "Yes" : "No") + "\n";
    orderDetails += "Dine-Inn: " + (dineinn ? "Yes" : "No") + "\n";

    // Calculate the price based on size and toppings
    var basePrice = 0;
    if (size === "personal") {
      basePrice = 7.45;
    } else if (size === "small") {
      basePrice = 9.45;
    } else if (size === "medium") {
      basePrice = 11.95;
    } else if (size === "large") {
      basePrice = 13.95;
    } else if (size === "extra large") {
      basePrice = 16.95;
    } // Add a missing closing bracket here

    var totalPrice = basePrice + toppingsPrice;

    // Add taxes (assuming 13% tax rate)
    var tax = totalPrice * 0.13;
    totalPrice += tax;

    orderDetails += "Price (Base): $" + basePrice.toFixed(2) + "\n";
    orderDetails += "Price (Toppings): $" + toppingsPrice.toFixed(2) + "\n";
    orderDetails += "Tax (13%): $" + tax.toFixed(2) + "\n"; // Correct the tax rate in the comment
    orderDetails += "Total Price: $" + totalPrice.toFixed(2) + "\n";

    // Fetch card details if available
    var cardName = document.getElementById("card_name").value;
    var cardNumber = document.getElementById("card_number").value;
    var expiry = document.getElementById("expiry").value;
    var cvv = document.getElementById("cvv").value;

    // Check if the payment method is Credit Card or Debit Card
    if ((selectedPaymentMethod === "Credit Card" || selectedPaymentMethod === "Debit Card") && cardName && cardNumber && expiry && cvv) {
      orderDetails += "\nPayment Method: " + selectedPaymentMethod;
      orderDetails += "\nCard Name: " + cardName;
      orderDetails += "\nCard Number: " + cardNumber;
      orderDetails += "\nExpiry: " + expiry;
      orderDetails += "\nCVV: " + cvv;
    } 
    alert(orderDetails + "\n Payment Method:" + payment);
    document.getElementById("toppings-display").textContent = toppingsDisplay.slice(0, -2); // Remove the trailing comma and space

    document.getElementById("total-price").value = totalPrice.toFixed(2); // Display the total price in the payment section 
   });
});
