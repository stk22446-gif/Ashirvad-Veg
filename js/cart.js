/**
 * Ashirvad Veg - Shopping Cart Management
 * Production-ready, robust vanilla JS cart system with LocalStorage persistence.
 * Uses js/menu-data.js as the single source of truth for all products and prices.
 */

const CART_STORAGE_KEY = "ashirvad_veg_cart_v2";

class CartManager {
  constructor() {
    this.items = this.loadCart();
    this.initListeners();
    this.updateCartBadge();
  }

  /**
   * Validates and sanitizes cart items against menu-data.js
   * - Eliminates invalid or obsolete items
   * - Restores exact numeric prices from menu data
   * - Ensures integer quantities >= 1
   * - Merges any duplicate item entries
   */
  validateCart(rawItems) {
    if (!Array.isArray(rawItems)) {
      return [];
    }

    const validItemsMap = new Map();

    rawItems.forEach(entry => {
      if (!entry || typeof entry !== "object") return;
      const id = String(entry.id || "").trim();
      if (!id) return;

      // Single source of truth lookup
      let menuItem = null;
      if (typeof getItemById === "function") {
        menuItem = getItemById(id);
      } else if (typeof MENU_ITEMS !== "undefined" && Array.isArray(MENU_ITEMS)) {
        menuItem = MENU_ITEMS.find(m => m.id === id);
      }

      // If item does not exist in menu data, discard safely
      if (!menuItem) return;

      // Quantity must be an integer >= 1
      const qty = Math.max(1, parseInt(entry.quantity, 10) || 1);

      if (validItemsMap.has(id)) {
        // Merge duplicates if found in storage
        validItemsMap.get(id).quantity += qty;
      } else {
        validItemsMap.set(id, {
          id: menuItem.id,
          name: menuItem.name,
          price: Number(menuItem.price), // Always use genuine numeric price from menu data
          category: menuItem.category,
          quantity: qty
        });
      }
    });

    return Array.from(validItemsMap.values());
  }

  /**
   * Safely loads and validates cart from localStorage
   */
  loadCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return this.validateCart(parsed);
    } catch (e) {
      console.warn("Failed to parse cart from localStorage, resetting cart:", e);
      return [];
    }
  }

  /**
   * Persists validated cart state to localStorage and updates all UI displays
   */
  saveCart() {
    try {
      this.items = this.validateCart(this.items);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
      this.updateCartBadge();
      this.renderCartUI();
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
    }
  }

  /**
   * Adds an item to the cart or increments its quantity if already present
   */
  addItem(itemId, quantity = 1) {
    if (!itemId) return;

    let menuItem = null;
    if (typeof getItemById === "function") {
      menuItem = getItemById(itemId);
    } else if (typeof MENU_ITEMS !== "undefined" && Array.isArray(MENU_ITEMS)) {
      menuItem = MENU_ITEMS.find(m => m.id === itemId);
    }

    if (!menuItem) {
      console.error(`Item not found in menu-data: ${itemId}`);
      this.showToast("Item not found in menu", "error");
      return;
    }

    const qtyToAdd = Math.max(1, parseInt(quantity, 10) || 1);
    const existingIndex = this.items.findIndex(i => i.id === itemId);

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += qtyToAdd;
      this.items[existingIndex].price = Number(menuItem.price);
      this.items[existingIndex].name = menuItem.name;
    } else {
      this.items.push({
        id: menuItem.id,
        name: menuItem.name,
        price: Number(menuItem.price),
        category: menuItem.category,
        quantity: qtyToAdd
      });
    }

    this.saveCart();
    this.showToast(`Added ${menuItem.name} to order`, "success");
    this.openDrawer();
  }

  /**
   * Increases or decreases item quantity.
   * Quantity cannot go below 1.
   */
  updateQuantity(itemId, delta) {
    const itemIndex = this.items.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;

    const currentQty = parseInt(this.items[itemIndex].quantity, 10) || 1;
    const change = parseInt(delta, 10) || 0;
    const newQty = currentQty + change;

    // Quantity cannot go below 1
    if (newQty < 1) {
      return;
    }

    this.items[itemIndex].quantity = newQty;
    this.saveCart();
  }

  /**
   * Completely removes an item from the cart
   */
  removeItem(itemId) {
    const itemIndex = this.items.findIndex(i => i.id === itemId);
    if (itemIndex > -1) {
      const removedName = this.items[itemIndex].name;
      this.items.splice(itemIndex, 1);
      this.saveCart();
      this.showToast(`Removed ${removedName}`, "info");
    }
  }

  /**
   * Empties the complete cart
   */
  clearCart() {
    this.items = [];
    this.saveCart();
    this.showToast("Order list cleared", "info");
  }

  /**
   * Total number of items in the cart
   */
  getTotalCount() {
    if (!Array.isArray(this.items)) return 0;
    return this.items.reduce((total, item) => {
      const q = parseInt(item.quantity, 10) || 0;
      return total + Math.max(0, q);
    }, 0);
  }

  /**
   * Total monetary subtotal in INR
   */
  getSubtotal() {
    if (!Array.isArray(this.items)) return 0;
    return this.items.reduce((total, item) => {
      const q = parseInt(item.quantity, 10) || 0;
      const p = Number(item.price) || 0;
      return total + (p * Math.max(0, q));
    }, 0);
  }

  /**
   * Updates all badges and mobile sticky pills across the page immediately
   */
  updateCartBadge() {
    const totalCount = this.getTotalCount();
    const subtotal = this.getSubtotal();

    // Header and button badges
    const badges = document.querySelectorAll(".cart-badge, .cart-counter-badge, .cart-counter-pill");
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
        if (sumEl) sumEl.textContent = `₹${subtotal}`;
      } else {
        mobileBar.classList.remove("visible");
      }
    }
  }

  /**
   * Opens the slide-out cart drawer
   */
  openDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    if (drawer) {
      this.renderCartUI();
      drawer.classList.add("active");
      if (overlay) overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  /**
   * Closes the slide-out cart drawer
   */
  closeDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    if (drawer) {
      drawer.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  /**
   * Renders the itemized list, empty state, quantities, and totals inside the drawer
   */
  renderCartUI() {
    const container = document.getElementById("cartDrawerItems");
    const emptyState = document.getElementById("cartEmptyState");
    const footer = document.getElementById("cartDrawerFooter");
    const subtotalEl = document.getElementById("cartSubtotalPrice");
    const totalCountEl = document.getElementById("cartTotalItemsCount");
    const totalPriceEl = document.getElementById("cartDrawerTotalPrice");

    if (!container) return;

    if (!this.items || this.items.length === 0) {
      container.innerHTML = "";
      if (emptyState) emptyState.style.display = "block";
      if (footer) footer.style.display = "none";
      if (totalCountEl) totalCountEl.textContent = "0 items";
      if (subtotalEl) subtotalEl.textContent = "₹0";
      if (totalPriceEl) totalPriceEl.textContent = "₹0";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (footer) footer.style.display = "block";

    const totalCount = this.getTotalCount();
    if (totalCountEl) totalCountEl.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'}`;

    const subtotal = this.getSubtotal();
    if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
    if (totalPriceEl) totalPriceEl.textContent = `₹${subtotal}`;

    container.innerHTML = this.items.map(item => `
      <div class="cart-item-row" data-id="${item.id}">
        <div class="cart-item-left">
          <div class="cart-item-heading">${item.name}</div>
          <div class="cart-item-unit-price">₹${item.price} each</div>
          <div class="cart-item-qty-bar">
            <button type="button" class="cart-qty-btn cart-qty-minus" onclick="window.cartApp.updateQuantity('${item.id}', -1)" aria-label="Decrease quantity" ${item.quantity <= 1 ? 'disabled style="opacity: 0.35; cursor: not-allowed;"' : ''}>−</button>
            <span class="cart-qty-count">${item.quantity}</span>
            <button type="button" class="cart-qty-btn cart-qty-plus" onclick="window.cartApp.updateQuantity('${item.id}', 1)" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="cart-item-right">
          <span class="cart-item-line-total">₹${item.price * item.quantity}</span>
          <button type="button" class="cart-item-delete" onclick="window.cartApp.removeItem('${item.id}')" aria-label="Remove ${item.name} from order">Remove</button>
        </div>
      </div>
    `).join("");
  }

  /**
   * Displays temporary toast feedback message
   */
  showToast(message, type = "success") {
    if (typeof document === "undefined" || !document.body) return;

    let toast = document.getElementById("cartToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "cartToast";
      toast.className = "cart-toast";
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = `cart-toast ${type} show`;

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }

  /**
   * Attaches click handlers and storage sync listeners
   */
  initListeners() {
    const setup = () => {
      // Re-validate loaded cart once DOM and menu data are completely ready
      this.items = this.validateCart(this.items);
      this.updateCartBadge();
      this.renderCartUI();

      // Event delegation for opening the cart drawer
      document.addEventListener("click", (e) => {
        const trigger = e.target.closest(".cart-drawer-trigger");
        if (trigger) {
          e.preventDefault();
          this.openDrawer();
          return;
        }

        // Close drawer triggers: close button or overlay
        if (e.target.closest("#closeCartDrawer") || e.target.id === "cartOverlay") {
          e.preventDefault();
          this.closeDrawer();
          return;
        }

        // Clear cart button
        if (e.target.closest("#clearCartBtn")) {
          e.preventDefault();
          if (confirm("Are you sure you want to clear your current order bag?")) {
            this.clearCart();
          }
        }
      });

      // Escape key closes cart drawer
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.closeDrawer();
        }
      });

      // Cross-tab synchronization via storage event
      if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
        window.addEventListener("storage", (e) => {
          if (e.key === CART_STORAGE_KEY) {
            this.items = this.loadCart();
            this.updateCartBadge();
            this.renderCartUI();
          }
        });
      }
    };

    if (typeof document !== "undefined") {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setup);
      } else {
        setup();
      }
    }
  }
}

// Global Cart Instance
if (typeof window !== "undefined") {
  window.cartApp = new CartManager();
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CartManager, CART_STORAGE_KEY };
}
