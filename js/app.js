/**
 * Ashirvad Veg - Main Application Logic
 * Editorial Restaurant Layout Interactions & Menu Render Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileNavigation();
  initOrderTypeToggle();
  initMenuPage();
  initProductQuickView();
  initKitchenCarousel();
  initQuickModals();
});

/**
 * Sticky Header Scroll State
 */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Drawer Toggle & Icon Morphing
 */
function initMobileNavigation() {
  const openBtn = document.getElementById("mobileMenuOpenBtn");
  const closeBtn = document.getElementById("closeNavDrawer");
  const navDrawer = document.getElementById("mobileNavDrawer");
  const scrim = document.getElementById("navBackdrop");
  const siteHeader = document.getElementById("siteHeader") || document.querySelector(".site-header");

  if (!openBtn || !navDrawer) return;

  const updateDrawerPosition = () => {
    if (siteHeader) {
      const rect = siteHeader.getBoundingClientRect();
      const topOffset = Math.max(0, Math.round(rect.bottom));
      navDrawer.style.top = `${topOffset}px`;
      navDrawer.style.height = `calc(100dvh - ${topOffset}px)`;
      if (scrim) {
        scrim.style.top = `${topOffset}px`;
      }
    }
  };

  const openMenu = () => {
    // Close order cart drawer if open
    if (window.cartApp && typeof window.cartApp.closeDrawer === "function") {
      window.cartApp.closeDrawer();
    }

    updateDrawerPosition();

    navDrawer.classList.add("active");
    if (scrim) scrim.classList.add("active");
    openBtn.classList.add("active");
    openBtn.setAttribute("aria-expanded", "true");
    openBtn.setAttribute("aria-label", "Close Navigation Menu");
    document.body.classList.add("mobile-nav-open");
  };

  const closeMenu = () => {
    navDrawer.classList.remove("active");
    if (scrim) scrim.classList.remove("active");
    openBtn.classList.remove("active");
    openBtn.setAttribute("aria-expanded", "false");
    openBtn.setAttribute("aria-label", "Open Navigation Menu");
    document.body.classList.remove("mobile-nav-open");

    // Clean up dynamic coordinates after slide-out transition
    setTimeout(() => {
      if (!navDrawer.classList.contains("active")) {
        navDrawer.style.top = "";
        navDrawer.style.height = "";
        if (scrim) scrim.style.top = "";
      }
    }, 320);
  };

  const toggleMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (navDrawer.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Toggle on hamburger button click / tap
  openBtn.addEventListener("click", toggleMenu);

  // Close on inner close button
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
    });
  }

  // Close on scrim / backdrop click
  if (scrim) {
    scrim.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
    });
  }

  // Close when clicking any nav link inside drawer
  const drawerLinks = navDrawer.querySelectorAll(".mobile-nav-link, a, button:not(#closeNavDrawer)");
  drawerLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Expose global closer for cart / escape handlers
  window.closeMobileMenu = closeMenu;

  // Auto-close on resize to desktop width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 991 && navDrawer.classList.contains("active")) {
      closeMenu();
    } else if (navDrawer.classList.contains("active")) {
      updateDrawerPosition();
    }
  }, { passive: true });
}

/**
 * Order Type Toggle in Cart Drawer (show/hide address field)
 */
function initOrderTypeToggle() {
  const orderTypeSelect = document.getElementById("orderTypeSelect");
  const deliveryAddressGroup = document.getElementById("deliveryAddressGroup");

  if (orderTypeSelect && deliveryAddressGroup) {
    const checkVisibility = () => {
      if (orderTypeSelect.value === "delivery") {
        deliveryAddressGroup.style.display = "block";
      } else {
        deliveryAddressGroup.style.display = "none";
      }
    };

    orderTypeSelect.addEventListener("change", checkVisibility);
    checkVisibility();
  }

  // Cart page order type toggle
  const cartPageOrderTypeSelect = document.getElementById("cartPageOrderTypeSelect");
  const cartPageDeliveryAddressGroup = document.getElementById("cartPageDeliveryAddressGroup");

  if (cartPageOrderTypeSelect && cartPageDeliveryAddressGroup) {
    const checkPageVisibility = () => {
      if (cartPageOrderTypeSelect.value === "delivery") {
        cartPageDeliveryAddressGroup.style.display = "block";
      } else {
        cartPageDeliveryAddressGroup.style.display = "none";
      }
    };

    cartPageOrderTypeSelect.addEventListener("change", checkPageVisibility);
    checkPageVisibility();
  }
}

/**
 * Digital Menu Page: Tabular Restaurant Menu Renderer
 */
function initMenuPage() {
  const menuContainer = document.getElementById("menuSectionsContainer");
  if (!menuContainer || typeof MENU_ITEMS === "undefined" || typeof MENU_CATEGORIES === "undefined") return;

  let currentCategory = "all";
  let searchQuery = "";

  const categoryTabs = document.querySelectorAll(".menu-tab-btn");
  const searchInput = document.getElementById("menuSearchInput");
  const clearSearchBtn = document.getElementById("clearSearchInputBtn");

  // Check URL query params for initial category (e.g., menu.html?category=dosa)
  const urlParams = new URLSearchParams(window.location.search);
  const initialCat = urlParams.get("category");
  if (initialCat) {
    currentCategory = initialCat;
    categoryTabs.forEach(tab => {
      if (tab.dataset.category === initialCat) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  }

  const renderMenu = () => {
    let filtered = MENU_ITEMS;

    // Filter by Search Query
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }

    // Filter by Category
    if (currentCategory !== "all") {
      filtered = filtered.filter(item => item.category === currentCategory);
    }

    if (filtered.length === 0) {
      menuContainer.innerHTML = `
        <div class="menu-empty-filter">
          <h3>No dishes found</h3>
          <p>We couldn't find any items matching "${searchQuery}".</p>
          <button type="button" class="btn-outline" onclick="window.resetMenuFilters()">View Entire Menu</button>
        </div>
      `;
      return;
    }

    // Group items by category for classic restaurant presentation
    const activeCategories = currentCategory === "all"
      ? MENU_CATEGORIES
      : MENU_CATEGORIES.filter(c => c.id === currentCategory);

    let html = "";

    activeCategories.forEach(cat => {
      const catItems = filtered.filter(item => item.category === cat.id);
      if (catItems.length === 0) return;

      html += `
        <section class="menu-category-section" id="cat-${cat.id}">
          <header class="menu-section-header">
            <h2 class="menu-section-heading">${cat.name}</h2>
            <span class="menu-section-count">${catItems.length} ${catItems.length === 1 ? 'item' : 'items'}</span>
          </header>

          <div class="menu-items-table">
            ${catItems.map(item => `
              <article class="menu-row-item" id="item-${item.id}" data-item-id="${item.id}" tabindex="0" role="button" aria-label="View details for ${item.name}">
                <div class="menu-row-thumb">
                  <img src="${item.image}" alt="${item.name} at Ashirvad Veg" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80';">
                </div>
                <div class="menu-row-left">
                  <div class="menu-row-header">
                    <span class="veg-indicator" title="100% Vegetarian"></span>
                    <h3 class="menu-item-name">${item.name}</h3>
                    ${item.isPopular ? '<span class="menu-item-tag popular">House Special</span>' : ''}
                  </div>
                  <p class="menu-item-description">${item.description}</p>
                </div>
                <div class="menu-row-right">
                  <span class="menu-item-price">₹${item.price}</span>
                  <button type="button" class="btn-menu-add" onclick="event.stopPropagation(); window.cartApp.addItem('${item.id}', 1)" aria-label="Add ${item.name} to order">
                    + Add
                  </button>
                </div>
              </article>
            `).join("")}
          </div>
        </section>
      `;
    });

    menuContainer.innerHTML = html;
  };

  window.resetMenuFilters = () => {
    currentCategory = "all";
    searchQuery = "";
    if (searchInput) searchInput.value = "";
    if (clearSearchBtn) clearSearchBtn.style.display = "none";
    categoryTabs.forEach(t => {
      if (t.dataset.category === "all") t.classList.add("active");
      else t.classList.remove("active");
    });
    renderMenu();
  };

  // Category Tab Clicks
  categoryTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      categoryTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentCategory = tab.dataset.category;
      renderMenu();

      // Scroll smoothly to top of menu
      const offsetTop = menuContainer.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    });
  });

  // Search Input Handler
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchQuery.length > 0 ? "block" : "none";
      }
      renderMenu();
    });

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        clearSearchBtn.style.display = "none";
        renderMenu();
        searchInput.focus();
      });
    }
  }

  // Initial render
  renderMenu();
}

/**
 * Global Keyboard & Modal Escapes
 */
function initQuickModals() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (typeof window.closeProductQuickView === "function") {
        window.closeProductQuickView();
      }
      if (typeof window.closeMobileMenu === "function") {
        window.closeMobileMenu();
      }
      if (window.cartApp && typeof window.cartApp.closeDrawer === "function") {
        window.cartApp.closeDrawer();
      }
    }
  });
}

/**
 * Product Quick View Modal Engine
 */
function initProductQuickView() {
  let modalScrim = document.getElementById("productModalScrim");

  // Dynamically inject modal container if not already in document
  if (!modalScrim) {
    const modalHtml = `
      <div class="product-modal-scrim" id="productModalScrim" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modalItemName">
        <div class="product-modal-card" id="productModalCard" role="document">
          <button type="button" class="product-modal-close" id="productModalCloseBtn" aria-label="Close product view">✕</button>
          
          <div class="product-modal-media">
            <img id="modalItemImage" src="" alt="" loading="lazy">
          </div>

          <div class="product-modal-details">
            <div class="product-modal-main-content">
              <div class="product-modal-category" id="modalItemCategory">Kitchen Special</div>
              <div class="product-modal-header">
                <span class="veg-indicator" title="100% Vegetarian"></span>
                <h2 class="product-modal-title" id="modalItemName">Item Name</h2>
                <span class="menu-item-tag popular" id="modalItemBadge" style="display: none;">House Special</span>
              </div>
              <div class="product-modal-price" id="modalItemPrice">₹0</div>
              <p class="product-modal-desc" id="modalItemDesc">Description</p>
            </div>
            
            <div class="product-modal-footer">
              <div class="product-modal-qty-picker" aria-label="Select quantity">
                <button type="button" class="modal-qty-btn" id="modalQtyMinus" aria-label="Decrease quantity">−</button>
                <span class="modal-qty-value" id="modalQtyVal">1</span>
                <button type="button" class="modal-qty-btn" id="modalQtyPlus" aria-label="Increase quantity">+</button>
              </div>
              <button type="button" class="btn-modal-add" id="modalAddToCartBtn" aria-label="Add item to cart">
                <span>Add to Cart</span>
                <span class="modal-btn-subtotal" id="modalBtnSubtotal">₹0</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
    modalScrim = document.getElementById("productModalScrim");
  }

  const modalImg = document.getElementById("modalItemImage");
  const modalCategory = document.getElementById("modalItemCategory");
  const modalTitle = document.getElementById("modalItemName");
  const modalBadge = document.getElementById("modalItemBadge");
  const modalPrice = document.getElementById("modalItemPrice");
  const modalDesc = document.getElementById("modalItemDesc");
  const modalQtyVal = document.getElementById("modalQtyVal");
  const modalBtnSubtotal = document.getElementById("modalBtnSubtotal");
  const closeBtn = document.getElementById("productModalCloseBtn");
  const minusBtn = document.getElementById("modalQtyMinus");
  const plusBtn = document.getElementById("modalQtyPlus");
  const addBtn = document.getElementById("modalAddToCartBtn");

  let currentItem = null;
  let currentQty = 1;

  const updateSubtotal = () => {
    if (!currentItem) return;
    if (modalQtyVal) modalQtyVal.textContent = currentQty;
    const subtotal = currentItem.price * currentQty;
    if (modalBtnSubtotal) modalBtnSubtotal.textContent = `₹${subtotal}`;
  };

  const openModal = (itemId) => {
    if (typeof getItemById !== "function") return;
    const item = getItemById(itemId);
    if (!item) return;

    currentItem = item;
    currentQty = 1;

    if (modalImg) {
      modalImg.src = item.image || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80";
      modalImg.alt = `${item.name} at Ashirvad Veg`;
      modalImg.onerror = () => {
        modalImg.onerror = null;
        modalImg.src = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80";
      };
    }

    if (modalCategory) {
      if (typeof MENU_CATEGORIES !== "undefined") {
        const cat = MENU_CATEGORIES.find(c => c.id === item.category);
        modalCategory.textContent = cat ? cat.name : "Ashirvad Special";
      } else {
        modalCategory.textContent = item.category || "Ashirvad Special";
      }
    }

    if (modalTitle) modalTitle.textContent = item.name;
    if (modalPrice) modalPrice.textContent = `₹${item.price}`;
    if (modalDesc) modalDesc.textContent = item.description || "Freshly cooked to order with authentic South Indian ingredients.";

    if (modalBadge) {
      if (item.isPopular) {
        modalBadge.style.display = "inline-block";
      } else {
        modalBadge.style.display = "none";
      }
    }

    updateSubtotal();

    if (modalScrim) {
      modalScrim.classList.add("active");
      modalScrim.setAttribute("aria-hidden", "false");
    }
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    if (modalScrim) {
      modalScrim.classList.remove("active");
      modalScrim.setAttribute("aria-hidden", "true");
    }
    document.body.classList.remove("modal-open");
    currentItem = null;
    currentQty = 1;
  };

  window.openProductQuickView = openModal;
  window.closeProductQuickView = closeModal;

  // Plus / Minus Quantity Handlers
  if (minusBtn) {
    minusBtn.addEventListener("click", () => {
      if (currentQty > 1) {
        currentQty -= 1;
        updateSubtotal();
      }
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener("click", () => {
      if (currentQty < 20) {
        currentQty += 1;
        updateSubtotal();
      }
    });
  }

  // Add to cart from modal
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      if (!currentItem) return;
      if (window.cartApp && typeof window.cartApp.addItem === "function") {
        window.cartApp.addItem(currentItem.id, currentQty);
      }
      closeModal();
    });
  }

  // Close button click
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Scrim background click (outside modal card)
  if (modalScrim) {
    modalScrim.addEventListener("click", (e) => {
      if (e.target === modalScrim) {
        closeModal();
      }
    });
  }

  // Delegated click handler on any element with data-item-id
  document.addEventListener("click", (e) => {
    // If click was on a button or link or input inside the item card, don't trigger modal
    if (e.target.closest("button, a, input, select, textarea")) return;

    const trigger = e.target.closest("[data-item-id]");
    if (trigger) {
      const itemId = trigger.getAttribute("data-item-id");
      if (itemId) {
        openModal(itemId);
      }
    }
  });

  // Delegated keyboard accessibility (Enter/Space on focused item card)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const activeEl = document.activeElement;
      if (activeEl && activeEl.hasAttribute("data-item-id") && !activeEl.closest("button, a")) {
        e.preventDefault();
        const itemId = activeEl.getAttribute("data-item-id");
        if (itemId) {
          openModal(itemId);
        }
      }
    }
  });
}

/**
 * Automatic Kitchen Preparation Carousel
 * Clean, seamless auto-slider (2.5s loop, mobile touch swipe, desktop auto-cycling)
 */
function initKitchenCarousel() {
  const carousel = document.getElementById("kitchenCarousel");
  const track = document.getElementById("kitchenCarouselTrack");
  if (!carousel || !track) return;

  const slides = Array.from(track.querySelectorAll(".kitchen-carousel-slide"));
  if (slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideTimer = null;
  let resumeTimeout = null;
  const slideIntervalMs = 2500; // 2.5 seconds

  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  let isSwiping = false;

  const updateSlidePosition = () => {
    const viewport = track.parentElement;
    if (!viewport) return;

    const viewportWidth = viewport.getBoundingClientRect().width;
    const isMobile = window.innerWidth <= 767;

    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.classList.add("active");
        slide.setAttribute("aria-hidden", "false");
      } else {
        slide.classList.remove("active");
        slide.setAttribute("aria-hidden", "true");
      }
    });

    if (isMobile) {
      // 100% pagination on mobile
      track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;
    } else {
      // Desktop centered slide with partial preview of adjacent items
      const activeSlide = slides[currentIndex];
      const slideWidth = activeSlide.getBoundingClientRect().width;
      const slideOffsetLeft = activeSlide.offsetLeft;
      // Center active slide inside viewport
      const targetOffset = slideOffsetLeft - ((viewportWidth - slideWidth) / 2);
      track.style.transform = `translate3d(-${targetOffset}px, 0, 0)`;
    }
  };

  const goToSlide = (index) => {
    currentIndex = (index + totalSlides) % totalSlides;
    updateSlidePosition();
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - 1);
  };

  // Accessibility: Respect user reduced-motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const startTimer = () => {
    if (prefersReducedMotion) return;
    stopTimer();
    autoSlideTimer = setInterval(() => {
      nextSlide();
    }, slideIntervalMs);
  };

  const stopTimer = () => {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
    if (resumeTimeout) {
      clearTimeout(resumeTimeout);
      resumeTimeout = null;
    }
  };

  const restartTimerAfterPause = (pauseMs = 2500) => {
    stopTimer();
    if (prefersReducedMotion) return;
    resumeTimeout = setTimeout(() => {
      startTimer();
    }, pauseMs);
  };

  // Pause when page is hidden / user switches tabs
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopTimer();
    } else {
      startTimer();
    }
  });

  // Mobile Touch Swipe Handling
  carousel.addEventListener("touchstart", (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchEndX = touchStartX;
      touchEndY = touchStartY;
      isSwiping = true;
      stopTimer();
    }
  }, { passive: true });

  carousel.addEventListener("touchmove", (e) => {
    if (!isSwiping || !e.touches || e.touches.length === 0) return;
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;

    const diffX = Math.abs(touchEndX - touchStartX);
    const diffY = Math.abs(touchEndY - touchStartY);

    // Prevent accidental page scrolling interference while swiping horizontally
    if (diffX > diffY && diffX > 8) {
      if (e.cancelable) {
        e.preventDefault();
      }
    }
  }, { passive: false });

  carousel.addEventListener("touchend", () => {
    if (!isSwiping) return;
    isSwiping = false;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Detect valid horizontal swipe gesture
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      // After manual swipe, continue automatic sliding after a short pause
      restartTimerAfterPause(2500);
    } else {
      // No significant swipe, resume immediately
      startTimer();
    }
  }, { passive: true });

  carousel.addEventListener("touchcancel", () => {
    isSwiping = false;
    startTimer();
  }, { passive: true });

  // Recalculate position on window resize
  window.addEventListener("resize", () => {
    updateSlidePosition();
  }, { passive: true });

  // Initial display & start continuous auto-sliding
  updateSlidePosition();
  startTimer();
}
