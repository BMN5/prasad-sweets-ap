import { useState, useEffect, useMemo } from 'react';

// Import local images from assets folder
import hero1 from './assets/Hero1.png';
import hero2 from './assets/Hero2.png';
import hero3 from './assets/Hero3.png';
import hero4 from './assets/Hero4.png';
import hero5 from './assets/Hero5.png';
import sannaLaddu from './assets/sanna-laddu.png';
import peddaLaddu from './assets/pedda-laddu.png';
import kajuKatli from './assets/kaju-katli.png';
import kajuRoll from './assets/kaju-roll.png';
import kovaPuri from './assets/kova-puri.png';
import kovaKajjikaay from './assets/kova-kajjikaay.png';
import mysorePak from './assets/mysore-pak.png';
import kovaMysorePak from './assets/kova-mysore-pak.png';
import carrotHalwa from './assets/carrot-halwa.png';
import gummadiHalwa from './assets/gummadi-halwa.png';
import jhangri from './assets/jhangri.png';
import murukku from './assets/murukku.png';
import carrotChips from './assets/carrot-chips.png';
import chekodi from './assets/chekodi.png';
import ribbonPakoda from './assets/ribbon-pakoda.png';
import dalMixture from './assets/dal-mixture.png';
import vaamuKarasu from './assets/vaamu-karasu.png';

// Prasad Sweets Shop - Product Menu Data (Using actual imported images)
const PRODUCTS = [
  {
    id: 'sanna-laddu',
    name: 'Sanna Boondi Laddu',
    category: 'Ghee Sweets',
    price: 480,
    unit: 'kg',
    minQty: 0.25,
    step: 0.25,
    desc: 'Fine, golden pearls of chickpea flour fried in pure ghee, sweetened, and shaped into melt-in-the-mouth laddus.',
    image: sannaLaddu,
    bestSeller: true,
    special: true
  },
  {
    id: 'pedda-laddu',
    name: 'Pedda Boondi Laddu',
    category: 'Ghee Sweets',
    price: 460,
    unit: 'kg',
    minQty: 0.25,
    step: 0.25,
    desc: 'Larger, traditional boondi droplets infused with cardamom, dry fruits, and pure ghee.',
    image: peddaLaddu,
    bestSeller: false,
    special: true
  },
  {
    id: 'kaju-katli',
    name: 'Kaju Katli',
    category: 'Dry Fruit Sweets',
    price: 960,
    unit: 'kg',
    minQty: 0.25,
    step: 0.25,
    desc: 'The ultimate royal treat made of premium ground cashews and sugar, decorated with edible silver leaf.',
    image: kajuKatli,
    bestSeller: true,
    special: false
  },
  {
    id: 'kaju-roll',
    name: 'Kaju Roll',
    category: 'Dry Fruit Sweets',
    price: 980,
    unit: 'kg',
    minQty: 0.25,
    step: 0.25,
    desc: 'Cashew paste rolled with a rich, aromatic stuffing of finely chopped pistachios and almonds.',
    image: kajuRoll,
    bestSeller: false,
    special: true
  },
  {
    id: 'kova-puri',
    name: 'Kova Puri',
    category: 'Milk Sweets',
    price: 450,
    unit: 'kg',
    minQty: 0.25,
    step: 0.25,
    desc: 'A traditional milk sweet cooked down slowly to form a rich, dense, and moist texture. The signature sweet of Naidupet.',
    image: kovaPuri,
    bestSeller: true,
    special: true
  },
  {
    id: 'kova-kajjikaay',
    name: 'Kova Kajjikaay',
    category: 'Milk Sweets',
    price: 480,
    unit: 'kg',
    minQty: 0.25,
    step: 0.25,
    desc: 'Crescent-shaped milk khoya shells filled with a sweet, aromatic mixture of coconut and cardamom.',
    image: kovaKajjikaay,
    bestSeller: false,
    special: true
  },
  {
    id: 'mysore-pak',
    name: 'Ghee Mysore Pak',
    category: 'Ghee Sweets',
    price: 560,
    unit: 'kg',
    minQty: 0.25,
    step: 0.25,
    desc: 'Golden-hued sweet made from gram flour, pure ghee, and sugar, designed to dissolve instantly in the mouth.',
    image: mysorePak,
    bestSeller: true,
    special: false
  },
  {
    id: 'kova-mysore-pak',
    name: 'Kova Mysore Pak',
    category: 'Milk Sweets',
    price: 520,
    unit: 'kg',
    minQty: 0.25,
    step: 0.25,
    desc: 'A rare fusion sweet blending the richness of fresh milk kova with the traditional ghee Mysore Pak.',
    image: kovaMysorePak,
    bestSeller: false,
    special: true
  },
  {
    id: 'carrot-halwa',
    name: 'Carrot Halwa',
    category: 'Halwa Specials',
    price: 380,
    unit: 'kg',
    minQty: 0.25,
    step: 0.25,
    desc: 'Grated fresh carrots slow-simmered in milk, ghee, and sugar, garnished with roasted cashews and raisins.',
    image: carrotHalwa,
    bestSeller: false,
    special: false
  },
  {
    id: 'gummadi-halwa',
    name: 'Gummadi Kaaya Halwa',
    category: 'Halwa Specials',
    price: 360,
    unit: 'kg',
    minQty: 0.25,
    step: 0.25,
    desc: 'Traditional red pumpkin halwa cooked with jaggery, cardamom, and ghee, offering an authentic country-style sweet taste.',
    image: gummadiHalwa,
    bestSeller: false,
    special: true
  },
  {
    id: 'jhangri',
    name: 'Jhangri (Imarti)',
    category: 'Ghee Sweets',
    price: 400,
    unit: 'kg',
    minQty: 0.25,
    step: 0.25,
    desc: 'Beautiful flower-shaped swirls of black gram batter deep-fried and soaked in a warm cardamom sugar syrup.',
    image: jhangri,
    bestSeller: false,
    special: false
  },
  {
    id: 'murukku',
    name: 'Minapappu Murukku',
    category: 'Savouries',
    price: 90,
    unit: 'packet',
    minQty: 1,
    step: 1,
    desc: 'Traditional crispy rice-flour and urad dal coils seasoned with cumin and sesame seeds (250g packet).',
    image: murukku,
    bestSeller: true,
    special: false
  },
  {
    id: 'carrot-chips',
    name: 'Carrot Chips',
    category: 'Savouries',
    price: 80,
    unit: 'packet',
    minQty: 1,
    step: 1,
    desc: 'Crispy, crunchy, and savory thinly sliced carrot chips seasoned with mild red chilli and salt (250g packet).',
    image: carrotChips,
    bestSeller: false,
    special: true
  },
  {
    id: 'chekodi',
    name: 'Chekodi',
    category: 'Savouries',
    price: 75,
    unit: 'packet',
    minQty: 1,
    step: 1,
    desc: 'Authentic ring-shaped crunchy snacks made of rice flour, butter, and cumin seeds (250g packet).',
    image: chekodi,
    bestSeller: false,
    special: false
  },
  {
    id: 'ribbon-pakoda',
    name: 'Ribbon Pakoda',
    category: 'Savouries',
    price: 75,
    unit: 'packet',
    minQty: 1,
    step: 1,
    desc: 'Flat, ribbon-like crispy snacks made from gram flour and rice flour, spiced with red chilli powder (250g packet).',
    image: ribbonPakoda,
    bestSeller: false,
    special: false
  },
  {
    id: 'dal-mixture',
    name: 'Dal Mixture',
    category: 'Savouries',
    price: 80,
    unit: 'packet',
    minQty: 1,
    step: 1,
    desc: 'Spicy crunch mixture of fried lentils, sev, peanuts, cashew nuts, and roasted curry leaves (250g packet).',
    image: dalMixture,
    bestSeller: false,
    special: false
  },
  {
    id: 'vaamu-karasu',
    name: 'Vaamu Karasu / Poosa',
    category: 'Savouries',
    price: 75,
    unit: 'packet',
    minQty: 1,
    step: 1,
    desc: 'Crunchy chickpea flour sticks infused with the strong aromatic flavor of ajwain (carom seeds) (250g packet).',
    image: vaamuKarasu,
    bestSeller: false,
    special: false
  }
];

// Product categories mapping with details for explore range (Using local images)
const CATEGORIES = [
  { name: 'Ghee Sweets', img: sannaLaddu },
  { name: 'Milk Sweets', img: kovaPuri },
  { name: 'Dry Fruit Sweets', img: kajuKatli },
  { name: 'Halwa Specials', img: carrotHalwa },
  { name: 'Savouries', img: murukku }
];

// Gallery Images (Using local images)
const GALLERY = [
  { title: 'Pure Ghee Boondi Laddu', img: peddaLaddu },
  { title: 'Crispy Urad Dal Murukku', img: murukku },
  { title: 'Premium Cashew Kaju Katli', img: kajuKatli },
  { title: 'Rich Traditional Kova Puri', img: kovaPuri },
  { title: 'Sweet Carrot Halwa', img: carrotHalwa },
  { title: 'Melt-in-mouth Mysore Pak', img: mysorePak }
];

export default function App() {
  // App States
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Simulated Router State ('home', 'shop', 'story', 'gallery', 'contact', 'cart')
  const [currentPage, setCurrentPage] = useState('home');

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '' });

  // Automatically hide toast after 4 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Hero Image Carousel State
  const [heroIndex, setHeroIndex] = useState(0);
  const heroImages = useMemo(() => [hero5], []);

  useEffect(() => {
    if (currentPage !== 'home') return;
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentPage, heroImages]);

  // Checkout Form State
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryType: 'pickup' // 'pickup' or 'delivery'
  });
  
  // Quantities selected on card view before adding (keyed by product.id)
  const [selectedQuantities, setSelectedQuantities] = useState(
    PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: p.minQty }), {})
  );

  // Monitor Scroll for Sticky Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Page Switcher Helper (scrolls to top instantly)
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsMobileMenuOpen(false);
  };

  // Filter and Search Products (used only on Shop Online page)
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Extract Best Sellers & Specials
  const bestSellers = useMemo(() => PRODUCTS.filter(p => p.bestSeller), []);
  const specials = useMemo(() => PRODUCTS.filter(p => p.special), []);

  // Card Quantity Picker Handlers
  const handleCardQtyChange = (productId, change, product) => {
    setSelectedQuantities(prev => {
      const current = prev[productId] || product.minQty;
      let next = current + change;
      if (next < product.minQty) next = product.minQty;
      return { ...prev, [productId]: Math.round(next * 100) / 100 };
    });
  };

  // Add Item to Cart
  const handleAddToCart = (product) => {
    const quantityToAdd = selectedQuantities[product.id] || product.minQty;
    
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        const newQty = updatedCart[existingItemIndex].quantity + quantityToAdd;
        updatedCart[existingItemIndex].quantity = Math.round(newQty * 100) / 100;
        return updatedCart;
      } else {
        return [...prevCart, { product, quantity: quantityToAdd }];
      }
    });

    // Reset card picker quantity
    setSelectedQuantities(prev => ({ ...prev, [product.id]: product.minQty }));
    
    // Trigger toast notification popup
    const qtyText = product.unit === 'kg' ? `${quantityToAdd.toFixed(2)} kg` : `${quantityToAdd} pkt`;
    setToast({
      show: true,
      message: `Added ${qtyText} of ${product.name} to your cart!`
    });
  };

  // Modify quantity inside Cart drawer
  const handleCartQtyUpdate = (productId, change) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          const nextQty = item.quantity + change;
          if (nextQty <= 0) return null;
          return { ...item, quantity: Math.round(nextQty * 100) / 100 };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm(prev => ({ ...prev, [name]: value }));
  };

  // Cart totals
  const cartTotals = useMemo(() => {
    const itemCount = cart.reduce((acc, item) => acc + (item.product.unit === 'kg' ? 1 : item.quantity), 0);
    const totalAmount = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    return { itemCount, totalAmount };
  }, [cart]);

  // Format Cart & Send to WhatsApp
  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    
    if (!checkoutForm.name || !checkoutForm.phone) {
      alert("Please fill in your Name and Phone Number to complete the order via WhatsApp.");
      return;
    }
    
    if (checkoutForm.deliveryType === 'delivery' && !checkoutForm.address) {
      alert("Please enter a Delivery Address.");
      return;
    }

    let message = `*🔔 NEW ORDER - PRASAD SWEETS SHOP* \n`;
    message += `=================================\n\n`;
    message += `👤 *Customer Info:*\n`;
    message += `• *Name:* ${checkoutForm.name}\n`;
    message += `• *Phone:* ${checkoutForm.phone}\n`;
    message += `• *Type:* ${checkoutForm.deliveryType === 'delivery' ? '🚀 Home Delivery' : '🏪 Shop Pickup'}\n`;
    
    if (checkoutForm.deliveryType === 'delivery') {
      message += `• *Address:* ${checkoutForm.address}\n`;
    }
    
    message += `\n🛒 *Order Summary:*\n`;
    message += `---------------------------------\n`;
    
    cart.forEach((item, index) => {
      const subtotal = item.product.price * item.quantity;
      const formattedQty = item.product.unit === 'kg' ? `${item.quantity.toFixed(2)} kg` : `${item.quantity} pkt`;
      message += `${index + 1}. *${item.product.name}*\n   Qty: ${formattedQty} × ₹${item.product.price} = *₹${subtotal.toFixed(0)}*\n`;
    });
    
    message += `---------------------------------\n`;
    message += `💰 *Grand Total: ₹${cartTotals.totalAmount.toFixed(0)}*\n`;
    message += `=================================\n\n`;
    message += `Please confirm availability and sharing total details. Thank you!`;

    const encodedText = encodeURIComponent(message);
    const waUrl = `https://wa.me/919247391081?text=${encodedText}`;
    window.open(waUrl, '_blank');
  };

  return (
    <>
      {/* 2. Sticky Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-brand" style={{ cursor: 'pointer' }} onClick={() => navigateTo('home')}>
          <div className="nav-logo">
             Prasad<span>Sweets</span>
          </div>
        </div>

        {/* Navigation Links using standard <a> tags to match index.css styles */}
        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <a 
              href="#home" 
              className={currentPage === 'home' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#shop" 
              className={currentPage === 'shop' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); navigateTo('shop'); }}
            >
              Shop Online
            </a>
          </li>
          <li>
            <a 
              href="#story" 
              className={currentPage === 'story' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); navigateTo('story'); }}
            >
              Our Story
            </a>
          </li>
          <li>
            <a 
              href="#gallery" 
              className={currentPage === 'gallery' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); navigateTo('gallery'); }}
            >
              Gallery
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={currentPage === 'contact' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}
            >
              Get in Touch
            </a>
          </li>
        </ul>

        {/* Actions (Cart & Mobile Toggle) */}
        <div className="nav-actions">
          {/* Cart Icon Trigger */}
          <button 
            className={`cart-trigger ${currentPage === 'cart' ? 'active' : ''}`} 
            onClick={() => navigateTo('cart')} 
            aria-label="View Cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {cart.length > 0 && (
              <span className="cart-badge">{cart.length}</span>
            )}
          </button>

          {/* Mobile Menu Icon */}
          <button className="menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Menu">
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Pages Container */}
      <main>
        {/* ==================== HOME PAGE VIEW ==================== */}
        {currentPage === 'home' && (
          <>
            {/* 1. Hero Section - Premium Split Layout */}
            <section className="hero-section">
              <div className="hero-container">
                <div className="hero-left">
                  <div className="hero-badge">
                    <span className="badge-glow"></span>
                    <span className="badge-text">Naidupet's Famous Mithai Since 1978</span>
                  </div>
                  <h1 className="hero-title">
                    Rooted in <span className="highlight-text">Tradition</span>, Crafted with <span className="highlight-text">Care</span>
                  </h1>
                  <p className="hero-subtitle">
                    Relish the authentic taste of pure ghee sweets, handmade savouries, and legendary milk delicacies made using family recipes handed down over generations.
                  </p>
                  
                  <div className="hero-buttons">
                    <button className="btn btn-primary btn-glow" onClick={() => navigateTo('shop')}>
                      <span>View Shop Menu</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigateTo('contact')}>
                      Find Our Store
                    </button>
                  </div>

                  {/* Hero Stats */}
                  <div className="hero-stats">
                    <div className="stat-item">
                      <span className="stat-number">40+</span>
                      <span className="stat-label">Years of Legacy</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                      <span className="stat-number">100%</span>
                      <span className="stat-label">Pure Ghee</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                      <span className="stat-number">Daily</span>
                      <span className="stat-label">Fresh Batches</span>
                    </div>
                  </div>
                </div>

                <div className="hero-right">
                  <div className="hero-image-frame">
                    <div className="gold-ring-back"></div>
                    <div className="hero-image-slider">
                      {heroImages.map((img, idx) => (
                        <img 
                          key={idx}
                          src={img} 
                          alt={`Delicious Sweets Showcase ${idx + 1}`} 
                          className={`hero-slide-img ${idx === heroIndex ? 'active' : ''}`}
                        />
                      ))}
                    </div>

                  </div>
                </div>


              </div>
            </section>

            {/* 2. Handcrafting / Brand intro Section */}
            <div className="brand-intro">
              <span className="brand-icon">❖</span>
              <h3>Handcrafting Heritage Since 1978</h3>
              <p>
                Founded by <strong>Sri Maddli Venkaiah</strong> on Bazar Street in Naidupet, Prasad Sweets Shop has remained a cornerstone of celebrations for over four decades. We pride ourselves on preserving age-old cooking techniques, sourcing premium milk and pure ghee, and serving our community with honest, delicious, preservative-free treats that sweeten every special occasion.
              </p>
            </div>

            {/* 3. Explore Our Range (Filters / Category strip - redirects to Shop Online) */}
            <div className="category-strip">
              <div className="category-strip-inner">
                <div className="section-title" style={{ marginBottom: '60px' }}>
                  <h2>Explore Our Range</h2>
                  <p>Select a category to view items in our online shop</p>
                </div>
                <div className="category-cards">
                  {CATEGORIES.map((cat, idx) => (
                    <div 
                      key={idx} 
                      className="category-card"
                      onClick={() => {
                        setActiveCategory(cat.name);
                        navigateTo('shop');
                      }}
                    >
                      <img src={cat.img} alt={cat.name} className="category-card-img" />
                      <h4>{cat.name}</h4>
                    </div>
                  ))}
 
                </div>
              </div>
            </div>

            {/* 4. Best Sellers Section */}
            <section style={{ borderTop: '1px solid #E8DFD3', background: 'linear-gradient(180deg, var(--color-bg-cream) 0%, var(--color-accent-light) 100%)', padding: '80px 5% 60px' }}>
              <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                <div className="section-title">
                  <h2>Our Best Sellers</h2>
                  <p>Naidupet's absolute favorites, fresh and ready for you</p>
                </div>
                <div className="product-grid">
                  {bestSellers.slice(0, 4).map(product => (
                    <div key={product.id} className="product-card">
                      <div className="product-img-wrapper">
                        <span className="product-badge">Best Seller</span>
                        <img src={product.image} alt={product.name} className="product-img" />
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-desc">{product.desc}</p>
                        <div className="product-meta">
                          <div className="product-price">
                            ₹{product.price} <span>/ {product.unit}</span>
                          </div>
                          <div className="product-action">
                            <div className="qty-picker">
                              <button className="qty-btn" onClick={() => handleCardQtyChange(product.id, -product.step, product)}>-</button>
                              <span className="qty-val">{(selectedQuantities[product.id] || product.minQty)}</span>
                              <button className="qty-btn" onClick={() => handleCardQtyChange(product.id, product.step, product)}>+</button>
                            </div>
                            <button className="btn-add" onClick={() => handleAddToCart(product)}>
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. Prasad Sweet Specials (Festive Specials) Section */}
            <section style={{ borderTop: '1px solid #E8DFD3', backgroundColor: 'var(--color-bg-white)', padding: '80px 5% 60px' }}>
              <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                <div className="section-title">
                  <h2>Prasad Sweet Specials</h2>
                  <p>Specially crafted for celebrations and special occasions</p>
                </div>
                <div className="product-grid">
                  {specials.slice(0, 6).map(product => (
                    <div key={product.id} className="product-card">
                      <div className="product-img-wrapper">
                       
                        <img src={product.image} alt={product.name} className="product-img" />
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-desc">{product.desc}</p>
                        <div className="product-meta">
                          <div className="product-price">
                            ₹{product.price} <span>/ {product.unit}</span>
                          </div>
                          <div className="product-action">
                            <div className="qty-picker">
                              <button className="qty-btn" onClick={() => handleCardQtyChange(product.id, -product.step, product)}>-</button>
                              <span className="qty-val">{(selectedQuantities[product.id] || product.minQty)}</span>
                              <button className="qty-btn" onClick={() => handleCardQtyChange(product.id, product.step, product)}>+</button>
                            </div>
                            <button className="btn-add" onClick={() => handleAddToCart(product)}>
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. Why Choose Us Feature Blocks */}
            <section style={{ borderTop: '1px solid #E8DFD3', backgroundColor: 'var(--color-accent-light)', padding: '80px 5% 60px' }}>
              <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                <div className="section-title">
                  <h2>Why Choose Us</h2>
                  <p>We craft sweets that tell stories of purity and passion</p>
                </div>
                <div className="features-grid">
                  <div className="feature-block">
                    
                    <h3>40+ Years of Heritage</h3>
                    <p>Time-tested recipes handed down from our founder to maintain original tastes and textures over the decades.</p>
                  </div>
                  <div className="feature-block">
                    
                    <h3>Pure Ghee & Ingredients</h3>
                    <p>We use 100% pure dairy ghee, fresh whole milk, and premium nuts. Strictly no artificial colors or additives.</p>
                  </div>
                  <div className="feature-block">
                    
                    <h3>Handmade with Care</h3>
                    <p>Every single piece of laddu, kova, and murukku is meticulously shaped and fried by master chefs with utmost hygiene.</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ==================== SHOP ONLINE PAGE VIEW ==================== */}
        {currentPage === 'shop' && (
          <>
            {/* Header Banner using Hero2.png */}
            <section id="shop" className="container" style={{ minHeight: '60vh', paddingTop: '40px' }}>
              <div className="section-title">
                <h2>Our Menu</h2>
                <p>Handcrafting fresh sweets and snacks daily, delivered straight to your home</p>
              </div>

              {/* Search and Category Filters ONLY on Shop Online page */}
              <div className="menu-controls" style={{ marginBottom: '35px' }}>
                <div style={{ maxWidth: '500px', width: '100%', margin: '0 auto 20px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '15px', top: '12px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </span>
                  <input 
                    type="text" 
                    placeholder="Search sweets or snacks by name..." 
                    className="form-input" 
                    style={{ paddingLeft: '45px', borderRadius: '30px', fontSize: '1rem', height: '44px', border: '1px solid var(--color-accent)' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="menu-tabs">
                  {['All', 'Ghee Sweets', 'Milk Sweets', 'Dry Fruit Sweets', 'Halwa Specials', 'Savouries'].map((tab, idx) => (
                    <button
                      key={idx}
                      className={`menu-tab ${activeCategory === tab ? 'active' : ''}`}
                      onClick={() => setActiveCategory(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {searchQuery && (
                  <div className="search-results-info" style={{ marginTop: '15px' }}>
                    Showing search results for "{searchQuery}" ({filteredProducts.length} items found)
                  </div>
                )}
              </div>

              {/* Product Cards Grid */}
              {filteredProducts.length > 0 ? (
                <div className="product-grid">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                      <div className="product-img-wrapper">
                        {product.bestSeller && <span className="product-badge">Best Seller</span>}
                        
                        <img src={product.image} alt={product.name} className="product-img" />
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-desc">{product.desc}</p>
                        <div className="product-meta">
                          <div className="product-price">
                            ₹{product.price} <span>/ {product.unit}</span>
                          </div>
                          <div className="product-action">
                            <div className="qty-picker">
                              <button className="qty-btn" onClick={() => handleCardQtyChange(product.id, -product.step, product)}>-</button>
                              <span className="qty-val">{(selectedQuantities[product.id] || product.minQty)}</span>
                              <button className="qty-btn" onClick={() => handleCardQtyChange(product.id, product.step, product)}>+</button>
                            </div>
                            <button className="btn-add" onClick={() => handleAddToCart(product)}>
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-muted)' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '15px', color: 'var(--color-border)' }}>
                    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <h3>No items found</h3>
                  <p>Try searching for something else or changing the category filter.</p>
                </div>
              )}
            </section>
          </>
        )}

        {/* ==================== OUR STORY PAGE VIEW ==================== */}
        {currentPage === 'story' && (
          <>

            <section id="legacy" className="container" style={{ minHeight: '60vh', paddingTop: '40px' }}>
              <div className="section-title">
                <h2>Our Legacy</h2>
                <p>Crafting sweet memories for over four decades</p>
              </div>
              
              <div className="legacy-container" style={{ gridTemplateColumns: '1fr', maxWidth: '850px', margin: '0 auto', gap: '30px' }}>
                <div className="legacy-img-frame" style={{ width: '100%', marginBottom: '20px' }}>
                  <img 
                    src={hero1} 
                    alt="Traditional Sweet Making Process" 
                    className="legacy-img"
                    style={{ height: '400px', width: '100%', objectFit: 'cover' }}
                  />
                  <div className="legacy-badge" style={{ bottom: '15px', right: '15px' }}>
                    1978
                    <span>ESTD</span>
                  </div>
                </div>

                <div className="legacy-text" style={{ fontSize: '1.05rem', lineHeight: '1.9' }}>
                  <p>
                    In 1978, in the quiet, bustling lanes of Bazar Street in Naidupet, <strong>Sri Maddli Venkaiah</strong> founded a modest confectionery shop with a simple mission: to make sweets that are pure, fresh, and bring joy to every home.
                  </p>
                  <p>
                    Under his guidance, the kitchen became a sanctuary of authentic flavors. Unlike large commercial chains, Sri Venkaiah believed in the art of the slow cook. He insisted that the milk must be reduced slowly over low embers, chickpea flour must be hand-ground, and only the richest dairy ghee was to be used. This dedication to purity gave birth to our legendary <strong>Kova Puri</strong>, which remains unmatched in the entire district.
                  </p>
                  
                  <div className="modal-quote" style={{ margin: '30px 0' }}>
                    "A sweet is not just food; it is an offering of love, a token of celebration, and a bridge between hearts. It must be prepared with the absolute highest purity."
                    <br />
                    <span style={{ fontSize: '0.85rem', fontStyle: 'normal', color: 'var(--color-text-muted)', fontWeight: '600' }}>— Sri Maddli Venkaiah, Founder</span>
                  </div>

                  <p>
                    As decades passed, Naidupet grew, but the commitment of Prasad Sweets remained unchanged. Today, the family legacy is carried forward with the same values. We continue to source ingredients locally, support regional dairy farmers, and employ handcrafting methods rather than factory machinery.
                  </p>
                  <p>
                    Whether you are sharing our melt-in-your-mouth Kaju Katli, gifting box loads of Sanna Boondi Laddu for a wedding, or enjoying a packet of crunchy Minapappu Murukku with evening chai, you are tasting over forty years of devotion, family heritage, and pure ghee tradition.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ==================== GALLERY PAGE VIEW ==================== */}
        {currentPage === 'gallery' && (
          <>


            <section id="gallery" className="container" style={{ minHeight: '60vh', paddingTop: '40px' }}>
              <div className="section-title">
                <h2>Our Sweet Gallery</h2>
                <p>A glimpse into our kitchen, traditional process, and shop counters</p>
              </div>
              <div className="gallery-grid">
                {GALLERY.map((item, idx) => (
                  <div key={idx} className="gallery-item">
                    <img src={item.img} alt={item.title} className="gallery-item-img" />
                    <div className="gallery-overlay">
                      <h4>{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ==================== CONTACT PAGE VIEW ==================== */}
        {currentPage === 'contact' && (
          <>

            <section id="contact" className="container" style={{ minHeight: '60vh', paddingTop: '40px' }}>
              <div className="section-title">
                <h2>Get in Touch</h2>
                <p>Visit us in person, call us, or place an order via WhatsApp</p>
              </div>
              
              <div className="contact-container">
                <div className="contact-info-cards">
                  <div className="contact-info-card">
                    
                    <div className="contact-info-content">
                      <h4>Our Location</h4>
                      <p>
                        Bazar Street, Near Sri Rama Mandiram,<br />
                        Opp. Balaji Medicals, Naidupet,<br />
                        Tirupati District, Andhra Pradesh - 524126
                      </p>
                    </div>
                  </div>
                  <div className="contact-info-card">
                    
                    <div className="contact-info-content">
                      <h4>Call / WhatsApp</h4>
                      <p>
                        +91 92473 91081
                      </p>
                    </div>
                  </div>
                  <div className="contact-info-card">
                    
                    <div className="contact-info-content">
                      <h4>Opening Hours</h4>
                      <p>
                        Monday – Sunday: 9:00 AM – 10:00 PM<br />
                        (Open all days including festivals)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google Map Iframe */}
                <div className="map-wrapper">
                  <iframe
                    title="Prasad Sweets Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d964.887568853733!2d79.89492426947214!3d13.907695699298418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d1b00121d6513%3A0x9be77dd651f1b479!2sPrasad%20Sweets%20Shop!5e0!3m2!1sen!2sin!4v1719850000000!5m2!1sen!2sin"
                    className="map-iframe"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ minHeight: '380px' }}
                  ></iframe>
                </div>
              </div>

              {/* Local Contact Form */}
              <div style={{ maxWidth: '600px', margin: '60px auto 0', padding: '30px', backgroundColor: 'var(--color-bg-white)', borderRadius: '8px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ marginBottom: '15px', color: 'var(--color-primary-dark)', fontSize: '1.4rem', fontFamily: 'var(--font-serif)', textAlign: 'center' }}>Send Us a Message</h3>
                <p style={{ textAlign: 'center', marginBottom: '25px', fontSize: '0.9rem' }}>Have questions about our menus, custom catering, or bulk orders? Reach out directly!</p>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const name = e.target.elements.name.value;
                  const msg = e.target.elements.message.value;
                  if (!name || !msg) return;
                  const formatted = `Hello Prasad Sweets! My name is ${name}. \nMessage: ${msg}`;
                  window.open(`https://wa.me/919247391081?text=${encodeURIComponent(formatted)}`, '_blank');
                }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="msg-name">Your Name</label>
                    <input type="text" id="msg-name" name="name" className="form-input" placeholder="Enter your name" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="msg-text">Your Message / Enquiry</label>
                    <textarea id="msg-text" name="message" className="form-input" placeholder="Type your message here..." required rows="4" style={{ resize: 'vertical' }}></textarea>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                      Send via WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </>
        )}

        {/* ==================== CART PAGE VIEW ==================== */}
        {currentPage === 'cart' && (
          <section className="cart-page">
            <div className="cart-page-header">
              <h2 className="cart-page-title">Your Shopping Cart</h2>
              <button className="btn-continue-shopping" onClick={() => navigateTo('shop')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(180deg)', marginRight: '5px' }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
                Continue Shopping
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty-state">
                <div className="cart-empty-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Browse our wide range of traditional sweets & savouries and add items to your cart.</p>
                <button className="btn btn-primary btn-glow" onClick={() => navigateTo('shop')}>
                  Shop Sweets Now
                </button>
              </div>
            ) : (
              <div className="cart-grid">
                {/* Left side: Cart items list */}
                <div className="cart-items-list">
                  {cart.map((item, idx) => (
                    <div key={idx} className="cart-page-item">
                      <img src={item.product.image} alt={item.product.name} className="cart-page-item-img" />
                      <div className="cart-page-item-details">
                        <div className="cart-page-item-name">{item.product.name}</div>
                        <div className="cart-page-item-price">₹{item.product.price} / {item.product.unit}</div>
                        <div className="cart-page-item-row">
                          <div className="qty-picker">
                            <button className="qty-btn" onClick={() => handleCartQtyUpdate(item.product.id, -item.product.step)}>-</button>
                            <span className="qty-val">{item.quantity}</span>
                            <button className="qty-btn" onClick={() => handleCartQtyUpdate(item.product.id, item.product.step)}>+</button>
                          </div>
                          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>({item.product.unit})</span>
                        </div>
                      </div>
                      <div className="cart-page-item-right">
                        <button className="cart-page-item-remove" onClick={() => handleRemoveFromCart(item.product.id)} aria-label="Remove Item">
                          ✕
                        </button>
                        <div className="cart-page-item-total">₹{(item.product.price * item.quantity).toFixed(0)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right side: Checkout card */}
                <div className="cart-checkout-card">
                  <h4>Order Summary</h4>
                  <div className="cart-summary-line">
                    <span>Subtotal:</span>
                    <span>₹{cartTotals.totalAmount.toFixed(0)}</span>
                  </div>
                  <div className="cart-summary-line">
                    <span>Delivery:</span>
                    <span style={{ color: 'var(--color-success)', fontWeight: '600' }}>
                      {checkoutForm.deliveryType === 'delivery' ? '₹30 (Local Delivery)' : 'FREE (Store Pickup)'}
                    </span>
                  </div>
                  <div className="cart-summary-total" style={{ borderTop: '2px solid var(--color-accent-light)', paddingTop: '10px', marginTop: '10px' }}>
                    <span>Total Amount:</span>
                    <span>₹{(cartTotals.totalAmount + (checkoutForm.deliveryType === 'delivery' ? 30 : 0)).toFixed(0)}</span>
                  </div>

                  <form onSubmit={handleWhatsAppCheckout} style={{ marginTop: '25px', borderTop: '1px dashed var(--color-border)', paddingTop: '20px' }}>
                    <h4 style={{ fontSize: '1.05rem', border: 'none', padding: 0, marginBottom: '15px' }}>Checkout Details</h4>
                    
                    <div className="radio-toggle">
                      <label className="radio-label">
                        <input 
                          type="radio" 
                          name="deliveryType" 
                          value="pickup" 
                          checked={checkoutForm.deliveryType === 'pickup'} 
                          onChange={handleFormChange} 
                        />
                        Store Pickup
                      </label>
                      <label className="radio-label">
                        <input 
                          type="radio" 
                          name="deliveryType" 
                          value="delivery" 
                          checked={checkoutForm.deliveryType === 'delivery'} 
                          onChange={handleFormChange} 
                        />
                        Home Delivery
                      </label>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="cart-cust-name">Your Full Name *</label>
                      <input 
                        type="text" 
                        id="cart-cust-name" 
                        name="name" 
                        className="form-input" 
                        placeholder="Enter your name" 
                        required 
                        value={checkoutForm.name}
                        onChange={handleFormChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="cart-cust-phone">WhatsApp Number *</label>
                      <input 
                        type="tel" 
                        id="cart-cust-phone" 
                        name="phone" 
                        className="form-input" 
                        placeholder="e.g. 9876543210" 
                        required 
                        value={checkoutForm.phone}
                        onChange={handleFormChange}
                      />
                    </div>

                    {checkoutForm.deliveryType === 'delivery' && (
                      <div className="form-group">
                        <label className="form-label" htmlFor="cart-cust-address">Delivery Address *</label>
                        <textarea 
                          id="cart-cust-address" 
                          name="address" 
                          className="form-input" 
                          placeholder="Street, Landmark, City/Area in Naidupet" 
                          required 
                          rows="3"
                          style={{ fontFamily: 'var(--font-sans)', resize: 'vertical' }}
                          value={checkoutForm.address}
                          onChange={handleFormChange}
                        ></textarea>
                      </div>
                    )}

                    <button type="submit" className="btn-whatsapp-checkout" style={{ marginTop: '25px' }}>
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style={{ marginRight: '8px', marginBottom: '-2px' }}>
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.528 1.97 14.076 1.037 11.99 1.037c-5.437 0-9.863 4.373-9.867 9.801 0 1.735.48 3.427 1.386 4.935L2.475 20.3l4.172-1.146zm11.233-5.32c-.328-.164-1.942-.959-2.242-1.069-.3-.11-.518-.165-.736.165-.219.329-.848 1.069-1.039 1.288-.192.22-.383.247-.711.082-.328-.164-1.386-.51-2.64-1.627-.975-.87-1.633-1.946-1.824-2.274-.192-.329-.02-.507.144-.671.147-.148.328-.383.492-.575.164-.192.219-.328.328-.547.11-.219.055-.411-.027-.575-.082-.164-.736-1.776-1.009-2.434-.265-.639-.53-.55-.736-.56-.192-.01-.41-.012-.628-.012-.218 0-.573.082-.873.411-.3.33-1.146 1.121-1.146 2.735 0 1.614 1.174 3.176 1.338 3.395.164.22 2.313 3.532 5.6 4.949.781.337 1.39.539 1.865.69.785.249 1.498.214 2.062.129.629-.094 1.942-.795 2.215-1.56.273-.767.273-1.424.192-1.56-.081-.137-.3-.219-.628-.383z" />
                      </svg>
                      Send Order on WhatsApp
                    </button>
                  </form>
                  
                  <div className="bulk-note" style={{ marginTop: '20px' }}>
                    <strong>Bulk & Event Orders:</strong> For weddings, bulk orders, or corporate gifting, please reach us directly at <strong>+91 92473 91081</strong>.
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* 13. Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>Prasad<span>Sweets</span></h3>
            <p>
              Serving authentic traditional sweets, ghee snacks, and rich milk delicacies of Naidupet since 1978.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" className="social-icon" target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" className="social-icon" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><button onClick={() => navigateTo('home')} style={{ background: 'none', border: 'none', font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}>Home</button></li>
              <li><button onClick={() => navigateTo('shop')} style={{ background: 'none', border: 'none', font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}>Shop Online</button></li>
              <li><button onClick={() => navigateTo('story')} style={{ background: 'none', border: 'none', font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}>Our Story</button></li>
              <li><button onClick={() => navigateTo('contact')} style={{ background: 'none', border: 'none', font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}>Get in Touch</button></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Our Policies</h4>
            <ul className="footer-links">
              <li><button onClick={() => navigateTo('shop')} style={{ background: 'none', border: 'none', font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}>Order & Returns</button></li>
              <li><button onClick={() => navigateTo('shop')} style={{ background: 'none', border: 'none', font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}>Bulk Order Policies</button></li>
              <li><button onClick={() => navigateTo('contact')} style={{ background: 'none', border: 'none', font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}>Delivery Areas</button></li>
              <li><button onClick={() => navigateTo('contact')} style={{ background: 'none', border: 'none', font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}>Terms of Service</button></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Contact Info</h4>
            <ul className="footer-contact-details">
              <li>
                <span className="footer-contact-icon">*</span>
                <span>Bazar Street, Near Sri Rama Mandiram, Opp. Balaji Medicals, Naidupet, AP - 524126</span>
              </li>
              <li>
                <span className="footer-contact-icon">*</span>
                <span>+91 92473 91081</span>
              </li>
              <li>
                <span className="footer-contact-icon">*</span>
                <span>orders@prasadsweetsap.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Prasad Sweets Shop. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px', color: '#C0B0A0' }}>
            <span>FSSAI License: #21523023000845</span>
            <span>|</span>
            <span>GSTIN: 37AACFP1234F1Z0</span>
          </div>
        </div>
      </footer>

      {/* 14. Floating WhatsApp button for general support/enquiry */}
      <a 
        href="https://wa.me/919247391081?text=Hello!%20I%20have%20an%20enquiry%20about%20your%20sweets." 
        className="btn-float-whatsapp" 
        target="_blank" 
        rel="noreferrer" 
        aria-label="Contact support on WhatsApp"
      >
        <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24" style={{ marginTop: '2px' }}>
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.528 1.97 14.076 1.037 11.99 1.037c-5.437 0-9.863 4.373-9.867 9.801 0 1.735.48 3.427 1.386 4.935L2.475 20.3l4.172-1.146zm11.233-5.32c-.328-.164-1.942-.959-2.242-1.069-.3-.11-.518-.165-.736.165-.219.329-.848 1.069-1.039 1.288-.192.22-.383.247-.711.082-.328-.164-1.386-.51-2.64-1.627-.975-.87-1.633-1.946-1.824-2.274-.192-.329-.02-.507.144-.671.147-.148.328-.383.492-.575.164-.192.219-.328.328-.547.11-.219.055-.411-.027-.575-.082-.164-.736-1.776-1.009-2.434-.265-.639-.53-.55-.736-.56-.192-.01-.41-.012-.628-.012-.218 0-.573.082-.873.411-.3.33-1.146 1.121-1.146 2.735 0 1.614 1.174 3.176 1.338 3.395.164.22 2.313 3.532 5.6 4.949.781.337 1.39.539 1.865.69.785.249 1.498.214 2.062.129.629-.094 1.942-.795 2.215-1.56.273-.767.273-1.424.192-1.56-.081-.137-.3-.219-.628-.383z" />
        </svg>
      </a>

      {/* 15. Cart Toast Notification Popup */}
      <div className={`cart-toast ${toast.show ? 'active' : ''}`}>
        <div className="toast-content">
          <span className="toast-icon"></span>
          <span className="toast-msg">{toast.message}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn-toast-action" onClick={() => navigateTo('cart')}>
            View Cart
          </button>
          <button className="btn-close-toast" onClick={() => setToast({ show: false, message: '' })} aria-label="Close Notification">✕</button>
        </div>
      </div>
    </>
  );
}
