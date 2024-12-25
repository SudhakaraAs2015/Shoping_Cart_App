const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsList = document.getElementById('cart-items');
const totalPriceDisplay = document.getElementById('total-price');

let cart = [];

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));

    addToCart(productName, productPrice);
  });
});

function addToCart(name, price) {
 

  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCart();
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

function updateCart() {
  cartItemsList.innerHTML = '';

  let total = 0;

  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('cart-item');
    
    listItem.innerHTML = `
      <span>${item.name} (Quantity-${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}</span>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    `;

    cartItemsList.appendChild(listItem);

    total += item.price * item.quantity;
  });

  totalPriceDisplay.textContent = total.toFixed(2);
}
