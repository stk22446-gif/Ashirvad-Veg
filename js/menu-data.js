/**
 * Ashirvad Veg - Centralised Menu Data
 * Address: No. 3/76, Ground Floor, Outer Ring Road, Opp. Kala Mandir, Marathahalli, Bangalore – 560037
 * Phone & WhatsApp: 8971583654 | Alternate: 9973240035
 * Hours: 6:30 AM – 10:30 PM (All 7 Days)
 * 
 * NOTE: All images are centralized in `js/image-data.js`.
 * To update any food or interior photograph with your official Cloudinary URL,
 * simply edit `js/image-data.js`.
 */

// Helper to pull centralized photo URL or fallback safely
function resolveItemPhoto(path, fallbackUrl) {
  if (typeof RESTAURANT_IMAGES !== "undefined") {
    const keys = path.split(".");
    let curr = RESTAURANT_IMAGES;
    for (const k of keys) {
      if (curr && curr[k]) curr = curr[k];
      else { curr = null; break; }
    }
    if (curr) {
      return typeof curr === "string" ? curr : (curr.url || fallbackUrl);
    }
  }
  return fallbackUrl;
}

const MENU_CATEGORIES = [
  { id: "hot-beverages", name: "Hot Beverages", icon: "☕", count: 7 },
  { id: "sweet-items", name: "Sweet Items", icon: "🍬", count: 6 },
  { id: "tiffins", name: "Tiffins", icon: "🍲", count: 10 },
  { id: "meals-rice", name: "Meals & Rice", icon: "🍛", count: 8 },
  { id: "dosa", name: "Dosa", icon: "🥞", count: 11 },
  { id: "bajji-items", name: "Bajji Items", icon: "🧆", count: 6 },
  { id: "soup", name: "Soup", icon: "🥣", count: 4 },
  { id: "roti-items", name: "Roti Items", icon: "🫓", count: 6 },
  { id: "north-meals", name: "North Meals", icon: "🍱", count: 5 },
  { id: "chats", name: "Chats", icon: "🥗", count: 8 },
  { id: "extra", name: "Extra", icon: "🥣", count: 6 }
];

const MENU_ITEMS = [
  // ==========================================
  // 1. HOT BEVERAGES
  // ==========================================
  {
    id: "filter-coffee",
    name: "Special Filter Coffee",
    category: "hot-beverages",
    price: 25,
    image: resolveItemPhoto("beverages.filterCoffee.url", "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"),
    description: "Authentic South Indian degree filter coffee brewed with freshly ground chicory blend and frothy whole milk in a traditional brass tumbler.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "masala-tea",
    name: "Masala Tea",
    category: "hot-beverages",
    price: 25,
    image: resolveItemPhoto("beverages.masalaTea.url", "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80"),
    description: "Freshly brewed Indian tea infused with crushed green cardamom, fresh ginger root, and aromatic whole spices.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "regular-tea",
    name: "Normal Tea",
    category: "hot-beverages",
    price: 20,
    image: resolveItemPhoto("beverages.masalaTea.url", "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"),
    description: "Classic Indian milk tea brewed strong and sweetened just right.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "badam-milk-hot",
    name: "Hot Badam Milk",
    category: "hot-beverages",
    price: 35,
    image: resolveItemPhoto("beverages.hotBadamMilk.url", "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80"),
    description: "Rich creamy milk simmered with crushed almonds, Kashmiri saffron strands, and fragrant green cardamom.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "boost-horlicks",
    name: "Boost / Horlicks",
    category: "hot-beverages",
    price: 30,
    image: resolveItemPhoto("beverages.filterCoffee.url", "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80"),
    description: "Steaming hot malted milk beverage of your choice (Boost or Horlicks).",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "lemon-tea",
    name: "Lemon Tea",
    category: "hot-beverages",
    price: 25,
    image: resolveItemPhoto("beverages.masalaTea.url", "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"),
    description: "Refreshing black tea infused with fresh citrus lemon and a touch of honey/mint.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "green-tea",
    name: "Green Tea",
    category: "hot-beverages",
    price: 30,
    image: resolveItemPhoto("beverages.masalaTea.url", "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=600&q=80"),
    description: "Warm, antioxidant-rich light brewed herbal green tea.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },

  // ==========================================
  // 2. SWEET ITEMS
  // ==========================================
  {
    id: "kesari-bath",
    name: "Special Kesari Bath",
    category: "sweet-items",
    price: 45,
    image: resolveItemPhoto("sweets.kesariBath.url", "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"),
    description: "Silky golden semolina dessert roasted in pure desi ghee, garnished with plump raisins and roasted cashew nuts.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "gulab-jamun",
    name: "Gulab Jamun (2 Pcs)",
    category: "sweet-items",
    price: 50,
    image: resolveItemPhoto("sweets.gulabJamun.url", "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80"),
    description: "Melt-in-mouth milk solid dumplings fried to perfection and soaked in rose-cardamom sugar syrup.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "carrot-halwa",
    name: "Gajar / Carrot Halwa",
    category: "sweet-items",
    price: 60,
    image: resolveItemPhoto("sweets.carrotHalwa.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Slow-cooked grated Delhi carrots in reduced whole milk, pure cow ghee, and roasted cashews.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: true
  },
  {
    id: "rasgulla",
    name: "Rasgulla (2 Pcs)",
    category: "sweet-items",
    price: 50,
    image: resolveItemPhoto("sweets.gulabJamun.url", "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80"),
    description: "Spongy, soft cottage cheese spheres steeped in light cardamom-infused sugar syrup.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "obbattu-holige",
    name: "Holige / Obbattu (1 Pc)",
    category: "sweet-items",
    price: 35,
    image: resolveItemPhoto("sweets.kesariBath.url", "https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=600&q=80"),
    description: "Traditional Karnataka sweet flatbread filled with sweet chana dal & jaggery paste, served warm with ghee.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: true
  },
  {
    id: "mysore-pak",
    name: "Special Ghee Mysore Pak",
    category: "sweet-items",
    price: 55,
    image: resolveItemPhoto("sweets.kesariBath.url", "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80"),
    description: "Royal South Indian sweet prepared with gram flour, generous pure ghee, and crystal sugar.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: true
  },

  // ==========================================
  // 3. TIFFINS
  // ==========================================
  {
    id: "idli-vada-combo",
    name: "Idli Vada Combo (1+1)",
    category: "tiffins",
    price: 65,
    image: resolveItemPhoto("idliVada.url", "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"),
    description: "One pillow-soft steamed rice idli paired with one crispy medu vada, served with hot sambar and freshly ground coconut chutney.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "steamed-idli-pair",
    name: "Steamed Idli (2 Pcs)",
    category: "tiffins",
    price: 45,
    image: resolveItemPhoto("steamedIdli.url", "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"),
    description: "Pair of fluffy, naturally fermented steamed rice cakes served with authentic Karnataka sambar and coconut chutney.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "button-idli-sambar",
    name: "Mini Sambar Idli (14 Pcs)",
    category: "tiffins",
    price: 60,
    image: resolveItemPhoto("steamedIdli.url", "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"),
    description: "Bite-sized button idlis fully immersed in piping hot Udupi style lentil sambar, topped with pure ghee.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "crispy-medu-vada",
    name: "Crispy Medu Vada (1 Pc)",
    category: "tiffins",
    price: 35,
    image: resolveItemPhoto("meduVada.url", "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"),
    description: "Golden fried crispy urad dal fritter with a soft fluffy interior, infused with peppercorns, curry leaves & ginger.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "sambar-vada",
    name: "Sambar Vada (1 Pc)",
    category: "tiffins",
    price: 45,
    image: resolveItemPhoto("meduVada.url", "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"),
    description: "Crispy medu vada submerged in hot flavorful sambar, garnished with finely chopped onions and coriander.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "khara-bath-upma",
    name: "Khara Bath (Upma)",
    category: "tiffins",
    price: 45,
    image: resolveItemPhoto("chowChowBath.url", "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"),
    description: "Savory semolina preparation cooked with green chillies, curry leaves, ginger, mustard seeds, and fresh vegetables.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "chow-chow-bath",
    name: "Chow Chow Bath (Khara + Kesari)",
    category: "tiffins",
    price: 75,
    image: resolveItemPhoto("chowChowBath.url", "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"),
    description: "The classic Bengaluru twin delight: one scoop of spicy vegetable Khara Bath served alongside sweet aromatic Kesari Bath.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "poori-saagu",
    name: "Poori Saagu (3 Pcs)",
    category: "tiffins",
    price: 65,
    image: resolveItemPhoto("pooriSaagu.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Three puffed golden whole wheat puris served with authentic mild vegetable saagu and coconut chutney.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "poori-chana-masala",
    name: "Poori Chana Masala (3 Pcs)",
    category: "tiffins",
    price: 75,
    image: resolveItemPhoto("pooriSaagu.url", "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"),
    description: "Three hot puffed puris served with robust, tangy North Indian spiced chickpea chana gravy.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "set-dosa-tiffin",
    name: "Set Dosa (3 Pcs)",
    category: "tiffins",
    price: 65,
    image: resolveItemPhoto("dosas.plainDosa.url", "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"),
    description: "Trio of spongy, cloud-soft dosas served with creamy vegetable saagu and coconut chutney.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },

  // ==========================================
  // 4. MEALS & RICE
  // ==========================================
  {
    id: "south-indian-meals",
    name: "South Indian Special Meals (Thali)",
    category: "meals-rice",
    price: 110,
    image: resolveItemPhoto("southIndianMeals.thali.url", "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80"),
    description: "Complete wholesome South Indian meal: Steamed rice, sambar, rasam, palya (veg sabzi), curd, papad, pickle, and sweet.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "bisi-bele-bath",
    name: "Bisi Bele Bath with Boondi",
    category: "meals-rice",
    price: 65,
    image: resolveItemPhoto("southIndianMeals.bisiBeleBath.url", "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"),
    description: "Traditional spicy Karnataka rice and lentil porridge slow cooked with vegetables, tamarind, and desi ghee, topped with crispy boondi.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "vangi-bath",
    name: "Vangi Bath (Brinjal Rice)",
    category: "meals-rice",
    price: 60,
    image: resolveItemPhoto("southIndianMeals.vangiBath.url", "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80"),
    description: "Fragrant rice tossed with tender spiced brinjals and authentic homemade Vangi Bath masala powder.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "curd-rice",
    name: "Curd Rice (Mosaranna)",
    category: "meals-rice",
    price: 55,
    image: resolveItemPhoto("southIndianMeals.curdRice.url", "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"),
    description: "Cooling soft cooked rice blended with fresh creamy curd, tempered with mustard, green chillies, ginger, and curry leaves.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "veg-pulao",
    name: "Vegetable Pulao",
    category: "meals-rice",
    price: 70,
    image: resolveItemPhoto("southIndianMeals.vangiBath.url", "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"),
    description: "Aromatic long grain basmati rice delicately cooked with seasonal vegetables and whole garam spices, served with raitha.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "lemon-rice",
    name: "Chitranna (Lemon Rice)",
    category: "meals-rice",
    price: 55,
    image: resolveItemPhoto("southIndianMeals.vangiBath.url", "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"),
    description: "Classic turmeric rice infused with tangy fresh lemon juice, roasted peanuts, mustard seeds, and curry leaves.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "tomato-bath",
    name: "Tomato Bath",
    category: "meals-rice",
    price: 60,
    image: resolveItemPhoto("southIndianMeals.bisiBeleBath.url", "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"),
    description: "Zesty spiced rice cooked with ripe tomatoes, onions, garlic, and fresh mint leaves.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "jeera-rice-dal",
    name: "Jeera Rice with Dal Fry",
    category: "meals-rice",
    price: 85,
    image: resolveItemPhoto("northIndianMeals.dalMakhani.url", "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"),
    description: "Cumin tempered aromatic basmati rice paired with comforting yellow dal tadka.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },

  // ==========================================
  // 5. DOSA
  // ==========================================
  {
    id: "masala-dosa",
    name: "Crispy Masala Dosa",
    category: "dosa",
    price: 75,
    image: resolveItemPhoto("dosas.masalaDosa.url", "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"),
    description: "Signature Bengaluru style golden crispy crepe folded with spiced potato onion filling and red chutney glaze, served with sambar and coconut chutney.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "plain-dosa",
    name: "Plain Dosa",
    category: "dosa",
    price: 60,
    image: resolveItemPhoto("dosas.plainDosa.url", "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"),
    description: "Thin, crispy golden dosa roasted with a dab of butter/oil, served with chutneys and sambar.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "ghee-masala-dosa",
    name: "Pure Ghee Masala Dosa",
    category: "dosa",
    price: 90,
    image: resolveItemPhoto("dosas.gheePodiDosa.url", "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"),
    description: "Generously roasted in fragrant pure desi ghee till ultra crispy, filled with spiced potato aloo bhaji.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "open-butter-dosa",
    name: "Open Butter Masala Dosa",
    category: "dosa",
    price: 85,
    image: resolveItemPhoto("dosas.openButterDosa.url", "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"),
    description: "Thick, crispy open-faced dosa smeared with signature red garlic chutney, generously topped with butter and potato filling.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "cheese-masala-dosa",
    name: "Cheese Masala Dosa",
    category: "dosa",
    price: 95,
    image: resolveItemPhoto("dosas.cheeseDosa.url", "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"),
    description: "Crispy dosa layered with savoury potato masala and blanketed with freshly grated melted cheese.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "podi-masala-dosa",
    name: "Ghee Podi Masala Dosa",
    category: "dosa",
    price: 85,
    image: resolveItemPhoto("dosas.gheePodiDosa.url", "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"),
    description: "Dosa roasted crisp in pure ghee and dusted with fiery homemade gunpowder podi spice mix.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "onion-dosa",
    name: "Onion Dosa",
    category: "dosa",
    price: 75,
    image: resolveItemPhoto("dosas.plainDosa.url", "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"),
    description: "Crispy crepe topped with finely diced onions, green chillies, and fresh coriander cooked right into the batter.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "rava-plain-dosa",
    name: "Rava Plain Dosa",
    category: "dosa",
    price: 75,
    image: resolveItemPhoto("dosas.ravaDosa.url", "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"),
    description: "Lacy, netted semolina crepe delicately flavored with peppercorns, cumin, and ginger.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "rava-onion-dosa",
    name: "Rava Onion Dosa",
    category: "dosa",
    price: 85,
    image: resolveItemPhoto("dosas.ravaDosa.url", "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"),
    description: "Crispy netted rava dosa loaded with caramelised crunchy onions and green chillies.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "rava-masala-dosa",
    name: "Rava Onion Masala Dosa",
    category: "dosa",
    price: 95,
    image: resolveItemPhoto("dosas.ravaDosa.url", "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"),
    description: "Crisp golden netted rava dosa crowned with sautéed onions and stuffed with spiced potato masala.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "paneer-masala-dosa",
    name: "Paneer Masala Dosa",
    category: "dosa",
    price: 95,
    image: resolveItemPhoto("dosas.masalaDosa.url", "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"),
    description: "Dosa stuffed with seasoned crumbled cottage cheese (paneer) tossed with mild Indian spices.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },

  // ==========================================
  // 6. BAJJI ITEMS
  // ==========================================
  {
    id: "mirchi-bajji",
    name: "Mirchi Bajji (3 Pcs)",
    category: "bajji-items",
    price: 45,
    image: resolveItemPhoto("snacksAndChaats.mirchiBajji.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Plump green banana chillies dipped in seasoned gram flour batter and fried golden crisp, served with coconut chutney.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "mangalore-bajji",
    name: "Mangalore Bajji / Bonda (5 Pcs)",
    category: "bajji-items",
    price: 50,
    image: resolveItemPhoto("meduVada.url", "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"),
    description: "Authentic coastal Karnataka fluffy yogurt bondas with subtle coconut bits, ginger, and cumin.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "onion-pakoda",
    name: "Crispy Onion Pakoda",
    category: "bajji-items",
    price: 50,
    image: resolveItemPhoto("snacksAndChaats.onionPakoda.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Thinly sliced onions tossed with gram flour, carom seeds, and herbs, fried till wonderfully crunchy.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "raw-banana-bajji",
    name: "Balekayi / Raw Banana Bajji (3 Pcs)",
    category: "bajji-items",
    price: 45,
    image: resolveItemPhoto("snacksAndChaats.mirchiBajji.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Crispy fried slices of raw plantain encased in spiced chickpea batter.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "capsicum-bajji",
    name: "Capsicum Bajji (3 Pcs)",
    category: "bajji-items",
    price: 45,
    image: resolveItemPhoto("snacksAndChaats.mirchiBajji.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Crunchy bell pepper rings batter fried to golden crispness, served with zesty chutney.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "aloo-bonda",
    name: "Aloo Bonda (2 Pcs)",
    category: "bajji-items",
    price: 45,
    image: resolveItemPhoto("meduVada.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Spiced mashed potato balls enveloped in chickpea batter and deep fried to golden perfection.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },

  // ==========================================
  // 7. SOUP
  // ==========================================
  {
    id: "tomato-soup",
    name: "Cream of Tomato Soup",
    category: "soup",
    price: 60,
    image: resolveItemPhoto("southIndianMeals.bisiBeleBath.url", "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"),
    description: "Velvety soup made from ripe country tomatoes, herbs, fresh cream, and crunchy butter croutons.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "sweet-corn-veg-soup",
    name: "Sweet Corn Veg Soup",
    category: "soup",
    price: 65,
    image: resolveItemPhoto("southIndianMeals.bisiBeleBath.url", "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"),
    description: "Mild, comforting Chinese style vegetable broth brimming with tender sweet corn kernels and minced veggies.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "hot-and-sour-soup",
    name: "Hot & Sour Veg Soup",
    category: "soup",
    price: 65,
    image: resolveItemPhoto("southIndianMeals.bisiBeleBath.url", "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"),
    description: "Zesty Indo-Chinese soup balanced with fresh vinegar, black pepper, shredded carrots, cabbage, and mushrooms.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "veg-manchow-soup",
    name: "Veg Manchow Soup",
    category: "soup",
    price: 70,
    image: resolveItemPhoto("southIndianMeals.bisiBeleBath.url", "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"),
    description: "Spicy dark vegetable soup scented with garlic and coriander, topped with crispy fried noodles.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },

  // ==========================================
  // 8. ROTI ITEMS
  // ==========================================
  {
    id: "akki-roti",
    name: "Akki Roti (2 Pcs)",
    category: "roti-items",
    price: 65,
    image: resolveItemPhoto("dosas.plainDosa.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Traditional Karnataka rice flour flatbread kneaded with chopped onions, dill leaves, green chillies, and cumin, served with butter & chutney.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "ragi-roti",
    name: "Ragi Roti (2 Pcs)",
    category: "roti-items",
    price: 65,
    image: resolveItemPhoto("dosas.plainDosa.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Nutritious finger millet flatbread spiked with onions and curry leaves, roasted with a smear of ghee, served with spicy chutney.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "chapati-kurma",
    name: "Chapati with Veg Kurma (2 Pcs)",
    category: "roti-items",
    price: 60,
    image: resolveItemPhoto("northIndianMeals.paneerButterMasala.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Soft whole wheat chapatis served with flavorful, coconut-rich South Indian mixed vegetable kurma.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "tandoori-roti-butter",
    name: "Butter Tandoori Roti (2 Pcs)",
    category: "roti-items",
    price: 50,
    image: resolveItemPhoto("northIndianMeals.paneerButterMasala.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Oven-baked whole wheat roti brushed with pure melted butter.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "butter-naan",
    name: "Butter Naan (1 Pc)",
    category: "roti-items",
    price: 45,
    image: resolveItemPhoto("northIndianMeals.paneerButterMasala.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Soft and fluffy leavened refined flour bread baked in a clay tandoor and brushed with butter.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "parotta-kurma",
    name: "Malabar / Kerala Parotta (2 Pcs)",
    category: "roti-items",
    price: 65,
    image: resolveItemPhoto("pooriSaagu.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Flaky, layered golden flatbread served with spicy and aromatic vegetable kurma.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },

  // ==========================================
  // 9. NORTH MEALS
  // ==========================================
  {
    id: "north-indian-thali",
    name: "North Indian Special Executive Thali",
    category: "north-meals",
    price: 140,
    image: resolveItemPhoto("northIndianMeals.thali.url", "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80"),
    description: "Wholesome feast featuring 2 Butter Rotis or Naan, Paneer Butter Masala, Mixed Veg Sabzi, Dal Tadka, Jeera Rice, Sweet, Raita & Salad.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "paneer-butter-masala-combo",
    name: "Paneer Butter Masala Combo",
    category: "north-meals",
    price: 130,
    image: resolveItemPhoto("northIndianMeals.paneerButterMasala.url", "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"),
    description: "Creamy cottage cheese simmered in rich makhani gravy, paired with your choice of 2 Butter Rotis or Jeera Rice.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "dal-makhani-combo",
    name: "Dal Makhani Combo",
    category: "north-meals",
    price: 120,
    image: resolveItemPhoto("northIndianMeals.dalMakhani.url", "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"),
    description: "Slow-cooked black lentils with cream and butter, served with 2 Rotis or steamed basmati rice.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "chana-masala-combo",
    name: "Chole / Chana Masala Combo",
    category: "north-meals",
    price: 110,
    image: resolveItemPhoto("pooriSaagu.url", "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"),
    description: "Spicy Punjabi chickpeas gravy paired with 2 Rotis or Jeera Rice and onion salad.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "kaju-curry-combo",
    name: "Shahi Kaju Curry Combo",
    category: "north-meals",
    price: 150,
    image: resolveItemPhoto("northIndianMeals.paneerButterMasala.url", "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"),
    description: "Whole roasted cashew nuts in rich onion-tomato-cashew gravy, served with 2 Rotis and fresh salad.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: true
  },

  // ==========================================
  // 10. CHATS
  // ==========================================
  {
    id: "pani-puri",
    name: "Pani Puri (6 Pcs)",
    category: "chats",
    price: 40,
    image: resolveItemPhoto("snacksAndChaats.paniPuri.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Crispy hollow puris loaded with spiced potato-chickpea filling, submerged in tangy mint-coriander water and sweet tamarind sauce.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "masala-puri",
    name: "Bengaluru Masala Puri",
    category: "chats",
    price: 45,
    image: resolveItemPhoto("snacksAndChaats.masalaPuri.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Crushed crispy puris bathed in piping hot spiced green peas curry, topped with fresh onions, carrots, coriander, and fine sev.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "sev-puri",
    name: "Sev Puri (6 Pcs)",
    category: "chats",
    price: 45,
    image: resolveItemPhoto("snacksAndChaats.sevPuri.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Flat puris topped with diced potatoes, onions, trio of chutneys (sweet, mint, garlic), and mountains of crispy sev.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "dahi-puri",
    name: "Dahi Puri (6 Pcs)",
    category: "chats",
    price: 55,
    image: resolveItemPhoto("snacksAndChaats.dahiPuri.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Crisp puris filled with potato mash, sweetened chilled yogurt, tamarind chutney, and a sprinkle of chaat masala.",
    available: true,
    isPopular: true,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "bhel-puri",
    name: "Bhel Puri",
    category: "chats",
    price: 45,
    image: resolveItemPhoto("snacksAndChaats.sevPuri.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Puffed rice tossed with chopped tomatoes, onions, peanuts, sev, and sweet-spicy chutneys.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "samosa-chaat",
    name: "Samosa Masala Chaat",
    category: "chats",
    price: 55,
    image: resolveItemPhoto("snacksAndChaats.masalaPuri.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Crushed Punjabi potato samosa drenched in warm pea gravy, yogurt, sweet chutney, and crunchy sev.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "kachori-chaat",
    name: "Kachori Chaat",
    category: "chats",
    price: 55,
    image: resolveItemPhoto("snacksAndChaats.masalaPuri.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Flaky spiced dal kachori crushed and adorned with curd, tangy date-tamarind chutney, and fine sev.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "sukha-puri",
    name: "Sukha Puri (6 Pcs)",
    category: "chats",
    price: 35,
    image: resolveItemPhoto("snacksAndChaats.sevPuri.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Crispy puris filled with spiced potato and boondi, dusted with dry chaat masala and fresh coriander.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },

  // ==========================================
  // 11. EXTRA
  // ==========================================
  {
    id: "extra-sambar",
    name: "Extra Sambar (Bowl)",
    category: "extra",
    price: 20,
    image: resolveItemPhoto("southIndianMeals.bisiBeleBath.url", "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"),
    description: "Freshly prepared piping hot authentic Udupi style lentil sambar.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "extra-chutney",
    name: "Extra Chutney (Coconut / Red)",
    category: "extra",
    price: 15,
    image: resolveItemPhoto("idliVada.url", "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"),
    description: "Freshly ground fresh coconut or spicy red chili garlic chutney cup.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "extra-butter",
    name: "Extra Fresh White Butter / Desi Ghee",
    category: "extra",
    price: 20,
    image: resolveItemPhoto("dosas.openButterDosa.url", "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80"),
    description: "Dollop of fresh dairy butter or spoonful of fragrant melted desi ghee.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "cup-curd",
    name: "Cup of Fresh Curd",
    category: "extra",
    price: 20,
    image: resolveItemPhoto("southIndianMeals.curdRice.url", "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"),
    description: "Thick, creamy homemade dairy yogurt.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "fried-papad",
    name: "Roasted / Fried Papad (2 Pcs)",
    category: "extra",
    price: 15,
    image: resolveItemPhoto("southIndianMeals.thali.url", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"),
    description: "Crispy urad dal papad roasted or crisp-fried.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  },
  {
    id: "extra-raitha",
    name: "Vegetable Raitha",
    category: "extra",
    price: 25,
    image: resolveItemPhoto("southIndianMeals.curdRice.url", "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"),
    description: "Chilled yogurt mixed with finely diced cucumbers, onions, tomatoes, and roasted cumin.",
    available: true,
    isPopular: false,
    isVeg: true,
    needsVerification: false
  }
];

// Helper functions for menu manipulation
function getMenuByCategory(categoryId) {
  if (!categoryId || categoryId === "all") return MENU_ITEMS;
  return MENU_ITEMS.filter(item => item.category === categoryId);
}

function getPopularItems() {
  return MENU_ITEMS.filter(item => item.isPopular);
}

function getItemById(id) {
  return MENU_ITEMS.find(item => item.id === id);
}

function searchMenuItems(query) {
  if (!query) return MENU_ITEMS;
  const q = query.toLowerCase().trim();
  return MENU_ITEMS.filter(item => 
    item.name.toLowerCase().includes(q) || 
    item.description.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  );
}

// Global window and globalThis attachments
if (typeof window !== "undefined") {
  window.MENU_CATEGORIES = MENU_CATEGORIES;
  window.MENU_ITEMS = MENU_ITEMS;
  window.getMenuByCategory = getMenuByCategory;
  window.getPopularItems = getPopularItems;
  window.getItemById = getItemById;
  window.searchMenuItems = searchMenuItems;
}
if (typeof globalThis !== "undefined") {
  globalThis.MENU_CATEGORIES = MENU_CATEGORIES;
  globalThis.MENU_ITEMS = MENU_ITEMS;
  globalThis.getMenuByCategory = getMenuByCategory;
  globalThis.getPopularItems = getPopularItems;
  globalThis.getItemById = getItemById;
  globalThis.searchMenuItems = searchMenuItems;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    MENU_CATEGORIES,
    MENU_ITEMS,
    getMenuByCategory,
    getPopularItems,
    getItemById,
    searchMenuItems
  };
}
