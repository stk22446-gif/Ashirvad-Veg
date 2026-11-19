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
      const checkoutBtns = document.querySelectorAll("#sendWhatsAppOrderBtn, #cartPageWhatsAppBtn, .btn-submit-order-whatsapp");
      checkoutBtns.forEach(btn => {
        btn.addEventListener("click", () => this.handleOrderSubmit());
      });
    });
  }

  generateOrderMessage(orderDetails) {
    const {
      items,
      orderType,
      customerName,
      customerPhone,
      subtotal,
      // Dine-in fields
      dineinDate,
      dineinTime,
      // Delivery fields
      deliveryHouseNo,
      deliveryBuildingName,
      deliveryStreetName,
      deliveryAreaLocality,
      deliveryLandmark,
      deliveryPinCode,
      deliveryInstructions,
      // Special notes
      specialNotes
    } = orderDetails;

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

    // Order Type & Customer Details
    msg += `*Order Type:* ${this.formatOrderType(orderType)}\n`;
    if (customerName) {
      msg += `*Customer Name:* ${customerName.trim()}\n`;
    }
    if (customerPhone) {
      msg += `*Contact:* ${customerPhone.trim()}\n`;
    }

    // 1. DINE-IN PRE-ORDER SPECIFIC METADATA
    if (orderType === "dinein") {
      let formattedDate = dineinDate;
      try {
        const d = new Date(dineinDate + "T00:00:00");
        formattedDate = d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
      } catch (e) {}

      msg += `*Preferred Arrival Date:* ${formattedDate}\n`;
      msg += `*Preferred Arrival Time:* ${dineinTime}\n`;
      msg += `*Table Readiness:* Food ready upon arrival at restaurant (Operating Hours: 6:30 AM – 10:30 PM)\n`;
    }

    // 2. LOCAL DELIVERY SPECIFIC METADATA
    if (orderType === "delivery") {
      msg += `\n*DELIVERY ADDRESS (Marathahalli & Nearby):*\n`;
      if (deliveryHouseNo) {
        msg += `• House / Flat No: ${deliveryHouseNo.trim()}\n`;
      }
      if (deliveryBuildingName && deliveryBuildingName.trim().length > 0) {
        msg += `• Building / Apt: ${deliveryBuildingName.trim()}\n`;
      }
      if (deliveryStreetName) {
        msg += `• Street / Road: ${deliveryStreetName.trim()}\n`;
      }
      if (deliveryAreaLocality) {
        msg += `• Area / Locality: ${deliveryAreaLocality.trim()}\n`;
      }
      if (deliveryLandmark) {
        msg += `• Landmark: ${deliveryLandmark.trim()}\n`;
      }
      if (deliveryPinCode) {
        msg += `• PIN Code: ${deliveryPinCode.trim()}\n`;
      }
      if (deliveryInstructions && deliveryInstructions.trim().length > 0) {
        msg += `• Delivery Instructions: ${deliveryInstructions.trim()}\n`;
      }
    }

    // 3. TAKEAWAY SPECIFIC METADATA
    if (orderType === "takeaway") {
      msg += `*Pickup Note:* Pick up packed from Marathahalli kitchen (Opp. Kala Mandir)\n`;
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

    if (orderType === "takeaway") {
      msg += `*Parcel/Packaging:* As per restaurant policy (to be confirmed)\n`;
    } else if (orderType === "delivery") {
      msg += `*Packaging / Delivery Charges:* As per restaurant policy (to be confirmed on WhatsApp)\n`;
    }

    msg += `*Estimated Total:* ₹${subtotal}\n`;

    if (specialNotes && specialNotes.trim().length > 0) {
      msg += `--------------------------------------\n`;
      msg += `*Special Instructions:* ${specialNotes.trim()}\n`;
    }

    msg += `--------------------------------------\n`;
    if (orderType === "dinein") {
      msg += `_Please confirm table & order readiness for the scheduled arrival._\n`;
    } else if (orderType === "delivery") {
      msg += `_Please confirm delivery dispatch availability & share UPI payment QR._\n`;
    } else {
      msg += `_Please confirm order availability and share UPI payment QR / confirmation._\n`;
    }
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
        return "🛵 Local Delivery (Marathahalli Area)";
      default:
        return "Takeaway / Parcel";
    }
  }

  handleOrderSubmit() {
    if (!window.cartApp || window.cartApp.items.length === 0) {
      alert("Your order cart is empty! Please add some delicious items from the menu first.");
      return;
    }

    const isCartPage = !!document.getElementById("cartPageItemsContainer");

    // If on Cart Step 1, guide user to Step 2 (Checkout details)
    if (isCartPage && window.cartApp && window.cartApp.currentStep === 1) {
      window.cartApp.goToCheckout();
      return;
    }

    // Determine selected orderType
    let orderType = "takeaway";
    const checkedRadio = document.querySelector('input[name="orderTypeChoice"]:checked');
    if (checkedRadio) {
      orderType = checkedRadio.value;
    } else {
      const selectEl = document.getElementById("cartPageOrderTypeSelect") || document.getElementById("orderTypeSelect");
      if (selectEl) orderType = selectEl.value;
    }

    // Customer Name & Phone
    const nameInput = document.getElementById("checkoutCustomerName") ||
                      document.getElementById("cartPageCustomerName") ||
                      document.getElementById("customerNameInput") ||
                      document.getElementById("orderCustomerName");
    const phoneInput = document.getElementById("checkoutCustomerPhone") ||
                       document.getElementById("cartPageCustomerPhone") ||
                       document.getElementById("customerPhoneInput") ||
                       document.getElementById("orderCustomerPhone");

    const customerName = nameInput ? nameInput.value.trim() : "";
    const customerPhone = phoneInput ? phoneInput.value.trim() : "";

    if (!customerName || customerName.length < 2) {
      alert("Please enter your name so our kitchen can prepare your order.");
      if (nameInput) nameInput.focus();
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      alert("Please enter a valid 10-digit mobile number for order confirmation.");
      if (phoneInput) phoneInput.focus();
      return;
    }

    let orderDetails = {
      items: window.cartApp.items,
      subtotal: window.cartApp.getSubtotal(),
      orderType: orderType,
      customerName: customerName,
      customerPhone: customerPhone,
      specialNotes: ""
    };

    // ----------------------------------------------------
    // OPTION 1: DINE-IN PRE-ORDER VALIDATION & DATA
    // ----------------------------------------------------
    if (orderType === "dinein") {
      const dateInput = document.getElementById("dineinArrivalDate");
      const timeInput = document.getElementById("dineinArrivalTime");
      const notesInput = document.getElementById("dineinSpecialNotes") || document.getElementById("cartPageSpecialNotes");

      const arrivalDate = dateInput ? dateInput.value.trim() : "";
      const arrivalTime = timeInput ? timeInput.value.trim() : "";
      const specialNotes = notesInput ? notesInput.value.trim() : "";

      if (!arrivalDate) {
        alert("Please select your preferred arrival date for dining in.");
        if (dateInput) dateInput.focus();
        return;
      }

      // Validate date is not past
      const todayStr = new Date().toISOString().split("T")[0];
      if (arrivalDate < todayStr) {
        alert("Arrival date cannot be in the past. Please select today or a future date.");
        if (dateInput) dateInput.focus();
        return;
      }

      if (!arrivalTime) {
        alert("Please select your preferred arrival time within our operating hours (6:30 AM – 10:30 PM).");
        if (timeInput) timeInput.focus();
        return;
      }

      orderDetails.dineinDate = arrivalDate;
      orderDetails.dineinTime = arrivalTime;
      orderDetails.specialNotes = specialNotes;
    }

    // ----------------------------------------------------
    // OPTION 2: LOCAL DELIVERY VALIDATION & DATA
    // ----------------------------------------------------
    else if (orderType === "delivery") {
      const houseNoInput = document.getElementById("deliveryHouseNo");
      const buildingNameInput = document.getElementById("deliveryBuildingName");
      const streetNameInput = document.getElementById("deliveryStreetName");
      const areaLocalityInput = document.getElementById("deliveryAreaLocality");
      const landmarkInput = document.getElementById("deliveryLandmark");
      const pinCodeInput = document.getElementById("deliveryPinCode");
      const instructionsInput = document.getElementById("deliveryInstructions");
      const notesInput = document.getElementById("deliverySpecialNotes") || document.getElementById("cartPageSpecialNotes");

      const houseNo = houseNoInput ? houseNoInput.value.trim() : "";
      const buildingName = buildingNameInput ? buildingNameInput.value.trim() : "";
      const streetName = streetNameInput ? streetNameInput.value.trim() : "";
      const areaLocality = areaLocalityInput ? areaLocalityInput.value.trim() : "";
      const landmark = landmarkInput ? landmarkInput.value.trim() : "";
      const pinCode = pinCodeInput ? pinCodeInput.value.trim() : "";
      const instructions = instructionsInput ? instructionsInput.value.trim() : "";
      const specialNotes = notesInput ? notesInput.value.trim() : "";

      if (!houseNo) {
        alert("Please enter your House / Flat Number for delivery.");
        if (houseNoInput) houseNoInput.focus();
        return;
      }

      if (!streetName || streetName.length < 2) {
        alert("Please enter your Street / Road Name.");
        if (streetNameInput) streetNameInput.focus();
        return;
      }

      if (!areaLocality || areaLocality.length < 2) {
        alert("Please enter your Area / Locality in or around Marathahalli.");
        if (areaLocalityInput) areaLocalityInput.focus();
        return;
      }

      if (!landmark || landmark.length < 2) {
        alert("Please provide an identifiable landmark near your building for our delivery partner.");
        if (landmarkInput) landmarkInput.focus();
        return;
      }

      const pinRegex = /^[1-9][0-9]{5}$/;
      if (!pinCode || !pinRegex.test(pinCode)) {
        alert("Please enter a valid 6-digit Indian PIN Code (e.g. 560037).");
        if (pinCodeInput) pinCodeInput.focus();
        return;
      }

      orderDetails.deliveryHouseNo = houseNo;
      orderDetails.deliveryBuildingName = buildingName;
      orderDetails.deliveryStreetName = streetName;
      orderDetails.deliveryAreaLocality = areaLocality;
      orderDetails.deliveryLandmark = landmark;
      orderDetails.deliveryPinCode = pinCode;
      orderDetails.deliveryInstructions = instructions;
      orderDetails.specialNotes = specialNotes;
    }

    // ----------------------------------------------------
    // OPTION 3: TAKEAWAY / PARCEL
    // ----------------------------------------------------
    else {
      const notesInput = document.getElementById("takeawaySpecialNotes") || document.getElementById("cartPageSpecialNotes");
      orderDetails.specialNotes = notesInput ? notesInput.value.trim() : "";
    }

    const message = this.generateOrderMessage(orderDetails);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Close drawer if open and show toast
    if (window.cartApp && typeof window.cartApp.closeDrawer === "function") {
      window.cartApp.closeDrawer();
    }
    if (window.cartApp && typeof window.cartApp.showToast === "function") {
      window.cartApp.showToast("Opening WhatsApp with your order...", "success");
    }
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
