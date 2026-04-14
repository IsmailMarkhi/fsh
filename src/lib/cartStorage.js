const CART_KEY = "featureshoes_cart";

export function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function clearCartStorage() {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cart-updated"));
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + Number(item.qty || 0), 0);
}

export function getCartTotal() {
  return getCart().reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0),
    0
  );
}

export function addToCart(product) {
  const cart = getCart();

  const existingIndex = cart.findIndex((item) => item.id === product.id);

  if (existingIndex !== -1) {
    const existingItem = cart[existingIndex];

    if (existingItem.qty < existingItem.stock) {
      cart[existingIndex] = {
        ...existingItem,
        qty: existingItem.qty + 1,
      };
      saveCart(cart);
      return {
        ok: true,
        type: "updated",
        message: `${product.name} quantity increased in your cart.`,
      };
    }

    return {
      ok: false,
      type: "warning",
      message: `Only ${existingItem.stock} unit(s) available for ${product.name}.`,
    };
  }

  cart.push({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    image: product.image,
    stock: Number(product.stock ?? 10),
    qty: 1,
  });

  saveCart(cart);

  return {
    ok: true,
    type: "added",
    message: `${product.name} has been added to your cart.`,
  };
}

export function increaseCartItem(index) {
  const cart = getCart();
  const item = cart[index];

  if (!item) {
    return { ok: false, message: "Item not found." };
  }

  if (item.qty >= item.stock) {
    return {
      ok: false,
      type: "warning",
      message: `Only ${item.stock} unit(s) available for ${item.name}.`,
    };
  }

  cart[index] = { ...item, qty: item.qty + 1 };
  saveCart(cart);

  return {
    ok: true,
    type: "success",
    message: `${item.name} quantity increased.`,
  };
}

export function decreaseCartItem(index) {
  const cart = getCart();
  const item = cart[index];

  if (!item) {
    return { ok: false, message: "Item not found." };
  }

  if (item.qty > 1) {
    cart[index] = { ...item, qty: item.qty - 1 };
    saveCart(cart);

    return {
      ok: true,
      type: "success",
      message: `${item.name} quantity decreased.`,
    };
  }

  cart.splice(index, 1);
  saveCart(cart);

  return {
    ok: true,
    type: "success",
    message: `${item.name} has been removed from your cart.`,
  };
}

export function removeCartItem(index) {
  const cart = getCart();
  const item = cart[index];

  if (!item) {
    return { ok: false, message: "Item not found." };
  }

  cart.splice(index, 1);
  saveCart(cart);

  return {
    ok: true,
    type: "success",
    message: `${item.name} has been removed from your cart.`,
  };
}