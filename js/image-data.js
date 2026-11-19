/**
 * Ashirvad Veg - Centralised Photography Registry
 * 
 * INSTRUCTIONS FOR RESTAURANT OWNER & DEVELOPER:
 * Every single food item in the Daily Kitchen Menu has an explicit mapping here.
 * When official photographs are uploaded to Cloudinary:
 * 1. Open this file.
 * 2. Locate the dish id in MENU_ITEM_IMAGES.
 * 3. Replace the `url` with your Cloudinary URL, e.g.:
 *    "https://res.cloudinary.com/<your-cloud-name>/image/upload/f_auto,q_auto,w_500/masala_dosa.jpg"
 * 4. All pages will update immediately.
 */

const CLOUDINARY_CONFIG = {
  cloudName: "ashirvad-veg",
  baseUrl: "https://res.cloudinary.com/ashirvad-veg/image/upload/",
  defaultTransform: "f_auto,q_auto"
};

/**
 * Dedicated photographic mapping for all 77 menu items
 */
const MENU_ITEM_IMAGES = {
  // ==========================================
  // 1. HOT BEVERAGES (7 Items)
  // ==========================================
  "filter-coffee": {
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=85",
    alt: "Steaming hot authentic South Indian degree filter coffee in brass davara tumbler with frothy foam",
    title: "Special Degree Filter Coffee"
  },
  "masala-tea": {
    url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=85",
    alt: "Freshly brewed Indian masala milk tea infused with crushed ginger, green cardamom and cloves",
    title: "Masala Tea"
  },
  "regular-tea": {
    url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=85",
    alt: "Classic Indian morning milk tea brewed strong and served hot",
    title: "Normal Tea"
  },
  "badam-milk-hot": {
    url: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=85",
    alt: "Warm creamy badam milk simmered with crushed almonds, saffron strands and green cardamom",
    title: "Hot Badam Milk"
  },
  "boost-horlicks": {
    url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=85",
    alt: "Steaming hot malted milk beverage served in a ceramic cup",
    title: "Boost / Horlicks"
  },
  "lemon-tea": {
    url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=85",
    alt: "Clear refreshing black tea infused with fresh lemon slice and fresh mint leaves",
    title: "Lemon Tea"
  },
  "green-tea": {
    url: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=600&q=85",
    alt: "Warm antioxidant-rich herbal green tea steeped in a glass cup",
    title: "Green Tea"
  },

  // ==========================================
  // 2. SWEET ITEMS (6 Items)
  // ==========================================
  "kesari-bath": {
    url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=85",
    alt: "Golden semolina Kesari Bath roasted in pure cow ghee with cashews and raisins",
    title: "Special Kesari Bath"
  },
  "gulab-jamun": {
    url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=85",
    alt: "Pair of warm golden-brown fried khoya dumplings soaked in sweet rose-cardamom syrup",
    title: "Gulab Jamun (2 Pcs)"
  },
  "carrot-halwa": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Traditional Indian Gajar Halwa made from slow-cooked grated red carrots, whole milk and ghee",
    title: "Gajar / Carrot Halwa"
  },
  "rasgulla": {
    url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=85",
    alt: "Soft, spongy white cottage cheese rasgullas swimming in light cardamom syrup",
    title: "Rasgulla (2 Pcs)"
  },
  "obbattu-holige": {
    url: "https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=600&q=85",
    alt: "Warm golden Karnataka sweet flatbread filled with sweet chana dal and jaggery",
    title: "Holige / Obbattu (1 Pc)"
  },
  "mysore-pak": {
    url: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=85",
    alt: "Royal porous South Indian Mysore Pak prepared with gram flour and generous pure desi ghee",
    title: "Special Ghee Mysore Pak"
  },

  // ==========================================
  // 3. TIFFINS (10 Items)
  // ==========================================
  "idli-vada-combo": {
    url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=85",
    alt: "Pillow-soft steamed idli paired with crispy golden medu vada on a fresh banana leaf with chutneys and sambar",
    title: "Idli Vada Combo (1+1)"
  },
  "steamed-idli-pair": {
    url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=85",
    alt: "Pair of soft, naturally fermented steamed rice idlis served with Karnataka sambar and coconut chutney",
    title: "Steamed Idli (2 Pcs)"
  },
  "button-idli-sambar": {
    url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=85",
    alt: "Mini button idlis submerged in hot aromatic lentil sambar and topped with pure ghee",
    title: "Mini Sambar Idli (14 Pcs)"
  },
  "crispy-medu-vada": {
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=85",
    alt: "Crispy fried golden urad dal medu vada seasoned with cracked black pepper and curry leaves",
    title: "Crispy Medu Vada (1 Pc)"
  },
  "sambar-vada": {
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=85",
    alt: "Crisp medu vada soaked in hot vegetable sambar, topped with diced onions and fresh coriander",
    title: "Sambar Vada (1 Pc)"
  },
  "khara-bath-upma": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=85",
    alt: "Spicy Karnataka Khara Bath cooked with semolina, fresh vegetables, curry leaves and mustard seeds",
    title: "Khara Bath (Upma)"
  },
  "chow-chow-bath": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=85",
    alt: "The classic Bangalore breakfast pairing of spicy vegetable Khara Bath and sweet Kesari Bath",
    title: "Chow Chow Bath (Khara + Kesari)"
  },
  "poori-saagu": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Three puffed golden whole wheat puris served with mild vegetable potato saagu and chutney",
    title: "Poori Saagu (3 Pcs)"
  },
  "poori-chana-masala": {
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=85",
    alt: "Three hot puffed golden puris served with robust North Indian spiced chana masala chickpea gravy",
    title: "Poori Chana Masala (3 Pcs)"
  },
  "set-dosa-tiffin": {
    url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=85",
    alt: "Trio of cloud-soft, spongy set dosas served with creamy vegetable saagu and coconut chutney",
    title: "Set Dosa (3 Pcs)"
  },

  // ==========================================
  // 4. MEALS & RICE (8 Items)
  // ==========================================
  "south-indian-meals": {
    url: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=85",
    alt: "Traditional South Indian vegetarian meal thali with rice, sambar, rasam, palya, curd and papad",
    title: "South Indian Special Meals (Thali)"
  },
  "bisi-bele-bath": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=85",
    alt: "Hot Karnataka Bisi Bele Bath with vegetables, pure ghee, tamarind and crisp fried boondi",
    title: "Bisi Bele Bath with Boondi"
  },
  "vangi-bath": {
    url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=85",
    alt: "Fragrant rice tossed with tender spiced brinjals and roasted homemade vangi bath powder",
    title: "Vangi Bath (Brinjal Rice)"
  },
  "curd-rice": {
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=85",
    alt: "Cooling soft rice blended with creamy curd, tempered with green chillies, ginger and mustard seeds",
    title: "Curd Rice (Mosaranna)"
  },
  "veg-pulao": {
    url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=85",
    alt: "Aromatic basmati rice cooked with fresh seasonal vegetables and whole fragrant spices, served with raitha",
    title: "Vegetable Pulao"
  },
  "lemon-rice": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=85",
    alt: "Bright turmeric lemon rice infused with fresh lemon juice, roasted peanuts and curry leaves",
    title: "Chitranna (Lemon Rice)"
  },
  "tomato-bath": {
    url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=85",
    alt: "Zesty spiced tomato rice cooked with country tomatoes, onions, garlic and fresh mint leaves",
    title: "Tomato Bath"
  },
  "jeera-rice-dal": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=85",
    alt: "Cumin-scented basmati jeera rice paired with comforting yellow dal fry tadka",
    title: "Jeera Rice with Dal Fry"
  },

  // ==========================================
  // 5. DOSA (11 Items)
  // ==========================================
  "masala-dosa": {
    url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=85",
    alt: "Crispy golden crêpe folded with spiced potato filling, served with sambar and coconut chutney",
    title: "Crispy Masala Dosa"
  },
  "plain-dosa": {
    url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=85",
    alt: "Large, thin and golden plain roast dosa roasted crisp on cast-iron tawa",
    title: "Plain Dosa"
  },
  "ghee-masala-dosa": {
    url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=85",
    alt: "Dosa generously roasted in pure desi ghee until ultra crisp, filled with potato masala",
    title: "Pure Ghee Masala Dosa"
  },
  "open-butter-dosa": {
    url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=85",
    alt: "Thick open-faced dosa smeared with signature spicy red garlic chutney and dollop of white butter",
    title: "Open Butter Masala Dosa"
  },
  "cheese-masala-dosa": {
    url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=85",
    alt: "Crispy golden dosa layered with potato filling and blanketed with freshly grated melted cheese",
    title: "Cheese Masala Dosa"
  },
  "podi-masala-dosa": {
    url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=85",
    alt: "Crispy dosa roasted in ghee and dusted with spicy traditional gunpowder podi spice mix",
    title: "Ghee Podi Masala Dosa"
  },
  "onion-dosa": {
    url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=85",
    alt: "Crispy crêpe studded with finely diced crunchy onions, green chillies and fresh coriander",
    title: "Onion Dosa"
  },
  "rava-plain-dosa": {
    url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=85",
    alt: "Lacy netted semolina crepe delicately flavored with whole black peppercorns and cumin seeds",
    title: "Rava Plain Dosa"
  },
  "rava-onion-dosa": {
    url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=85",
    alt: "Golden netted crispy rava dosa loaded with browned crunchy onions and green chillies",
    title: "Rava Onion Dosa"
  },
  "rava-masala-dosa": {
    url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=85",
    alt: "Crispy netted rava dosa crowned with sautéed onions and stuffed with potato aloo bhaji",
    title: "Rava Onion Masala Dosa"
  },
  "paneer-masala-dosa": {
    url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=85",
    alt: "Golden crispy dosa stuffed with spiced crumbled cottage cheese paneer filling",
    title: "Paneer Masala Dosa"
  },

  // ==========================================
  // 6. BAJJI ITEMS (6 Items)
  // ==========================================
  "mirchi-bajji": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Plump green banana chillies dipped in spiced chickpea batter and deep-fried golden crisp",
    title: "Mirchi Bajji (3 Pcs)"
  },
  "mangalore-bajji": {
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=85",
    alt: "Authentic coastal Karnataka fluffy yogurt bondas with fresh coconut bits, ginger and cumin",
    title: "Mangalore Bajji / Bonda (5 Pcs)"
  },
  "onion-pakoda": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Crispy golden thinly sliced onion pakodas tossed with gram flour and carom seeds",
    title: "Crispy Onion Pakoda"
  },
  "raw-banana-bajji": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Crisp fried slices of raw plantain balekayi in seasoned gram flour casing",
    title: "Balekayi / Raw Banana Bajji (3 Pcs)"
  },
  "capsicum-bajji": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Crunchy green bell pepper rings batter fried to golden crispness, served with chutney",
    title: "Capsicum Bajji (3 Pcs)"
  },
  "aloo-bonda": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Spiced mashed potato balls enveloped in chickpea batter and deep fried to golden perfection",
    title: "Aloo Bonda (2 Pcs)"
  },

  // ==========================================
  // 7. SOUP (4 Items)
  // ==========================================
  "tomato-soup": {
    url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=85",
    alt: "Velvety fresh cream of country tomato soup topped with crunchy butter croutons",
    title: "Cream of Tomato Soup"
  },
  "sweet-corn-veg-soup": {
    url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=85",
    alt: "Comforting vegetable broth brimming with tender golden sweet corn kernels",
    title: "Sweet Corn Veg Soup"
  },
  "hot-and-sour-soup": {
    url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=85",
    alt: "Zesty Indo-Chinese dark vegetable soup balanced with black pepper, fresh vinegar and mushrooms",
    title: "Hot & Sour Veg Soup"
  },
  "veg-manchow-soup": {
    url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=85",
    alt: "Spicy dark vegetable soup scented with garlic and coriander, topped with crispy fried noodles",
    title: "Veg Manchow Soup"
  },

  // ==========================================
  // 8. ROTI ITEMS (6 Items)
  // ==========================================
  "akki-roti": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Traditional Karnataka rice flour flatbread kneaded with chopped onions, dill leaves and cumin, served with butter",
    title: "Akki Roti (2 Pcs)"
  },
  "ragi-roti": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Nutritious finger millet ragi flatbread with onions and curry leaves, roasted with pure ghee",
    title: "Ragi Roti (2 Pcs)"
  },
  "chapati-kurma": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Soft whole wheat chapatis served with coconut-rich South Indian mixed vegetable kurma",
    title: "Chapati with Veg Kurma (2 Pcs)"
  },
  "tandoori-roti-butter": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Oven-baked whole wheat tandoori roti brushed with melted butter",
    title: "Butter Tandoori Roti (2 Pcs)"
  },
  "butter-naan": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Fluffy leavened refined flour flatbread baked in clay tandoor and brushed with butter",
    title: "Butter Naan (1 Pc)"
  },
  "parotta-kurma": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Flaky golden layered Malabar parotta served with spicy vegetable gravy",
    title: "Malabar / Kerala Parotta (2 Pcs)"
  },

  // ==========================================
  // 9. NORTH MEALS (5 Items)
  // ==========================================
  "north-indian-thali": {
    url: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=85",
    alt: "Executive North Indian thali with 2 butter rotis, paneer butter masala, dal tadka, jeera rice and dessert",
    title: "North Indian Special Executive Thali"
  },
  "paneer-butter-masala-combo": {
    url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=85",
    alt: "Cottage cheese paneer cubes in rich butter makhani gravy, served with 2 butter rotis",
    title: "Paneer Butter Masala Combo"
  },
  "dal-makhani-combo": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=85",
    alt: "Slow-simmered black lentils with cream and butter, paired with jeera basmati rice",
    title: "Dal Makhani Combo"
  },
  "chana-masala-combo": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=85",
    alt: "Spicy chickpea chana masala in onion tomato gravy, served with 2 rotis and onion salad",
    title: "Chole / Chana Masala Combo"
  },
  "kaju-curry-combo": {
    url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=85",
    alt: "Whole roasted cashews in rich creamy Mughlai gravy, served with 2 rotis and fresh salad",
    title: "Shahi Kaju Curry Combo"
  },

  // ==========================================
  // 10. CHATS (8 Items)
  // ==========================================
  "pani-puri": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Crispy hollow round puris loaded with potato chickpea filling and chilled tangy mint water",
    title: "Pani Puri (6 Pcs)"
  },
  "masala-puri": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Crushed puris in steaming hot dried peas curry, topped with onions, carrots, coriander and sev",
    title: "Bengaluru Masala Puri"
  },
  "sev-puri": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Flat crispy puris topped with seasoned diced potatoes, sweet & spicy chutneys and fine sev",
    title: "Sev Puri (6 Pcs)"
  },
  "dahi-puri": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Crisp puris filled with potato mash, sweet chilled curd, date chutney and chaat masala",
    title: "Dahi Puri (6 Pcs)"
  },
  "bhel-puri": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Puffed rice tossed with tomatoes, onions, roasted peanuts, sev and tangy date-tamarind chutney",
    title: "Bhel Puri"
  },
  "samosa-chaat": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Crushed Punjabi potato samosa drenched in warm pea gravy, yogurt and crisp sev",
    title: "Samosa Masala Chaat"
  },
  "kachori-chaat": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Flaky dal kachori crushed and adorned with chilled curd, tangy tamarind chutney and sev",
    title: "Kachori Chaat"
  },
  "sukha-puri": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Crispy puris filled with spiced potato and crunchy boondi, dusted with dry chaat masala",
    title: "Sukha Puri (6 Pcs)"
  },

  // ==========================================
  // 11. EXTRA (6 Items)
  // ==========================================
  "extra-sambar": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=85",
    alt: "Bowl of freshly prepared piping hot authentic Udupi style lentil sambar",
    title: "Extra Sambar (Bowl)"
  },
  "extra-chutney": {
    url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=85",
    alt: "Freshly ground coconut chutney cup and red chilli garlic chutney",
    title: "Extra Chutney (Coconut / Red)"
  },
  "extra-butter": {
    url: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=85",
    alt: "Dollop of fresh dairy white butter or spoonful of fragrant melted desi ghee",
    title: "Extra Fresh White Butter / Desi Ghee"
  },
  "cup-curd": {
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=85",
    alt: "Cup of thick, creamy homemade pure dairy yogurt",
    title: "Cup of Fresh Curd"
  },
  "fried-papad": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=85",
    alt: "Pair of crispy fried or roasted urad dal papad",
    title: "Roasted / Fried Papad (2 Pcs)"
  },
  "extra-raitha": {
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=85",
    alt: "Chilled yogurt mixed with finely diced cucumbers, onions and roasted cumin",
    title: "Vegetable Raitha"
  }
};

/**
 * Editorial Hero, Story, and Interior Gallery Photos
 */
const RESTAURANT_IMAGES = {
  hero: {
    id: "hero-masala-dosa",
    url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1000&q=85",
    alt: "Freshly roasted golden crispy Masala Dosa served with coconut chutney, tomato chutney and piping hot Karnataka sambar",
    title: "Crispy Masala Dosa with Chutneys and Sambar"
  },
  gallery: [
    {
      id: "gallery-dining-hall",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85",
      alt: "Welcoming, clean and brightly lit Indian vegetarian restaurant dining hall with comfortable wooden tables",
      caption: "Spacious, Family-Friendly Dining Hall"
    },
    {
      id: "gallery-dosa-tawa",
      url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=85",
      alt: "Live counter cast-iron tawa roasting crispy golden dosas with pure ghee and freshly ground potato masala",
      caption: "Live Cast-Iron Dosa Station"
    },
    {
      id: "gallery-coffee-service",
      url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85",
      alt: "Traditional brass filter coffee davara tumblers poured high to create the iconic frothy degree crema",
      caption: "Degree Filter Coffee Preparation"
    },
    {
      id: "gallery-fresh-breakfast",
      url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=85",
      alt: "Freshly steamed idlis and crispy medu vadas arranged on fresh green plantain leaf with fresh chutneys",
      caption: "Morning Breakfast Spread"
    },
    {
      id: "gallery-counter",
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85",
      alt: "Hygienic stainless steel takeaway packing counter with quick order fulfillment",
      caption: "Fast Takeaway & Parcel Counter"
    },
    {
      id: "gallery-afternoon-thali",
      url: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=85",
      alt: "Traditional multi-course South Indian afternoon vegetarian meal thali",
      caption: "Traditional South Indian Afternoon Meals"
    }
  ]
};

/**
 * Returns the exact photographic asset for a menu item id
 */
function getMenuItemImage(itemId) {
  if (MENU_ITEM_IMAGES[itemId]) {
    return MENU_ITEM_IMAGES[itemId];
  }
  return {
    url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=85",
    alt: "Authentic pure vegetarian dish prepared fresh at Ashirvad Veg",
    title: "Ashirvad Veg Special"
  };
}

/**
 * Generates an optimized Cloudinary delivery URL or preserves clean high-res temporary URL
 */
function optimizeImageUrl(url, width = 600) {
  if (!url) return "";
  if (url.includes("res.cloudinary.com")) {
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }
  if (url.includes("images.unsplash.com")) {
    return url.replace(/w=\d+/, `w=${width}`);
  }
  return url;
}

// Make accessible on window (browser) and globalThis (Node)
if (typeof window !== "undefined") {
  window.MENU_ITEM_IMAGES = MENU_ITEM_IMAGES;
  window.RESTAURANT_IMAGES = RESTAURANT_IMAGES;
  window.getMenuItemImage = getMenuItemImage;
  window.optimizeImageUrl = optimizeImageUrl;
}
if (typeof globalThis !== "undefined") {
  globalThis.MENU_ITEM_IMAGES = MENU_ITEM_IMAGES;
  globalThis.RESTAURANT_IMAGES = RESTAURANT_IMAGES;
  globalThis.getMenuItemImage = getMenuItemImage;
  globalThis.optimizeImageUrl = optimizeImageUrl;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { MENU_ITEM_IMAGES, RESTAURANT_IMAGES, getMenuItemImage, optimizeImageUrl };
}
