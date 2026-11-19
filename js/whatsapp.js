/**
 * Ashirvad Veg - WhatsApp Order Dispatcher
 * Seamless, URL-encoded WhatsApp ordering directly to 918971583654
 */

const RESTAURANT_WHATSAPP_NUMBER = "918971583654";
const RESTAURANT_NAME = "Ashirvad Veg";
const RESTAURANT_ADDRESS = "No. 3/76, Ground Floor, Outer Ring Road, Opp. Kala Mandir, Marathahalli, Bangalore – 560037";

class WhatsAppOrderSystem {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      const checkoutBtn = document.getElementById("sendWhatsAppOrderBtn");
      if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => this.handleOrderSubmit());
      }
    });
  }

  generateOrderMessage(orderDetails) {
    const { items, orderType, customerName, customerPhone, deliveryAddress, specialNotes, subtotal } = orderDetails;

    const dateStr = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
    const timeStr = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });

    let msg = `*NEW ORDER — ${RESTAURANT_NAME.toUpperCase()}*\n`;
    msg += `📍 ${RESTAURANT_ADDRESS}\n`;
    msg += `📅 ${dateStr} at ${timeStr}\n`;
    msg += `--------------------------------------\n`;

    // Customer & Order Metadata
    msg += `*Order Type:* ${this.formatOrderType(orderType)}\n`;
    if (customerName) {
      msg += `*Customer Name:* ${customerName.trim()}\n`;
    }
    if (customerPhone) {
      msg += `*Contact:* ${customerPhone.trim()}\n`;
    }
    if (orderType === "delivery" && deliveryAddress) {
      msg += `*Delivery Address:* ${deliveryAddress.trim()}\n`;
    }
    msg += `--------------------------------------\n`;

    // Itemized list
    msg += `*ITEMS ORDERED:*\n`;
    items.forEach((item, index) => {
      const itemLineTotal = item.price * item.quantity;
      msg += `${index + 1}. *${item.name}*\n`;
      msg += `   Qty: ${item.quantity} × ₹${item.price} = *₹${itemLineTotal}*\n`;
    });

    msg += `--------------------------------------\n`;
    msg += `*Estimated Subtotal:* ₹${subtotal}\n`;

    if (orderType === "takeaway" || orderType === "delivery") {
      msg += `*Parcel/Packaging:* As per restaurant policy (to be confirmed)\n`;
    }

    if (specialNotes && specialNotes.trim().length > 0) {
      msg += `*Special Instructions:* ${specialNotes.trim()}\n`;
    }

    msg += `--------------------------------------\n`;
    msg += `_Please confirm order availability and share UPI payment QR / confirmation._\n`;
    msg += `_Sent via Ashirvad Veg Web Order System._`;

    return msg;
  }

  formatOrderType(type) {
    switch (type) {
      case "takeaway":
        return "🥡 Takeaway / Parcel";
      case "dinein":
        return "🍽️ Dine-in Pre-order";
      case "delivery":
        return "🛵 Delivery (Nearby Marathahalli)";
      default:
        return "Takeaway / Parcel";
    }
  }

  handleOrderSubmit() {
    if (!window.cartApp || window.cartApp.items.length === 0) {
      alert("Your order cart is empty! Please add some delicious items from the menu first.");
      return;
    }

    // Read form inputs from cart drawer (support both naming conventions)
    const nameInput = document.getElementById("orderCustomerName") || document.getElementById("customerNameInput");
    const phoneInput = document.getElementById("orderCustomerPhone") || document.getElementById("customerPhoneInput");
    const orderTypeSelect = document.getElementById("orderTypeSelect");
    const addressInput = document.getElementById("orderDeliveryAddress") || document.getElementById("deliveryAddressInput");
    const notesInput = document.getElementById("orderSpecialNotes") || document.getElementById("specialNotesInput");

    const customerName = nameInput ? nameInput.value : "";
    const customerPhone = phoneInput ? phoneInput.value : "";
    const orderType = orderTypeSelect ? orderTypeSelect.value : "takeaway";
    const deliveryAddress = addressInput ? addressInput.value : "";
    const specialNotes = notesInput ? notesInput.value : "";

    if (orderType === "delivery" && (!deliveryAddress || deliveryAddress.trim().length < 5)) {
      alert("Please enter a valid delivery address in or around Marathahalli.");
      if (addressInput) addressInput.focus();
      return;
    }

    const orderDetails = {
      items: window.cartApp.items,
      subtotal: window.cartApp.getSubtotal(),
      orderType: orderType,
      customerName: customerName,
      customerPhone: customerPhone,
      deliveryAddress: deliveryAddress,
      specialNotes: specialNotes
    };

    const message = this.generateOrderMessage(orderDetails);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Close drawer and show toast
    window.cartApp.closeDrawer();
    window.cartApp.showToast("Opening WhatsApp with your order...", "success");
  }

  /**
   * Quick Direct WhatsApp chat for customer inquiries or table queries
   */
  static directChat(messageText = "Hello Ashirvad Veg, I would like to inquire about your menu.") {
    const url = `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

// Instantiate global WhatsApp order system
window.whatsAppOrder = new WhatsAppOrderSystem();
