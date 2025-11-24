import { useMemo, useState } from 'react';
import './App.css';

const productCatalog = [
  {
    id: 'daily-tote',
    name: 'Everyday Canvas Tote',
    price: 48,
    rating: 4.6,
    reviews: 162,
    stock: 12,
    tag: 'Bestseller',
    image:
      'https://images.unsplash.com/photo-1721329608342-1dc3be1cbeed?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'espresso-mugs',
    name: 'Stoneware Espresso Set',
    price: 32,
    rating: 4.8,
    reviews: 98,
    stock: 8,
    tag: 'Limited',
    image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'linen-throw',
    name: 'Linen Throw Blanket',
    price: 72,
    rating: 4.9,
    reviews: 203,
    stock: 5,
    tag: 'New arrival',
    image:
      'https://images.unsplash.com/photo-1484100356142-db6ab6244067?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'amber-candle',
    name: 'Amber & Moss Candle',
    price: 28,
    rating: 4.7,
    reviews: 341,
    stock: 22,
    tag: 'Staff pick',
    image:
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'pour-over',
    name: 'Glass Pour-Over Kit',
    price: 56,
    rating: 4.5,
    reviews: 121,
    stock: 10,
    tag: 'Giftable',
    image:
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'desk-planter',
    name: 'Desk Planter Duo',
    price: 38,
    rating: 4.4,
    reviews: 77,
    stock: 15,
    tag: 'Easy care',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
  },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  return (
    <span className="rating">
      {Array.from({ length: fullStars }).map((_, idx) => (
        <span key={idx}>★</span>
      ))}
      {hasHalf && <span className="half">★</span>}
      <span className="rating-value">{rating.toFixed(1)}</span>
    </span>
  );
};

function App() {
  const [cart, setCart] = useState({});

  const handleAdd = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: {
        ...product,
        quantity: prev[product.id] ? prev[product.id].quantity + 1 : 1,
      },
    }));
  };

  const handleDecrease = (productId) => {
    setCart((prev) => {
      const existing = prev[productId];
      if (!existing) return prev;
      if (existing.quantity === 1) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [productId]: { ...existing, quantity: existing.quantity - 1 },
      };
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
  };

  const cartItems = useMemo(() => Object.values(cart), [cart]);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 7.5 : 0;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  return (
    <div className="app">
      <header className="hero">
        <div className="brand">
          <span className="badge">New</span>
          <h1>Hearth &amp; Home</h1>
          <p>Curated objects for slower living</p>
        </div>
        <div className="hero-content">
          <div>
            <p className="eyebrow">Weekend feature</p>
            <h2>Warm neutrals for welcoming spaces</h2>
            <p className="lede">
              Layer soft textures, hand-poured candles, and easy greenery for an
              instant refresh. Ships free over $150.
            </p>
            <div className="hero-actions">
              <button className="primary">Shop the edit</button>
              <button className="ghost">View lookbook</button>
            </div>
          </div>
          <div className="hero-card">
            <span>Cart</span>
            <strong>{cartCount} items</strong>
            <p>{subtotal ? formatCurrency(subtotal) : 'Empty cart'}</p>
          </div>
        </div>
      </header>

      <main className="layout">
        <section className="catalog">
          <div className="catalog-head">
            <div>
              <h3>Featured goods</h3>
              <p>Fresh finds restocked this morning — going fast.</p>
            </div>
            <div className="filters">
              <input placeholder="Search products" aria-label="Search" />
              <button className="ghost">Filter</button>
            </div>
          </div>
          <div className="product-grid">
            {productCatalog.map((product) => (
              <article key={product.id} className="product-card">
                <img src={product.image} alt={product.name} loading="lazy" />
                <span className="tag">{product.tag}</span>
                <div className="product-body">
                  <div>
                    <div className="product-head">
                      <h4>{product.name}</h4>
                      <p>{formatCurrency(product.price)}</p>
                    </div>
                    <div className="meta">
                      <RatingStars rating={product.rating} />
                      <span>• {product.reviews} reviews</span>
                    </div>
                    <p className="stock">
                      {product.stock > 4
                        ? `${product.stock} in stock`
                        : `Only ${product.stock} left`}
                    </p>
                  </div>
                  <button
                    className="primary"
                    onClick={() => handleAdd(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Sold out' : 'Add to cart'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="cart">
          <div className="cart-head">
            <h3>Your cart</h3>
            <span>{cartCount} items</span>
          </div>
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Nothing added yet.</p>
              <small>Pick at least two pieces for free shipping.</small>
            </div>
          ) : (
            <>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <p>{formatCurrency(item.price)}</p>
                    </div>
                    <div className="quantity">
                      <button
                        className="ghost"
                        onClick={() => handleDecrease(item.id)}
                        aria-label={`Decrease ${item.name}`}
                      >
                        –
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="ghost"
                        onClick={() => handleAdd(item)}
                        aria-label={`Increase ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="link"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-summary">
                <div>
                  <span>Subtotal</span>
                  <strong>{formatCurrency(subtotal)}</strong>
                </div>
                <div>
                  <span>Shipping</span>
                  <strong>{shipping ? formatCurrency(shipping) : 'FREE'}</strong>
                </div>
                <div>
                  <span>Tax</span>
                  <strong>{formatCurrency(tax)}</strong>
                </div>
                <div className="total">
                  <span>Total due</span>
                  <strong>{formatCurrency(total)}</strong>
                </div>
                <button className="primary stretch">Checkout securely</button>
              </div>
            </>
          )}
        </aside>
      </main>
    </div>
  );
}

export default App;
