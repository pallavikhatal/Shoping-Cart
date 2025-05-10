let allProducts = [];
let cart = [];

    const fetchProducts = () => {
      document.getElementById('loader').style.display = 'flex';

      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
          allProducts = data;
          displayProducts(allProducts);
        })
        .catch(err => console.error(err))
        .finally(() => {
          document.getElementById('loader').style.display = 'none';
        });
    };

    const displayProducts = (products) => {
      document.getElementById('product-container').style.display = 'flex';
      document.getElementById('cart-page').style.display = 'none';

      const container = document.getElementById('product-container');
      container.innerHTML = '';

      products.forEach(product => {
        const isInCart = cart.some(item => item.id === product.id);
        const buttonText = isInCart ? 'Remove from Cart' : 'Add to Cart';
        const buttonAction = isInCart ? `removeFromCart(${product.id})` : `addToCart(${product.id})`;

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <h5>${product.title.slice(0, 10)}...</h5>
          <p>${product.description.slice(0, 50)}...</p>
          <img src="${product.image}" alt="${product.title}">
          <div id="card-btns">    
              <span>$${product.price}</span>
              <button onclick="${buttonAction}">${buttonText}</button>
          </div>
        `;
        container.appendChild(card);
      });
    };

    const addToCart = (productId) => {
      const product = allProducts.find(p => p.id === productId);
      if (!cart.some(p => p.id === productId)) {
        cart.push(product);
      }
      document.getElementById('cart-counter').innerText = cart.length;
      displayProducts(allProducts);
    };

    const removeFromCart = (productId) => {
      cart = cart.filter(p => p.id !== productId);
      document.getElementById('cart-counter').innerText = cart.length;
      displayProducts(allProducts);
    };

    const showCart = () => {
      document.getElementById('product-container').style.display = 'none';
      document.getElementById('cart-page').style.display = 'block';

      const cartContainer = document.getElementById('cart-products');
      cartContainer.innerHTML = '';

      if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
      }

      cart.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <h5>${product.title.slice(0, 10)}...</h5>
          <p>${product.description.slice(0, 50)}...</p>
          <img src="${product.image}" alt="${product.title}">
          <div id="card-btns">    
              <span>$${product.price}</span>
              <button onclick="removeFromCart(${product.id})">Remove from Cart</button>
          </div>
        `;
        cartContainer.appendChild(card);
      });
    };

    const searchProducts = () => {
      const searchTerm = document.getElementById('search-input').value.toLowerCase();
      const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
      displayProducts(filtered);
    };

    const filterProducts = (category) => {
      if (category === 'all') return displayProducts(allProducts);
      const filtered = allProducts.filter(p => p.category === category);
      displayProducts(filtered);
    };

    window.addEventListener('DOMContentLoaded', fetchProducts);