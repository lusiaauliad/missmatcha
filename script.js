const WHATSAPP = "62895358350088";

const PRODUCTS = [
  {
    id: "latte",
    name: "Matcha Latte",
    category: "drink",
    price: 22000,
    description: "Our signature creamy matcha latte for your everyday matcha moment.",
    image: "images/matcha-latte.jpg"
  },
  {
    id: "strawberry",
    name: "Matcha Strawberry",
    category: "drink",
    price: 25000,
    description: "A lovely combination of sweet strawberry and authentic matcha.",
    image: "images/matcha-strawberry.jpg"
  },
  {
    id: "choco",
    name: "Matcha Choco",
    category: "drink",
    price: 24000,
    description: "Rich chocolate blended harmoniously with authentic pure matcha.",
    image: "images/matcha-choco.jpg"
  },
  {
    id: "ube",
    name: "Matcha Ube",
    category: "drink",
    price: 25000,
    description: "A delightful fusion of sweet creamy ube and authentic matcha.",
    image: "images/matcha-ube.jpg"
  }
];

const money = value => new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
}).format(value);

const $ = selector => document.querySelector(selector);

let cart = JSON.parse(localStorage.getItem("mmCart") || "[]");
let customer = JSON.parse(localStorage.getItem("mmCustomer") || "null");
let currentOrder = null;
let currentFilter = "all";

function saveCart() {
  localStorage.setItem("mmCart", JSON.stringify(cart));
  renderCart();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function openModal(id) {
  $("#" + id).classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  $("#" + id).classList.remove("show");
  if (!document.querySelector(".overlay.show")) {
    document.body.style.overflow = "";
  }
}

function imageHTML(product, className = "product-photo") {
  return `
    <div class="${className}">
      <img src="${product.image}" alt="${product.name}"
        onerror="this.style.display='none'">
    </div>
  `;
}

/* PAGE CONTENT */

function homePage() {
  return `
    <section class="page">
      <div class="container hero">
        <div class="hero-copy">
          <span class="eyebrow">A MATCHA MOMENT FOR EVERY DAY</span>
          <h1>Find your <em>matcha</em> moment.</h1>
          <p>
            Discover the little joy of authentic pure matcha.
            Made with love in Semarang, for your everyday matcha ritual.
          </p>
          <div class="hero-buttons">
            <a href="#shop" data-page="shop" class="button pink">Shop Now ↗</a>
            <a href="#shop" data-page="shop" class="button outline">Lihat Menu</a>
          </div>
        </div>
        <div class="hero-image">
          <img src="images/hero-matcha.jpg" alt="Miss Matcha"
            onerror="this.style.display='none'">
          <span class="image-caption">Your daily matcha fix ♡</span>
        </div>
      </div>

      <div class="marquee">
        PURE MATCHA ✳ MADE FRESH ✳ GOOD MOOD ✳ MADE WITH LOVE
      </div>

      <section class="section">
        <div class="container split">
          <div class="split-image">
            <img src="images/about-matcha.jpg" alt="About Miss Matcha"
              onerror="this.style.display='none'">
          </div>
          <div class="content-copy">
            <span class="eyebrow">GET TO KNOW US</span>
            <h2>A little more about <em>Miss Matcha.</em></h2>
            <p>
              Miss Matcha hadir untuk membagikan pengalaman menikmati
              matcha yang praktis, menyenangkan, dan berkualitas.
              Dari minuman matcha hingga ceremonial matcha powder,
              ada banyak cara untuk menikmati matcha bersama kami.
            </p>
            <a href="#about" data-page="about" class="button pink">Discover Our Story ↗</a>
          </div>
        </div>
      </section>

      <section class="section favourite">
        <div class="container">
          <div class="section-heading">
            <span class="eyebrow">LOVED BY MATCHA PEOPLE</span>
            <h2>Our most <em>favourite.</em></h2>
            <p>Meet the matcha favourites made for your everyday little treat.</p>
          </div>
          <div class="favourite-card">
            <img src="images/favourite-matcha.jpg" alt="Our favourite matcha"
              onerror="this.style.display='none'">
            <h3>Matcha Latte</h3>
            <p>Our signature sip · Rp22.000</p>
            <button class="button pink" data-product="latte">Explore Product ↗</button>
          </div>
          <div class="section-heading" style="margin-top:35px">
            <a href="#shop" data-page="shop" class="button outline">Explore Our Menu ↗</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container section-heading">
          <span class="eyebrow">A LITTLE LOVE FROM OUR CUSTOMERS</span>
          <h2>Kind words, <em>happy hearts.</em></h2>
          <p>See what our customers say about their Miss Matcha experience.</p>
          <a href="#review" data-page="review" class="button pink">Read Our Reviews ↗</a>
        </div>
      </section>
    </section>
  `;
}

function aboutPage() {
  return `
    <section class="page">
      <div class="page-banner">
        <span class="eyebrow">OUR LITTLE STORY</span>
        <h1>Get to know <em>Miss Matcha.</em></h1>
        <p>More than just a cup of matcha. It's a little moment of happiness.</p>
      </div>

      <div class="container section">
        <div class="split">
          <div class="split-image">
            <img src="images/about-matcha.jpg" alt="Miss Matcha story"
              onerror="this.style.display='none'">
          </div>
          <div class="content-copy">
            <span class="eyebrow">WHO WE ARE</span>
            <h2>Made with love, <em>served with joy.</em></h2>
            <p>
              Miss Matcha adalah brand matcha yang hadir di Semarang
              dengan pilihan minuman matcha dan ceremonial matcha powder.
              Kami ingin menghadirkan pengalaman menikmati matcha yang
              menyenangkan, praktis, dan bisa disesuaikan dengan selera.
            </p>
          </div>
        </div>
      </div>

      <div class="container section">
        <div class="section-heading">
          <span class="eyebrow">WHAT WE OFFER</span>
          <h2>Our <em>products.</em></h2>
        </div>
        <div class="about-columns">
          <article class="about-box">
            <h3>Matcha Drinks</h3>
            <p>
              Pilihan minuman matcha untuk menemani aktivitas sehari-hari.
              Kamu bisa memilih tingkat gula dan es sesuai selera.
            </p>
          </article>
          <article class="about-box">
            <h3>Ceremonial Matcha</h3>
            <p>
              Matcha powder untuk kamu yang ingin membuat minuman matcha
              sendiri di rumah. Nikmati sesuai cara penyajian yang kamu suka.
            </p>
          </article>
          <article class="about-box">
            <h3>Our Matcha Experience</h3>
            <p>
              Setiap produk hadir untuk memberikan pengalaman matcha
              yang praktis dan menyenangkan.
            </p>
          </article>
        </div>
      </div>

      <div class="section" style="background:#e9edda">
        <div class="container faq">
          <div class="section-heading">
            <span class="eyebrow">GOOD TO KNOW</span>
            <h2>Frequently asked <em>questions.</em></h2>
          </div>
          <details>
            <summary>How should I store matcha powder?</summary>
            <p>Simpan dalam wadah tertutup rapat, di tempat sejuk dan kering, jauh dari sinar matahari dan kelembapan. Ikuti petunjuk pada kemasan.</p>
          </details>
          <details>
            <summary>How long can I consume matcha powder?</summary>
            <p>Perhatikan tanggal kedaluwarsa pada kemasan. Setelah dibuka, simpan dengan benar dan ikuti anjuran produsen.</p>
          </details>
          <details>
            <summary>How do I prepare matcha at home?</summary>
            <p>Campurkan matcha powder dengan sedikit air hangat, lalu whisk hingga larut. Tambahkan susu atau air sesuai selera.</p>
          </details>
          <details>
            <summary>How should I store prepared matcha drinks?</summary>
            <p>Simpan dalam lemari pendingin dan konsumsi sesegera mungkin. Untuk kualitas terbaik, nikmati saat masih segar.</p>
          </details>
          <details>
            <summary>Can I customize my drink?</summary>
            <p>Yes! Kamu bisa memilih tingkat gula dan es untuk menu minuman yang menyediakan pilihan tersebut.</p>
          </details>
        </div>
      </div>
    </section>
  `;
}

function shopPage() {
  const categories = [...new Set(PRODUCTS.map(p => p.category))];
  const products = PRODUCTS.filter(product =>
    currentFilter === "all" || product.category === currentFilter
  );

  return `
    <section class="page">
      <div class="page-banner">
        <span class="eyebrow">A LITTLE SOMETHING FOR YOU</span>
        <h1>Explore our <em>menu.</em></h1>
        <p>Find your favourite matcha and make it yours.</p>
      </div>

      <div class="container">
        <div class="page-intro">
          <span class="eyebrow">SHOP MISS MATCHA</span>
          <h2>All <em>products.</em></h2>
          <p>Refreshing handcrafted matcha drinks for your daily matcha fix.</p>
        </div>

        ${categories.length > 1 ? `
        <div class="product-filters">
          <button class="filter ${currentFilter === "all" ? "active" : ""}" data-filter="all">All Products</button>
          ${categories.includes("drink") ? `<button class="filter ${currentFilter === "drink" ? "active" : ""}" data-filter="drink">Matcha Drinks</button>` : ""}
          ${categories.includes("powder") ? `<button class="filter ${currentFilter === "powder" ? "active" : ""}" data-filter="powder">Matcha Powder</button>` : ""}
        </div>
        ` : ""}

        <div class="product-grid">
          ${products.map(product => `
            <article class="product-card">
              ${imageHTML(product)}
              <div class="product-info">
                <small>${product.category === "drink" ? "MATCHA DRINK" : "MATCHA POWDER"}</small>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="price">${money(product.price)}</span>
                <button class="button pink" data-product="${product.id}">View Product ↗</button>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function reviewPage() {
  return `
    <section class="page">
      <div class="page-banner">
        <span class="eyebrow">KIND WORDS</span>
        <h1>Love notes from <em>our customers.</em></h1>
        <p>Little stories from people who enjoy Miss Matcha.</p>
      </div>
      <div class="container section">
        <div class="review-grid">
          <article class="review-card">
            <div class="stars">★★★★★</div>
            <p>"Matcha-nya creamy dan enak buat nemenin aktivitas!"</p>
            <small>Customer review</small>
          </article>
          <article class="review-card">
            <div class="stars">★★★★★</div>
            <p>"Packaging-nya praktis dan rasanya cocok."</p>
            <small>Customer review</small>
          </article>
          <article class="review-card">
            <div class="stars">★★★★★</div>
            <p>"Senang bisa bikin matcha sendiri pakai powder-nya."</p>
            <small>Customer review</small>
          </article>
        </div>
        <p class="hint">Contoh ulasan di atas perlu diganti dengan review pelanggan asli sebelum website dipublikasikan.</p>
      </div>
    </section>
  `;
}

function contactPage() {
  return `
    <section class="page">
      <div class="page-banner">
        <span class="eyebrow">LET'S CONNECT</span>
        <h1>Say hello to <em>us!</em></h1>
        <p>We'd love to hear from you.</p>
      </div>
      <div class="container section">
        <div class="contact-grid">
          <article class="contact-card">
            <h3>Instagram ♡</h3>
            <p>Follow our matcha journey, new menus, and latest updates.</p>
            <a href="https://www.instagram.com/missmatcha.smg?hvrq=ZHlhNmQzeGc0ZDg4" target="_blank" rel="noopener">Visit Instagram ↗</a>
          </article>
          <article class="contact-card">
            <h3>WhatsApp ♡</h3>
            <p>Need help with your order? Let's chat with us.</p>
            <a href="https://wa.me/62895358350088" target="_blank" rel="noopener">Chat with us ↗</a>
          </article>
          <article class="contact-card">
            <h3>Based in Semarang</h3>
            <p>Find our order information and bazaar updates on Instagram.</p>
            <a href="https://www.instagram.com/missmatcha.smg?hvrq=ZHlhNmQzeGc0ZDg4" target="_blank" rel="noopener">Find our updates ↗</a>
          </article>
        </div>
      </div>
      <div class="container section">
        <div class="section-heading">
          <span class="eyebrow">LITTLE MOMENTS, BIG MEMORIES</span>
          <h2>Our <em>bazaar moments.</em></h2>
          <p>Take a look at our journey and memories.</p>
        </div>
        <div class="gallery">
          <img src="images/bazaar-1.jpg" alt="Miss Matcha bazaar 1">
          <img src="images/bazaar-2.jpg" alt="Miss Matcha bazaar 2">
          <img src="images/bazaar-3.jpg" alt="Miss Matcha bazaar 3">
        </div>
      </div>
    </section>
  `;
}

/* NAVIGATION */

const pages = {
  home: homePage,
  about: aboutPage,
  shop: shopPage,
  review: reviewPage,
  contact: contactPage
};

function navigate(page) {
  if (!pages[page]) page = "home";

  $("#app").innerHTML = pages[page]();

  document.querySelectorAll("[data-page]").forEach(link => {
    link.classList.toggle("active", link.dataset.page === page);
  });

  $("#navigation").classList.remove("open");
  history.replaceState(null, "", "#" + page);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", event => {
  const link = event.target.closest("[data-page]");
  if (link) {
    event.preventDefault();
    navigate(link.dataset.page);
  }
});

window.addEventListener("hashchange", () => {
  navigate(location.hash.slice(1));
});

$("#menuToggle").addEventListener("click", () => {
  $("#navigation").classList.toggle("open");
});

/* PRODUCT DETAIL */

function openProduct(id) {
  const product = PRODUCTS.find(item => item.id === id);
  if (!product) return;

  const isDrink = product.category === "drink";

  $("#productDetail").innerHTML = `
    ${imageHTML(product, "detail-photo")}
    <small class="eyebrow">${isDrink ? "MATCHA DRINK" : "MATCHA POWDER"}</small>
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <h3>${money(product.price)}</h3>

    ${isDrink ? `
      <div class="customize-row">
        <label>Sugar Level
          <select id="sugarOption">
            <option>Normal Sugar</option>
            <option>Less Sugar</option>
            <option>No Sugar</option>
          </select>
        </label>
        <label>Ice Level
          <select id="iceOption">
            <option>Normal Ice</option>
            <option>Less Ice</option>
            <option>No Ice</option>
          </select>
        </label>
      </div>
    ` : `
      <p class="hint">Enjoy preparing your own matcha ritual at home.</p>
    `}

    <label>Quantity
      <input id="productQty" type="number" min="1" max="50" value="1">
    </label>

    <button class="button pink full" id="addProductButton">Add to Cart</button>
  `;

  $("#addProductButton").onclick = () => {
    const qty = Math.max(1, Math.min(50, Number($("#productQty").value) || 1));
    const options = isDrink ? {
      sugar: $("#sugarOption").value,
      ice: $("#iceOption").value
    } : {};

    addToCart(id, options, qty);
    closeModal("productOverlay");
  };

  openModal("productOverlay");
}

document.addEventListener("click", event => {
  const productButton = event.target.closest("[data-product]");
  if (productButton) openProduct(productButton.dataset.product);

  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) {
    currentFilter = filterButton.dataset.filter;
    navigate("shop");
  }
});

/* CART */

function addToCart(id, options = {}, qty = 1) {
  const key = id + "|" + (options.sugar || "") + "|" + (options.ice || "");
  const existing = cart.find(item => item.key === key);

  if (existing) existing.qty += qty;
  else cart.push({ key, id, options, qty });

  saveCart();
  showToast("Added to your cart ♡");
}

function totalCart() {
  return cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + product.price * item.qty;
  }, 0);
}

function renderCart() {
  $("#cartCount").textContent = cart.reduce((sum, item) => sum + item.qty, 0);

  if (!cart.length) {
    $("#cartItems").innerHTML = `<div class="empty">Your cart is waiting for a little matcha magic ♡</div>`;
  } else {
    $("#cartItems").innerHTML = cart.map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      const options = [item.options.sugar, item.options.ice].filter(Boolean).join(" · ");

      return `
        <div class="cart-row">
          <div>
            <h4>${product.name}</h4>
            <p>${options || "Matcha Powder"}</p>
            <b>${money(product.price * item.qty)}</b>
          </div>
          <div class="cart-row-right">
            <div class="qty">
              <button data-qty="${item.key}" data-step="-1">−</button>
              <span>${item.qty}</span>
              <button data-qty="${item.key}" data-step="1">+</button>
            </div>
            <button class="remove" data-remove="${item.key}">Remove</button>
          </div>
        </div>
      `;
    }).join("");
  }

  $("#cartTotal").textContent = money(totalCart());
}

function saveCart() {
  localStorage.setItem("mmCart", JSON.stringify(cart));
  renderCart();
}

$("#cartButton").addEventListener("click", () => {
  renderCart();
  openModal("cartOverlay");
});

$("#cartItems").addEventListener("click", event => {
  const qtyButton = event.target.closest("[data-qty]");
  const removeButton = event.target.closest("[data-remove]");

  if (qtyButton) {
    const item = cart.find(x => x.key === qtyButton.dataset.qty);
    if (item) {
      item.qty += Number(qtyButton.dataset.step);
      if (item.qty <= 0) cart = cart.filter(x => x.key !== item.key);
      saveCart();
    }
  }

  if (removeButton) {
    cart = cart.filter(x => x.key !== removeButton.dataset.remove);
    saveCart();
  }
});

/* ACCOUNT - OPTIONAL */

$("#accountButton").addEventListener("click", () => {
  if (customer) {
    $("#accountName").value = customer.name;
    $("#accountPhone").value = customer.phone;
    $("#accountMessage").textContent = "Your details are saved on this device.";
  }
  openModal("accountOverlay");
});

$("#accountForm").addEventListener("submit", event => {
  event.preventDefault();

  customer = {
    name: $("#accountName").value.trim(),
    phone: $("#accountPhone").value.trim()
  };

  localStorage.setItem("mmCustomer", JSON.stringify(customer));
  $("#accountMessage").textContent = "Your details have been saved ♡";
  showToast("Account details saved.");
});

/* CHECKOUT - DOES NOT REQUIRE LOGIN */

function renderCheckoutSummary() {
  const summaryEl = $("#checkoutSummary");
  if (!summaryEl) return;
  summaryEl.innerHTML = `
    <div class="mini-order-list">
      ${cart.map(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        const options = [item.options.sugar, item.options.ice].filter(Boolean).join(" · ");
        return `
          <div class="mini-order-item">
            <div>
              <b>${product?.name || "Matcha"}</b> <small>x${item.qty} ${options ? `(${options})` : ""}</small>
            </div>
            <b>${money((product?.price || 0) * item.qty)}</b>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function updateDeliveryFields() {
  const isDelivery = $("#deliveryMethod").value === "Delivery";
  const addressLabel = $("#addressLabel");
  if (addressLabel) {
    addressLabel.style.display = isDelivery ? "block" : "none";
  }
  $("#shippingAddress").required = isDelivery;
}

$("#goCheckout").addEventListener("click", () => {
  if (!cart.length) {
    showToast("Keranjang belanja masih kosong ♡");
    return;
  }

  $("#buyerName").value = customer?.name || "";
  $("#buyerPhone").value = customer?.phone || "";
  $("#checkoutTotal").textContent = money(totalCart());
  renderCheckoutSummary();
  updateDeliveryFields();

  closeModal("cartOverlay");
  openModal("checkoutOverlay");
});

$("#deliveryMethod").addEventListener("change", updateDeliveryFields);

$("#checkoutForm").addEventListener("submit", event => {
  event.preventDefault();

  if (!cart.length) return;

  const orderId = "MM-" + Math.floor(100000 + Math.random() * 900000);

  currentOrder = {
    id: orderId,
    name: $("#buyerName").value.trim(),
    phone: $("#buyerPhone").value.trim(),
    method: $("#deliveryMethod").value,
    address: $("#shippingAddress").value.trim(),
    notes: $("#orderNotes").value.trim(),
    items: cart.map(item => ({ ...item })),
    total: totalCart()
  };

  const idBadge = $("#orderIdBadge");
  if (idBadge) idBadge.textContent = "ID Pesanan: #" + currentOrder.id;

  $("#paymentTotal").textContent = money(currentOrder.total);
  closeModal("checkoutOverlay");
  openModal("paymentOverlay");
});

/* PAYMENT CONFIRMATION */

$("#confirmPayment").addEventListener("click", () => {
  if (!currentOrder) return;

  const items = currentOrder.items.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    const options = [item.options.sugar, item.options.ice].filter(Boolean).join(", ");

    return `• ${product.name} x${item.qty}${options ? " (" + options + ")" : ""} = ${money(product.price * item.qty)}`;
  }).join("\n");

  const methodText = currentOrder.method === "Delivery" ? "🛵 Delivery (Diantar)" : "🏪 Pickup (Ambil Sendiri)";

  const message = `Halo Miss Matcha! ♡
Saya mau konfirmasi pesanan dari website:

🧾 ID Pesanan: #${currentOrder.id}
👤 Nama: ${currentOrder.name}
📱 WhatsApp: ${currentOrder.phone}
📦 Metode: ${methodText}
${currentOrder.method === "Delivery" ? `📍 Alamat: ${currentOrder.address}\n` : ""}${currentOrder.notes ? `📝 Catatan: ${currentOrder.notes}\n` : ""}
🍵 DETAIL PESANAN:
${items}

💰 TOTAL PEMBAYARAN: ${money(currentOrder.total)}

Saya sudah melakukan pembayaran via QRIS. Bukti transfer saya lampirkan setelah pesan ini. Mohon diproses ya kak, terima kasih! ♡`.trim();

  localStorage.setItem("mmLastOrder", JSON.stringify({
    ...currentOrder,
    status: "Waiting for admin confirmation",
    date: new Date().toISOString()
  }));

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  cart = [];
  saveCart();
  currentOrder = null;
  closeModal("paymentOverlay");
  showToast("Pesanan berhasil dibuat! Membuka WhatsApp... ♡");
});

/* CLOSE BUTTONS */

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => closeModal(button.dataset.close));
});

document.querySelectorAll(".overlay").forEach(overlay => {
  overlay.addEventListener("click", event => {
    if (event.target === overlay) closeModal(overlay.id);
  });
});

/* START */

$("#year").textContent = new Date().getFullYear();
renderCart();
navigate(location.hash.slice(1) || "home");