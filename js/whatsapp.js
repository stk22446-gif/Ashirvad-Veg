/**
 * Ashirvad Veg - WhatsApp Order Dispatcher
 * Seamless, URL-encoded WhatsApp ordering directly to 918971583654
 * Fully integrated with CartManager and centralized menu data.
 */

const RESTAURANT_WHATSAPP_NUMBER = "918971583654";
const RESTAURANT_NAME = "Ashirvad Veg";
const RESTAURANT_ADDRESS = "No. 3/76, Ground Floor, Outer Ring Road, Opp. Kala Mandir, Marathahalli, Bangalore – 560037";

class WhatsAppOrderSystem {
  constructor() {
    this.init();
  }

  init() {
    const attachCheckout = () => {
      document.addEventListener("click", (e) => {
        if (e.target.closest("#sendWhatsAppOrderBtn")) {
          e.preventDefault();
          this.handleOrderSubmit();
        }
      });
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", attachCheckout);
    } else {
      attachCheckout();
    }
  }

  formatOrderType(type) {
    switch (type) {
      case "takeaway":
        return "🥡 Takeaway Parcel (Self Pickup)";
      case "dinein":
        return "🍽️ Dine-In Pre-order";
      case "delivery":
        return "🛵 Delivery (Nearby Marathahalli Area)";
      default:
        return "🥡 Takeaway Parcel";
    }
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
    if (customerName && customerName.trim().length > 0) {
      msg += `*Customer Name:* ${customerName.trim()}\n`;
    }
    if (customerPhone && customerPhone.trim().length > 0) {
      msg += `*Contact Phone:* ${customerPhone.trim()}\n`;
    }
    if (orderType === "delivery" && deliveryAddress && deliveryAddress.trim().length > 0) {
      msg += `*Delivery Address:* ${deliveryAddress.trim()}\n`;
    }
    msg += `--------------------------------------\n`;

    // Itemized list
    msg += `*ITEMS ORDERED:*\n`;
    items.forEach((item, index) => {
      const lineTotal = Number(item.price) * Number(item.quantity);
      msg += `${index + 1}. *${item.name}*\n`;
      msg += `   Qty: ${item.quantity} × ₹${item.price} = *₹${lineTotal}*\n`;
    });

    msg += `--------------------------------------\n`;
    msg += `*Estimated Subtotal:* *₹${subtotal}*\n`;

    if (orderType === "takeaway" || orderType === "delivery") {
      msg += `*Packaging / Delivery:* As per restaurant policy (to be confirmed)\n`;
    }

    if (specialNotes && specialNotes.trim().length > 0) {
      msg += `*Special Instructions:* ${specialNotes.trim()}\n`;
    }

    msg += `--------------------------------------\n`;
    msg += `_Please confirm order availability and share UPI payment QR / confirmation._\n`;
    msg += `_Sent via Ashirvad Veg Online Order System._`;

    return msg;
  }

  handleOrderSubmit() {
    if (!window.cartApp || !Array.isArray(window.cartApp.items) || window.cartApp.items.length === 0) {
      alert("Your order bag is empty! Please add some delicious items from the menu first.");
      if (window.cartApp) {
        window.cartApp.openDrawer();
      }
      return;
    }

    // Read form inputs from cart drawer
    const nameInput = document.getElementById("customerNameInput") || document.getElementById("orderCustomerName");
    const phoneInput = document.getElementById("customerPhoneInput") || document.getElementById("orderCustomerPhone");
    const orderTypeSelect = document.getElementById("orderTypeSelect");
    const addressInput = document.getElementById("deliveryAddressInput") || document.getElementById("orderDeliveryAddress");
    const notesInput = document.getElementById("specialNotesInput") || document.getElementById("orderSpecialNotes");

    const customerName = nameInput ? nameInput.value.trim() : "";
    const customerPhone = phoneInput ? phoneInput.value.trim() : "";
    const orderType = orderTypeSelect ? orderTypeSelect.value : "takeaway";
    const deliveryAddress = addressInput ? addressInput.value.trim() : "";
    const specialNotes = notesInput ? notesInput.value.trim() : "";

    if (orderType === "delivery" && (!deliveryAddress || deliveryAddress.length < 5)) {
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

    // Open WhatsApp
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
if (typeof window !== "undefined") {
  window.whatsAppOrder = new WhatsAppOrderSystem();
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { WhatsAppOrderSystem, RESTAURANT_WHATSAPP_NUMBER, RESTAURANT_NAME, RESTAURANT_ADDRESS };
}
