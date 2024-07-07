const productList = [
  { pid: "abcd-0987-WXYZ", name: "jeans", price: 500, image: "https://media.istockphoto.com/photos/blue-denim-picture-id501250332" },
  { pid: "efgh-1234-QRST", name: "hoodie", price: 700, image: "https://media.istockphoto.com/photos/faceless-man-in-hoodie-standing-isolated-on-black-picture-id916306960" },
  { pid: "ijkl-6543-MNOP", name: "shirt", price: 450, image: "https://media.istockphoto.com/photos/men-shirt-for-clothing-isolated-on-white-background-picture-id641319368" },
  { pid: "mnop-5678-IJKL", name: "sweater", price: 1100, image: "https://media.istockphoto.com/photos/minimalistic-rustic-composition-with-stacked-vintage-knitted-easy-picture-id1049751604" },
  { pid: "qrst-2109-EFGH", name: "trouser", price: 600, image: "https://media.istockphoto.com/photos/pants-picture-id168790494" },
  { pid: "wxyz-9012-ABCD", name: "tshirt", price: 250, image: "https://media.istockphoto.com/photos/close-up-of-colorful-tshirts-on-hangers-apparel-background-picture-id1170635789" },
];

function createElementFromMarkup(html) {
  const renderBox = document.createElement('div');
  renderBox.innerHTML = html;
  return renderBox.firstElementChild;
}

function createItemMainView(data) {
  return createElementFromMarkup(`
    <li data-pid="${data.pid}">
      <h3>${data.name}</h3>
      <img src="${data.image}"/>
      <dl><dt>Price</dt><dd>${data.price}</dd></dl>
      <button data-add-pid="${data.pid}" data-text="Add to cart">Add to cart</button>
    </li>
  `);
}
function createItemCartView(data) {
  return createElementFromMarkup(`
    <li data-pid="${data.pid}">
      <h3>${data.name}</h3>
      <dl><dt>Price</dt><dd>${data.price}</dd></dl>
      <button data-remove-pid="${data.pid}">Remove</button>
    </li>
  `);
}

function createShoppingItem(data) {
  return {
    data,
    view: {
      main: createItemMainView(data),
      cart: createItemCartView(data),
    },
    checkout: {
      isInCart: false,
      orderCount: 0,
    },
  };
}

function scrollIntoViewIfNeeded(elmNode) {
  if (elmNode) {
    const whichScrollIntoView = elmNode.scrollIntoViewIfNeeded
      ? 'scrollIntoViewIfNeeded'
      : 'scrollIntoView';
    elmNode[whichScrollIntoView]();
  }
}

function updateShoppingCartTotal(elmCartTotal, shoppingState) {
  const total = Object
    .values(shoppingState)
    .reduce((sum, item) =>
      (sum + ((item.data.price ?? 0) * (item.checkout.orderCount ?? 0))), 0
    );
  elmCartTotal.textContent = (total === 0) ? '' : total;
}

function updateCartItemPriceView(elmPrice, price, orderCount) {
  elmPrice.textContent = (orderCount >= 2)
    ? `${price} x ${orderCount}`
    : price;
}
function updateAddButtonItemCount(elmButton, orderCount) {
  const { text: buttonText } = elmButton.dataset;

  elmButton.textContent = (orderCount >= 1)
    ? `${buttonText} (${orderCount})`
    : buttonText;
}

function updateOrderCounts(pid, context) {
  const {
    target: { elmMainOverview, elmCartOverview, elmCartTotal },
    state: shoppingState,
  } = context;

  const shoppingItem = shoppingState[pid];
  const orderCount = shoppingItem?.checkout?.orderCount ?? 0;

  const elmButton = elmMainOverview
    .querySelector(`[data-add-pid="${pid}"]`);
  const elmPrice = (orderCount >= 1) && elmCartOverview
    .querySelector(`[data-pid="${pid}"] dd`);

  if (elmButton) {
    updateAddButtonItemCount(elmButton, orderCount);
  }
  if (elmPrice) {
    updateCartItemPriceView(elmPrice, shoppingItem?.data?.price, orderCount);
  }
  updateShoppingCartTotal(elmCartTotal, shoppingState);
}

function handleAddToCartWithBoundTargetAndState(evt) {
  const target = evt.target.closest('[data-add-pid]');
  if (target) {

    const { addPid: pid } = target.dataset;
    const {
      target: { elmCartOverview },
      state: shoppingState,
    } = this;

    const item = shoppingState[pid];
    if (item) {
      if (item.checkout.isInCart === false) {

        elmCartOverview.appendChild(item.view.cart.cloneNode(true));

        item.checkout.isInCart = true;
      }
      item.checkout.orderCount += 1;

      scrollIntoViewIfNeeded(
        elmCartOverview.querySelector(`[data-pid="${pid}"]`)
      );
      updateOrderCounts(pid, this);
    }
    // console.log('Add To Cart :: pid ...', pid);
  }
  console.log('Add To Cart :: evt.target ...', evt.target);
}
function handleRemoveFromCartWithBoundTargetAndState(evt) {
  const target = evt.target.closest('[data-remove-pid]');
  if (target) {

    const { removePid: pid } = target.dataset;
    const {
      target: { elmMainOverview, elmCartOverview },
      state: shoppingState,
    } = this;

    const item = shoppingState[pid];
    if (item) {

      const selector = `[data-pid="${pid}"]`;

      scrollIntoViewIfNeeded(elmMainOverview.querySelector(selector));
      elmCartOverview.querySelector(selector)?.remove();

      elmMainOverview
        .querySelector(`[data-add-pid="${pid}"]`).focus?.();

      item.checkout.isInCart = false;
      item.checkout.orderCount = 0;

      updateOrderCounts(pid, this);
    }
    // console.log('Remove From Cart :: pid ...', pid);
  }
  console.log('Remove From Cart :: evt.target ...', evt.target);
}

function main() {
  const shoppingState = productList
    .map(createShoppingItem)
    .reduce((state, item) =>
      Object.assign(state, { [item.data.pid]: item }),
      Object.create(null)
    );
  console.log({ shoppingState })

  const elmMainOverview = document
    .querySelector('[data-product-overview]');
  const elmShoppingCart = document
    .querySelector('[data-shopping-cart]');

  const elmCartOverview = elmShoppingCart
    ?.querySelector('[data-cart-overview]');
  const elmCartTotal = elmShoppingCart
    ?.querySelector('[data-cart-total]');

  const handlerContext = {
    target: {
      elmMainOverview,
      elmCartOverview,
      elmCartTotal,
    },
    state: shoppingState,
  };
  elmMainOverview.addEventListener('click',
    handleAddToCartWithBoundTargetAndState.bind(handlerContext)
  );
  elmCartOverview.addEventListener('click',
    handleRemoveFromCartWithBoundTargetAndState.bind(handlerContext)
  );
  // initially render product list from shopping state.
  Object
    .values(shoppingState)
    .forEach(item =>
      elmMainOverview.appendChild(item.view.main.cloneNode(true))
    );
}
main();






