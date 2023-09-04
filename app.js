let filteredProducts = [...products];

//display products
const productsContainer = document.querySelector('.products-container');

const displayProducts = () => {
  if (filteredProducts.length < 1) {
    productsContainer.innerHTML = `<h5>Sorry, no results match search</h5>`;
    return;
  }
  productsContainer.innerHTML = filteredProducts
    .map(({ title, company, image, price }) => {
      return `<div class="product" data-id="${company}">
                <div class="img-container">
                    <img src="${image}" class="product-img">
                </div>
                <h3 class="product-title">${title}</h3>
                <p class="price">$${price}</p>
            </div>`;
    })
    .join('');
};

displayProducts();

//filter by search
const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('keyup', () => {
  const searchValue = searchInput.value;
  filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchValue)
  );
  displayProducts();
});

//filter by button
const companiesContainer = document.querySelector('.companies-container');

const companyBtns = [
  'all',
  ...new Set(products.map((product) => product.company)),
];

companiesContainer.innerHTML = companyBtns
  .map((company) => {
    return `<button class="company-btn" data-id="${company}">${company}</button>`;
  })
  .join('');

companiesContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('company-btn')) {
    if (e.target.dataset.id === 'all') {
      filteredProducts = products;
      displayProducts();
    } else {
      filteredProducts = products.filter(
        (product) => product.company === e.target.dataset.id
      );
      displayProducts();
    }
    searchInput.value = '';
  }
});
