/**
 * Ashirvad Veg - Shopping Cart Management
 * Clean, lightweight, professional order drawer with LocalStorage persistence.
 */

const CART_STORAGE_KEY = "ashirvad_veg_cart_v2";

class CartManager {
  constructor() {
    this.items = this.loadCart();
    this.currentStep = 1;
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
      this.renderCartPageUI();
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
    this.showToast(`Added ${item.name} to Cart`, "success");
    this.pulseCartBadge();
  }

  pulseCartBadge() {
    const badges = document.querySelectorAll(".btn-header-cart .cart-badge");
    badges.forEach(b => {
      b.classList.add("pulse");
      setTimeout(() => b.classList.remove("pulse"), 300);
    });
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
      badge.style.display = "inline-flex";
      if (totalCount > 0) {
        badge.classList.add("has-items");
      } else {
        badge.classList.remove("has-items");
      }
    });

    // Mobile sticky bar update
    const mobileBar = document.getElementById("mobileCartPill");
    if (mobileBar && typeof mobileBar.querySelector === "function") {
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
    window.location.href = "cart.html";
  }

  closeDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    if (drawer && overlay) {
      drawer.classList.remove("active");
      overlay.classList.remove("active");
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

  goToCheckout() {
    if (this.items.length === 0) {
      this.showToast("Your cart is empty. Please add delicious dishes first!", "error");
      return;
    }

    this.currentStep = 2;
    const stepReview = document.getElementById("cartStepReview");
    const stepCheckout = document.getElementById("cartStepCheckout");
    const node1 = document.getElementById("stepNode1");
    const node2 = document.getElementById("stepNode2");

    if (stepReview) stepReview.style.display = "none";
    if (stepCheckout) stepCheckout.style.display = "block";

    if (node1) {
      node1.classList.remove("active");
      node1.classList.add("completed");
    }
    if (node2) {
      node2.classList.add("active");
    }

    this.renderCheckoutMiniItems();
    this.updateFulfillmentSummary();

    if (window.location.hash !== "#checkout") {
      try {
        window.history.pushState({ step: 2 }, "", "#checkout");
      } catch (e) {
        window.location.hash = "#checkout";
      }
    }

    // Scroll smoothly to top of cart section
    const cartSec = document.getElementById("cartMainContainer") || document.querySelector(".cart-page-section");
    if (cartSec) {
      cartSec.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  goToCart() {
    this.currentStep = 1;
    const stepReview = document.getElementById("cartStepReview");
    const stepCheckout = document.getElementById("cartStepCheckout");
    const node1 = document.getElementById("stepNode1");
    const node2 = document.getElementById("stepNode2");

    if (stepReview) stepReview.style.display = "block";
    if (stepCheckout) stepCheckout.style.display = "none";

    if (node1) {
      node1.classList.remove("completed");
      node1.classList.add("active");
    }
    if (node2) {
      node2.classList.remove("active");
    }

    if (window.location.hash === "#checkout") {
      try {
        window.history.pushState({ step: 1 }, "", window.location.pathname);
      } catch (e) {
        window.location.hash = "";
      }
    }

    // Scroll smoothly to top of cart section
    const cartSec = document.getElementById("cartMainContainer") || document.querySelector(".cart-page-section");
    if (cartSec) {
      cartSec.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  handleOrderTypeChange(type) {
    const hiddenSelect = document.getElementById("cartPageOrderTypeSelect");
    if (hiddenSelect) hiddenSelect.value = type;

    // Check matching radio
    const radios = document.querySelectorAll('input[name="orderTypeChoice"]');
    radios.forEach(r => {
      r.checked = (r.value === type);
    });

    const dineinContainer = document.getElementById("dineinFieldsContainer");
    const deliveryContainer = document.getElementById("deliveryFieldsContainer");
    const takeawayContainer = document.getElementById("takeawayFieldsContainer");
    const legacyAddrGroup = document.getElementById("cartPageDeliveryAddressGroup");

    // Preserve special notes across containers if user switches
    const dineinNotes = document.getElementById("dineinSpecialNotes");
    const deliveryNotes = document.getElementById("deliverySpecialNotes");
    const takeawayNotes = document.getElementById("takeawaySpecialNotes");
    const generalNotes = document.getElementById("cartPageSpecialNotes");

    const activeNoteVal = (dineinNotes && dineinNotes.value) ||
                          (deliveryNotes && deliveryNotes.value) ||
                          (takeawayNotes && takeawayNotes.value) ||
                          (generalNotes && generalNotes.value) || "";

    if (activeNoteVal) {
      if (dineinNotes && !dineinNotes.value) dineinNotes.value = activeNoteVal;
      if (deliveryNotes && !deliveryNotes.value) deliveryNotes.value = activeNoteVal;
      if (takeawayNotes && !takeawayNotes.value) takeawayNotes.value = activeNoteVal;
      if (generalNotes && !generalNotes.value) generalNotes.value = activeNoteVal;
    }

    if (dineinContainer) {
      dineinContainer.style.display = (type === "dinein") ? "block" : "none";
      if (type === "dinein") {
        const dateInput = document.getElementById("dineinArrivalDate");
        if (dateInput && !dateInput.value) {
          const today = new Date().toISOString().split("T")[0];
          dateInput.value = today;
          dateInput.min = today;
        }
      }
    }

    if (deliveryContainer) {
      deliveryContainer.style.display = (type === "delivery") ? "block" : "none";
      if (type === "delivery") {
        const houseInput = document.getElementById("deliveryHouseNo");
        if (houseInput && !houseInput.value) houseInput.focus();
      }
    }

    if (takeawayContainer) {
      takeawayContainer.style.display = (type === "takeaway") ? "block" : "none";
    }

    if (legacyAddrGroup) {
      legacyAddrGroup.style.display = (type === "delivery") ? "block" : "none";
    }

    const noteEl = document.getElementById("checkoutPackagingNote");
    if (noteEl) {
      if (type === "dinein") {
        noteEl.textContent = "Dine-in (No parcel fee)";
      } else if (type === "delivery") {
        noteEl.textContent = "Packaging & delivery as per policy";
      } else {
        noteEl.textContent = "Standard parcel packing";
      }
    }

    this.updateFulfillmentSummary(type);
  }

  updateFulfillmentSummary(type) {
    if (!type) {
      const checked = document.querySelector('input[name="orderTypeChoice"]:checked');
      type = checked ? checked.value : "takeaway";
    }

    const tagEl = document.getElementById("fulfillmentSummaryTag");
    const descEl = document.getElementById("fulfillmentSummaryDesc");
    const detailEl = document.getElementById("fulfillmentSummaryDetail");

    if (!tagEl || !descEl || !detailEl) return;

    if (type === "dinein") {
      tagEl.innerHTML = `<span>🍽️</span><span>Dine-in Pre-order</span>`;
      descEl.textContent = "Food ready upon arrival at restaurant.";

      const dateVal = document.getElementById("dineinArrivalDate") ? document.getElementById("dineinArrivalDate").value : "";
      const timeVal = document.getElementById("dineinArrivalTime") ? document.getElementById("dineinArrivalTime").value : "";

      let dateDisplay = "Today";
      if (dateVal) {
        try {
          const d = new Date(dateVal + "T00:00:00");
          const todayStr = new Date().toISOString().split("T")[0];
          if (dateVal === todayStr) {
            dateDisplay = "Today";
          } else {
            dateDisplay = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
          }
        } catch (e) {
          dateDisplay = dateVal;
        }
      }

      if (timeVal) {
        detailEl.innerHTML = `<span>🕒 Arrival:</span> <strong>${dateDisplay} at ${timeVal}</strong>`;
      } else {
        detailEl.innerHTML = `<span>🕒 Arrival:</span> <em>Select preferred time (6:30 AM – 10:30 PM)</em>`;
      }

    } else if (type === "delivery") {
      tagEl.innerHTML = `<span>🛵</span><span>Local Delivery</span>`;
      descEl.textContent = "Delivered around Marathahalli area.";

      const areaVal = document.getElementById("deliveryAreaLocality") ? document.getElementById("deliveryAreaLocality").value.trim() : "";
      const pinVal = document.getElementById("deliveryPinCode") ? document.getElementById("deliveryPinCode").value.trim() : "";
      const landmarkVal = document.getElementById("deliveryLandmark") ? document.getElementById("deliveryLandmark").value.trim() : "";

      let locSummary = "";
      if (areaVal && pinVal) {
        locSummary = `${areaVal} – ${pinVal}`;
      } else if (areaVal) {
        locSummary = areaVal;
      } else {
        locSummary = "Marathahalli & nearby";
      }

      if (landmarkVal) {
        detailEl.innerHTML = `<span>📍 To:</span> <strong>${locSummary}</strong> <span style="font-size:0.75rem;opacity:0.8;">(Near ${landmarkVal})</span>`;
      } else {
        detailEl.innerHTML = `<span>📍 To:</span> <strong>${locSummary}</strong>`;
      }

    } else {
      tagEl.innerHTML = `<span>🥡</span><span>Takeaway / Parcel</span>`;
      descEl.textContent = "Pick up packed from Marathahalli kitchen (Opp. Kala Mandir).";
      detailEl.innerHTML = `<span>⚡ Status:</span> <strong>Ready in ~15-20 mins upon confirmation</strong>`;
    }
  }

  renderCheckoutMiniItems() {
    const container = document.getElementById("checkoutMiniItemsList");
    const subtotalEl = document.getElementById("checkoutSubtotal");
    const totalEl = document.getElementById("checkoutTotal");

    const subtotal = this.getSubtotal();
    if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
    if (totalEl) totalEl.textContent = `₹${subtotal}`;

    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `<div style="font-size: 0.85rem; color: var(--color-text-muted); padding: 8px 0;">No dishes in cart.</div>`;
      return;
    }

    container.innerHTML = this.items.map(item => `
      <div class="checkout-mini-item-row">
        <div class="mini-item-name-qty">
          <span class="mini-item-qty">${item.quantity}×</span>
          <span class="mini-item-name">${item.name}</span>
          <span class="mini-item-unit">(₹${item.price})</span>
        </div>
        <span class="mini-item-total">₹${item.price * item.quantity}</span>
      </div>
    `).join("");
  }

  renderCartPageUI() {
    const pageItemsContainer = document.getElementById("cartPageItemsContainer");
    const pageEmptyState = document.getElementById("cartPageEmptyState");
    const pageStepper = document.getElementById("cartStepper");
    const stepReview = document.getElementById("cartStepReview");
    const stepCheckout = document.getElementById("cartStepCheckout");
    const pageSubtotal = document.getElementById("cartPageSubtotal");
    const pageTotal = document.getElementById("cartPageTotal");
    const pageItemCount = document.getElementById("cartPageItemCount");

    if (!pageItemsContainer && !stepReview && !pageEmptyState) {
      return; // Not on cart.html
    }

    const totalCount = this.getTotalCount();
    const subtotal = this.getSubtotal();

    if (this.items.length === 0) {
      if (pageEmptyState) pageEmptyState.style.display = "block";
      if (pageStepper) pageStepper.style.display = "none";
      if (stepReview) stepReview.style.display = "none";
      if (stepCheckout) stepCheckout.style.display = "none";
      if (pageItemCount) pageItemCount.textContent = "0 items";
      if (pageSubtotal) pageSubtotal.textContent = "₹0";
      if (pageTotal) pageTotal.textContent = "₹0";
      if (pageItemsContainer) pageItemsContainer.innerHTML = "";
      this.currentStep = 1;
      return;
    }

    if (pageEmptyState) pageEmptyState.style.display = "none";
    if (pageStepper) pageStepper.style.display = "block";

    // Manage Step 1 vs Step 2 views
    const isCheckoutHash = (window.location.hash === "#checkout");
    if (isCheckoutHash || this.currentStep === 2) {
      this.currentStep = 2;
      if (stepReview) stepReview.style.display = "none";
      if (stepCheckout) stepCheckout.style.display = "block";
      const node1 = document.getElementById("stepNode1");
      const node2 = document.getElementById("stepNode2");
      if (node1) { node1.classList.remove("active"); node1.classList.add("completed"); }
      if (node2) { node2.classList.add("active"); }
    } else {
      this.currentStep = 1;
      if (stepReview) stepReview.style.display = "block";
      if (stepCheckout) stepCheckout.style.display = "none";
      const node1 = document.getElementById("stepNode1");
      const node2 = document.getElementById("stepNode2");
      if (node1) { node1.classList.remove("completed"); node1.classList.add("active"); }
      if (node2) { node2.classList.remove("active"); }
    }

    // Step 1 values
    if (pageItemCount) pageItemCount.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'}`;
    if (pageSubtotal) pageSubtotal.textContent = `₹${subtotal}`;
    if (pageTotal) pageTotal.textContent = `₹${subtotal}`;

    // Step 2 mini values
    this.renderCheckoutMiniItems();
    this.updateFulfillmentSummary();

    if (pageItemsContainer) {
      pageItemsContainer.innerHTML = this.items.map(item => {
        const menuItem = typeof getItemById === "function" ? getItemById(item.id) : null;
        const photoUrl = menuItem && menuItem.image ? menuItem.image : "";
        const categorySlug = (menuItem && menuItem.category) || item.category || "dishes";
        const categoryLabel = categorySlug.replace(/-/g, " ");

        const thumbHtml = photoUrl ? `
          <img src="${photoUrl}" alt="${item.name}" class="cart-page-item-thumb" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="cart-page-item-thumb-fallback" style="display:none;"><span class="veg-badge-dot"></span></div>
        ` : `
          <div class="cart-page-item-thumb-fallback"><span class="veg-badge-dot"></span></div>
        `;

        return `
          <div class="cart-page-item-row" data-id="${item.id}">
            <div class="cart-page-item-col-product">
              <div class="cart-page-thumb-wrap">
                ${thumbHtml}
              </div>
              <div class="cart-page-item-details">
                <div class="cart-page-item-veg">
                  <span class="veg-badge" title="100% Pure Vegetarian"><span class="veg-badge-dot"></span></span>
                  <span class="cart-page-cat-tag">${categoryLabel}</span>
                </div>
                <h3 class="cart-page-item-name">${item.name}</h3>
                <div class="cart-page-item-unit-price">₹${item.price} each</div>
              </div>
            </div>

            <div class="cart-page-item-col-price">
              <span class="cart-page-col-label">Price</span>
              <span class="cart-page-price-val">₹${item.price}</span>
            </div>

            <div class="cart-page-item-col-qty">
              <span class="cart-page-col-label">Quantity</span>
              <div class="cart-page-qty-control">
                <button type="button" class="cart-page-qty-btn" onclick="window.cartApp.updateQuantity('${item.id}', -1)" aria-label="Decrease ${item.name} quantity">−</button>
                <span class="cart-page-qty-val">${item.quantity}</span>
                <button type="button" class="cart-page-qty-btn" onclick="window.cartApp.updateQuantity('${item.id}', 1)" aria-label="Increase ${item.name} quantity">+</button>
              </div>
            </div>

            <div class="cart-page-item-col-total">
              <span class="cart-page-col-label">Total</span>
              <span class="cart-page-line-total">₹${item.price * item.quantity}</span>
            </div>

            <div class="cart-page-item-col-action">
              <button type="button" class="cart-page-remove-btn" onclick="window.cartApp.removeItem('${item.id}')" title="Remove from order" aria-label="Remove ${item.name}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                <span>Remove</span>
              </button>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  showToast(message, type = "success") {
    let toast = document.getElementById("cartToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "cartToast";
      toast.className = "cart-toast";
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <span class="toast-msg">${message}</span>
      <a href="cart.html" class="toast-link">View Cart &rarr;</a>
    `;
    toast.classList.add("show");

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  initListeners() {
    // Cross-tab synchronization via storage event
    window.addEventListener("storage", (e) => {
      if (e.key === CART_STORAGE_KEY) {
        this.items = this.loadCart();
        this.updateCartBadge();
        this.renderCartUI();
        this.renderCartPageUI();
      }
    });

    // Hash navigation for Step 1 vs Step 2 (Back / Forward buttons)
    window.addEventListener("hashchange", () => {
      if (document.getElementById("cartStepReview")) {
        if (window.location.hash === "#checkout" && this.items.length > 0) {
          this.goToCheckout();
        } else {
          this.goToCart();
        }
      }
    });

    document.addEventListener("DOMContentLoaded", () => {
      this.updateCartBadge();
      this.renderCartUI();
      this.renderCartPageUI();

      // Check initial hash on cart page
      if (window.location.hash === "#checkout" && this.items.length > 0) {
        this.goToCheckout();
      }

      // Initialize Dine-in date and live summary watchers
      const dineinDateInput = document.getElementById("dineinArrivalDate");
      if (dineinDateInput) {
        const todayStr = new Date().toISOString().split("T")[0];
        dineinDateInput.min = todayStr;
        if (!dineinDateInput.value) {
          dineinDateInput.value = todayStr;
        }
        dineinDateInput.addEventListener("change", () => this.updateFulfillmentSummary("dinein"));
      }

      const dineinTimeInput = document.getElementById("dineinArrivalTime");
      if (dineinTimeInput) {
        dineinTimeInput.addEventListener("change", () => this.updateFulfillmentSummary("dinein"));
      }

      const deliveryAreaInput = document.getElementById("deliveryAreaLocality");
      const deliveryPinInput = document.getElementById("deliveryPinCode");
      const deliveryLandmarkInput = document.getElementById("deliveryLandmark");
      [deliveryAreaInput, deliveryPinInput, deliveryLandmarkInput].forEach(inp => {
        if (inp) inp.addEventListener("input", () => this.updateFulfillmentSummary("delivery"));
      });

      const closeBtn = document.getElementById("closeCartDrawer");
      const overlay = document.getElementById("cartOverlay");

      if (closeBtn) closeBtn.addEventListener("click", () => this.closeDrawer());
      if (overlay) overlay.addEventListener("click", () => this.closeDrawer());

      const clearBtn = document.getElementById("clearCartBtn");
      if (clearBtn) {
        clearBtn.addEventListener("click", () => {
          if (confirm("Clear your current order list?")) {
            this.clearCart();
          }
        });
      }

      const pageClearBtn = document.getElementById("cartPageClearBtn");
      if (pageClearBtn) {
        pageClearBtn.addEventListener("click", () => {
          if (confirm("Are you sure you want to clear your entire order cart?")) {
            this.clearCart();
            this.showToast("Order cart cleared", "info");
          }
        });
      }
    });
  }
}

// Global Cart Instance
window.cartApp = new CartManager();
