# Ashirvad Veg — Official Website & Digital Menu

Complete, modern, production-ready website for **Ashirvad Veg**, a South Indian Pure Vegetarian restaurant located in Marathahalli, Bengaluru.

## Business Details

- **Business Name:** Ashirvad Veg
- **Cuisine:** South Indian & Udupi Vegetarian (Tiffins, Dosas, Meals, Bajjis, Chats)
- **Address:** No. 3/76, Ground Floor, Outer Ring Road, Opp. Kala Mandir, Marathahalli, Bangalore – 560037
- **Phone:** +91 8971583654
- **WhatsApp Orders:** +91 8971583654
- **Alternate Phone:** +91 9973240035
- **Opening Hours:** 6:30 AM – 10:30 PM (All 7 Days)

---

## Technology Stack

- **HTML5** (Semantic structure, LocalBusiness Schema.org SEO markup, OpenGraph tags)
- **CSS3** (Responsive design, custom properties, warm cream & temple green visual palette)
- **Vanilla JavaScript** (Zero frameworks, zero dependencies, lightning-fast performance)
- **Deployment:** Vercel ready (`vercel.json` included, $0 hosting cost)

---

## Key Features

1. **Complete 11-Category Digital Menu (`menu.html`)**:
   - Hot Beverages (Special Filter Coffee, Masala Tea, Badam Milk, etc.)
   - Sweet Items (Kesari Bath, Gulab Jamun, Gajar Halwa, Holige, etc.)
   - Tiffins (Idli Vada Combo, Steamed Idli, Chow Chow Bath, Poori Saagu, etc.)
   - Meals & Rice (South Indian Meals Thali, Bisi Bele Bath, Curd Rice, Vangi Bath, etc.)
   - Dosa (Masala Dosa, Pure Ghee Dosa, Open Butter Dosa, Rava Onion Dosa, Podi Dosa, etc.)
   - Bajji Items (Mirchi Bajji, Mangalore Bajji, Onion Pakoda, Capsicum Bajji, etc.)
   - Soup (Cream of Tomato, Sweet Corn, Hot & Sour, Manchow)
   - Roti Items (Akki Roti, Ragi Roti, Chapati Kurma, Butter Tandoori Roti, Naan)
   - North Meals (Executive Thali, Paneer Butter Masala Combo, Dal Makhani Combo)
   - Chats (Pani Puri, Masala Puri, Sev Puri, Dahi Puri, Bhel Puri, Samosa Chaat)
   - Extra (Extra Sambar, Chutney, Fresh Butter/Ghee, Curd, Papad)

2. **Instant Live Search & Category Filtering**:
   - Real-time search by dish name, category, or description.
   - Smooth category switching with item counts.

3. **Vanilla JS Shopping Cart (`js/cart.js`)**:
   - Add to cart, quantity adjust (+/-), item removal.
   - Subtotal calculations.
   - Persistent across browser sessions using `localStorage`.
   - Slide-over mobile-friendly drawer.
   - Floating sticky cart bar for mobile users.

4. **Direct WhatsApp Ordering System (`js/whatsapp.js`)**:
   - Sends formatted, structured order dispatch directly to **+91 8971583654**.
   - Includes itemized order, quantities, rates, subtotal, customer details, and order type (Takeaway / Dine-in / Delivery).
   - Clear parcel & packaging note without artificial markup.

5. **Local SEO & Accessibility**:
   - Structured JSON-LD metadata for Google search (`schema.org/Restaurant`).
   - Click-to-call direct links.
   - Google Maps location embed for Marathahalli Opp. Kala Mandir.

---

## File Structure

```
Ashirvad-Veg/
├── index.html            # Homepage (Hero, highlights, popular dishes, category preview, directions)
├── menu.html             # Digital Menu (11 categories, live search, cart drawer)
├── about.html            # Our Story, Udupi heritage, hygiene standards & quality pillars
├── contact.html          # Contact info, Google Maps directions, inquiry form
├── vercel.json           # Vercel deployment configuration
├── css/
│   ├── style.css         # Master theme, typography, buttons, cart drawer, footer
│   ├── menu.css          # Digital menu pills, food cards, live search box
│   └── responsive.css    # Mobile, tablet, and desktop breakpoints
├── js/
│   ├── image-data.js     # Centralized photography registry (All hero, dish & gallery images)
│   ├── menu-data.js      # Centralized menu data (single source of truth)
│   ├── cart.js           # Shopping cart manager & LocalStorage persistence
│   ├── whatsapp.js       # WhatsApp URL-encoded order message generator
│   └── app.js            # UI interactions, sticky header, search filter
└── assets/
    ├── images/           # Local image assets
    └── icons/            # SVG icons
```

---

## Instructions for Restaurant Owner

### 1. Replacing Photographs with Cloudinary (Super Easy)
All website images (hero, dosas, idli-vada, meals, chats, beverages, and restaurant interior gallery) are centralized in a single file: **`js/image-data.js`**.

When your official photographs are uploaded to your Cloudinary account:
1. Open `js/image-data.js`.
2. Find the relevant image key (e.g., `hero`, `idliVada`, `dosas.masalaDosa`, `gallery`).
3. Replace the `url` property with your Cloudinary URL:
   ```javascript
   hero: {
     id: "hero-masala-dosa",
     url: "https://res.cloudinary.com/<your-cloud-name>/image/upload/f_auto,q_auto,w_1000/masala-dosa.jpg",
     alt: "Crispy golden Masala Dosa with fresh chutneys and sambar",
     title: "Crispy Masala Dosa"
   }
   ```
4. **All pages update automatically!** You do not need to hunt through HTML files.

### 2. Updating Menu Items & Prices
Open `js/menu-data.js`. All items are neatly grouped by category. To change a price or dish name:
```javascript
{
  id: "masala-dosa",
  name: "Crispy Masala Dosa",
  category: "dosa",
  price: 75, // Change price here
  description: "...",
  available: true
}
```

### 3. Deploying to Vercel (100% Free)
1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select this repository and click **Deploy**.
4. Your website is instantly live with free SSL!
