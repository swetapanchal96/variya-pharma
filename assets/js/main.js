const nav = document.querySelector(".site-nav");
const cursorLight = document.querySelector(".cursor-light");
const counters = document.querySelectorAll("[data-count]");
const productToggle = document.querySelector(".product-dropdown .dropdown-toggle");
const desktopQuery = window.matchMedia("(min-width: 992px)");

if (window.AOS) {
  AOS.init({
    duration: 850,
    once: true,
    offset: 90,
    easing: "ease-out-cubic"
  });
}

const updateNav = () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 20);
};

window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

const syncProductDropdownMode = () => {
  if (!productToggle) return;

  if (desktopQuery.matches) {
    productToggle.removeAttribute("data-bs-toggle");
    productToggle.setAttribute("aria-expanded", "false");
    return;
  }

  productToggle.setAttribute("data-bs-toggle", "dropdown");
};

syncProductDropdownMode();
desktopQuery.addEventListener("change", syncProductDropdownMode);

window.addEventListener("mousemove", (event) => {
  if (!cursorLight) return;
  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
});

const animateCounter = (counter) => {
  const target = Number(counter.dataset.count);
  const suffix = counter.dataset.suffix || "";
  const duration = 1600;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = Math.floor(target * eased).toLocaleString("en-IN");

    if (progress < 1) {
      requestAnimationFrame(tick);
      return;
    }

    counter.textContent = target.toLocaleString("en-IN") + suffix;
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    animateCounter(entry.target);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.45 });

counters.forEach((counter) => counterObserver.observe(counter));

document.querySelectorAll(".navbar-nav .nav-link, .navbar-nav .btn, .product-menu-item").forEach((link) => {
  link.addEventListener("click", () => {
    if (link.classList.contains("dropdown-toggle") && !desktopQuery.matches) return;
    const menu = document.querySelector(".navbar-collapse.show");
    if (!menu || !window.bootstrap) return;
    window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});


// product tab-2 
function switchSpecMonitor(machineKey) {
  // 1. Remove active state layers from all selector items
  document.querySelectorAll('.control-node-strip').forEach(function(strip) {
    strip.classList.remove('stream-active');
  });
  
  // 2. Hide all tech spec view screens
  document.querySelectorAll('.monitor-data-view').forEach(function(view) {
    view.classList.add('d-none');
  });
  
  // 3. Find the selected target nodes
  const activeStrip = event.currentTarget;
  const targetView = document.getElementById('monitor-' + machineKey);
  
  // 4. Activate current selections
  if(activeStrip) activeStrip.classList.add('stream-active');
  if(targetView) targetView.classList.remove('d-none');
}


new Swiper(".heroProductSlider", {
    loop:true,

    speed:1000,

    autoplay:{
        delay:2500,
        disableOnInteraction:false
    },

    slidesPerView:4,

    spaceBetween:25,

    breakpoints:{
        320:{
            slidesPerView:1
        },
        768:{
            slidesPerView:2
        },
        992:{
            slidesPerView:3
        },
        1200:{
            slidesPerView:4
        }
    }
});