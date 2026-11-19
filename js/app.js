/**
 * Ashirvad Veg - Main Application Logic
 * Editorial Restaurant Layout Interactions & Menu Render Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileNavigation();
  initOrderTypeToggle();
  initMenuPage();
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
              <article class="menu-row-item" id="item-${item.id}">
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
                  <button type="button" class="btn-menu-add" onclick="window.cartApp.addItem('${item.id}', 1)" aria-label="Add ${item.name} to order">
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
      if (typeof window.closeMobileMenu === "function") {
        window.closeMobileMenu();
      }
      if (window.cartApp && typeof window.cartApp.closeDrawer === "function") {
        window.cartApp.closeDrawer();
      }
    }
  });
}
