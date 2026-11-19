/**
 * Ashirvad Veg - Shopping Cart Management
 * Clean, lightweight, professional order drawer with LocalStorage persistence.
 */

const CART_STORAGE_KEY = "ashirvad_veg_cart_v2";

class CartManager {
  constructor() {
    this.items = this.loadCart();
    this.initListeners();
    this.updateCartBadge();
  }

  loadCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
      this.updateCartBadge();
      this.renderCartUI();
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }

  addItem(itemId, quantity = 1) {
    if (typeof getItemById !== "function") {
      console.error("getItemById function not found. Make sure menu-data.js is loaded.");
      return;
    }

    const item = getItemById(itemId);
    if (!item) {
      this.showToast("Item not found", "error");
      return;
    }

    const existingIndex = this.items.findIndex(i => i.id === itemId);
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        quantity: quantity
      });
    }

    this.saveCart();
    this.showToast(`Added ${item.name}`, "success");
    this.openDrawer();
  }

  updateQuantity(itemId, delta) {
    const itemIndex = this.items.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;

    this.items[itemIndex].quantity += delta;
    if (this.items[itemIndex].quantity <= 0) {
      this.items.splice(itemIndex, 1);
    }

    this.saveCart();
  }

  removeItem(itemId) {
    const itemIndex = this.items.findIndex(i => i.id === itemId);
    if (itemIndex > -1) {
      this.items.splice(itemIndex, 1);
      this.saveCart();
    }
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  getTotalCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  updateCartBadge() {
    const totalCount = this.getTotalCount();
    const badges = document.querySelectorAll(".cart-badge, .cart-counter-badge");
    badges.forEach(badge => {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? "inline-flex" : "none";
    });

    // Mobile sticky bar update
    const mobileBar = document.getElementById("mobileCartPill");
    if (mobileBar) {
      if (totalCount > 0) {
        mobileBar.classList.add("visible");
        const countEl = mobileBar.querySelector(".mobile-cart-items-count");
        const sumEl = mobileBar.querySelector(".mobile-cart-sum");
        if (countEl) countEl.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'}`;
        if (sumEl) sumEl.textContent = `₹${this.getSubtotal()}`;
      } else {
        mobileBar.classList.remove("visible");
      }
    }
  }

  openDrawer() {
    if (typeof window.closeMobileMenu === "function") {
      window.closeMobileMenu();
    }
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    if (drawer && overlay) {
      this.renderCartUI();
      drawer.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  closeDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    if (drawer && overlay) {
      drawer.classList.remove("active");
      overlay.classList.remove("active");
      const mobileNav = document.getElementById("mobileNavDrawer");
      if (!mobileNav || !mobileNav.classList.contains("active")) {
        document.body.style.overflow = "";
      }
    }
  }

  renderCartUI() {
    const container = document.getElementById("cartDrawerItems");
    const emptyState = document.getElementById("cartEmptyState");
    const footer = document.getElementById("cartDrawerFooter");
    const subtotalEl = document.getElementById("cartSubtotalPrice");
    const totalCountEl = document.getElementById("cartTotalItemsCount");

    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = "";
      if (emptyState) emptyState.style.display = "flex";
      if (footer) footer.style.display = "none";
      if (totalCountEl) totalCountEl.textContent = "0 items";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (footer) footer.style.display = "block";

    const totalCount = this.getTotalCount();
    if (totalCountEl) totalCountEl.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'}`;

    const subtotal = this.getSubtotal();
    if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
    const totalPriceEl = document.getElementById("cartDrawerTotalPrice");
    if (totalPriceEl) totalPriceEl.textContent = `₹${subtotal}`;

    container.innerHTML = this.items.map(item => `
      <div class="cart-item-row" data-id="${item.id}">
        <div class="cart-item-left">
          <div class="cart-item-heading">${item.name}</div>
          <div class="cart-item-unit-price">₹${item.price} each</div>
          <div class="cart-item-qty-bar">
            <button type="button" class="cart-qty-btn" onclick="window.cartApp.updateQuantity('${item.id}', -1)" aria-label="Decrease quantity">−</button>
            <span class="cart-qty-count">${item.quantity}</span>
            <button type="button" class="cart-qty-btn" onclick="window.cartApp.updateQuantity('${item.id}', 1)" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="cart-item-right">
          <span class="cart-item-line-total">₹${item.price * item.quantity}</span>
          <button type="button" class="cart-item-delete" onclick="window.cartApp.removeItem('${item.id}')">Remove</button>
        </div>
      </div>
    `).join("");
  }

  showToast(message) {
    let toast = document.getElementById("cartToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "cartToast";
      toast.className = "cart-toast";
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }

  initListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      this.updateCartBadge();
      this.renderCartUI();

      const closeBtn = document.getElementById("closeCartDrawer");
      const overlay = document.getElementById("cartOverlay");

      if (closeBtn) closeBtn.addEventListener("click", () => this.closeDrawer());
      if (overlay) overlay.addEventListener("click", () => this.closeDrawer());

      const triggers = document.querySelectorAll(".cart-drawer-trigger");
      triggers.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          this.openDrawer();
        });
      });

      const clearBtn = document.getElementById("clearCartBtn");
      if (clearBtn) {
        clearBtn.addEventListener("click", () => {
          if (confirm("Clear your current order list?")) {
            this.clearCart();
          }
        });
      }
    });
  }
}

// Global Cart Instance
window.cartApp = new CartManager();
