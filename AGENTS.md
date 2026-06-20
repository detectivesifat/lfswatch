# LFS Watches - Project Guidelines

## Tech Stack
- React 18 + Vite 8
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- Lucide React (icons)
- React Router DOM v7 (routing)
- React Context (cart state management)

## Brand
- Name: LFS Watches
- Colors: #02cbf9 (brand), #58e7e4 (teal), #080c10 (dark-900), #0d1117 (dark-800), #111827 (dark-700)
- Font: Nunito (Google Fonts, weights 400-900)
- Currency: BDT (৳)

## Project Structure
```
src/
  components/
    Navbar.jsx       - Fixed top nav: logo, search, call now, WhatsApp, cart toggle
    HeroBanner.jsx   - Auto-playing video banner with fallback gradient
    ProductGrid.jsx  - "Our Collection" heading + responsive product grid
    ProductCard.jsx  - Individual product card: image, name, price, add-to-cart
    CartSidebar.jsx  - Slide-in cart panel: items, qty controls, checkout button
    Footer.jsx       - 2-column: copyright left, 2x2 social/contact grid right
  context/
    CartContext.jsx   - Cart state + localStorage persistence
  data/
    products.js      - 50 products from xlsx (Cloudinary image URLs)
  pages/
    Home.jsx         - Main page: HeroBanner + ProductGrid
    Checkout.jsx     - Order summary + place order button
  App.jsx            - Root router: wraps Navbar, CartSidebar, pages, Footer
  main.jsx           - Entry point
  index.css          - Global styles, theme tokens, zoom-centering rules
```

## Key Rules
- NO discount badges on product cards (only show name + price + add to cart)
- Sticky navbar hides on scroll down, shows on scroll up (useEffect + scroll listener + requestAnimationFrame)
- Cart sidebar slides in from right on add to cart (auto on PC, tap on mobile)
- Product images come from Cloudinary URLs (from demo site)
- All 50 products from the xlsx spreadsheet are included in src/data/products.js
- Footer is minimal: logo, contact info, social icons, copyright
- "Continue to Buy" button in cart sidebar links to /checkout (placeholder page)
- Cart state persists in localStorage
- Dark theme throughout (#080c10 background)

## Component Details

### Navbar.jsx
- Fixed top nav with `z-50`, backdrop blur, dark background
- Logo: `logo.svg` from `/images/logo.svg` + "LFS Watch" text
- Search: Desktop (hidden on mobile, max-w-lg) + Mobile toggle
- Call Now: `tel:+8801577080024` with Phone icon
- WhatsApp: `https://wa.me/8801577080024` with inline SVG
- Cart: Toggle button with badge count, opens CartSidebar
- Scroll behavior: hides on scroll down, shows on scroll up + at top

### HeroBanner.jsx
- Imports `banner.mp4` from root (copied to dist/assets/)
- Auto-playing, muted, looped, playsInline
- Fallback gradient if video fails
- Rounded-3xl container with 16/6 aspect ratio
- Top/bottom gradient fades for navbar/content blending

### ProductGrid.jsx
- Section header: "Our Collection" with gradient divider
- Responsive grid: 2 cols (mobile) → 3 (sm) → 4 (lg) → 5 (xl)
- Maps all products from data/products.js

### ProductCard.jsx
- Dark card: gradient bg, border-white/5, hover effects
- Image: aspect-square, object-cover, hover scale 108%
- Name: line-clamp-2, min-h for alignment
- Price: ৳{price.toLocaleString()} in brand color
- Add to Cart: toggles to "Added!" with Check icon for 1.5s

### CartSidebar.jsx
- Slide-in panel from right (w-full on mobile, 400px sm, 430px lg)
- Backdrop: bg-black/70 + backdrop-blur-sm
- Header: ShoppingBag icon, item count
- Items: image, name, price, qty controls (+/-), line total, remove
- Footer: total + "Continue to Buy" button (gradient, shadow, hover lift)

### Footer.jsx
- 2-column layout on desktop, stacked on mobile
- Left: LFS Watch logo + copyright
- Right: 2x2 grid: Facebook, WhatsApp, TikTok, Email
- All social links use inline SVGs (lucide-react lacks brand icons)
- Colors: Facebook (blue-500), WhatsApp (green-500), TikTok (black/white), Email (brand)

### CartContext.jsx
- State: items[], isOpen
- localStorage persistence on items change
- Functions: addItem, removeItem, updateQuantity, clearCart, toggleCart, closeCart
- Computed: cartCount (sum of quantities), cartTotal (sum of price * qty)

### ProductDetail.jsx
- Route: /product/:id
- Left: large product image, Right: name, price, Buy Now + Add to Cart, Order via WhatsApp/Facebook, Copy Product Info
- Below: spec table with all product details from products.js specs array
- Matches dark theme (#080c10 background, #0d1117 card, brand accents)

### ProductCard.jsx
- Wrapped in `<Link to={/product/:id}>` — clicking card navigates to product page
- Add to Cart button uses `e.preventDefault()` to avoid navigation
- Same hover/visual effects as before

### Checkout.jsx
- Empty cart: illustration + "Continue Shopping" link
- Has items: order summary, shipping method, payment method, order total — all in ONE combined box
- Action buttons (WhatsApp + Facebook) with bg↔text color swap on hover, slight shift on click
- Facebook instruction note: bold, large (font-extrabold text-lg text-white) like Order Total header

### index.css
- @import "tailwindcss" + @theme with custom colors
- @import Google Fonts (Nunito)
- html/body/#root: zoom-centering (margin: 0 auto !important, max-width: 1280px)
- Custom scrollbar with brand gradient
- Utility classes: .btn-primary, .card-dark, .gradient-text, .glow-brand, .section-divider

## Product Data Source
- Spreadsheet: smartbuybd-vercel-app-2026-06-19.xlsx (in parent folder)
- Headers: web_scraper_order, web_scraper_start_url, data, data2, data3, data4, data5, image
- data = product name, data2 = sale price, data3 = original price, data4 = discount, data5 = "Add to Cart", image = Cloudinary URL
- Products extracted with: data (name) + data2 (price as integer) + image (URL)
- Note: Product names with double quotes (e.g. 1.39" TFT) had quotes replaced with single quotes to avoid JS syntax errors

## Assets
- `public/images/logo.svg` - Logo file (3.3 KB)
- `public/images/banner.mp4` - Hero video (referenced as `/images/banner.mp4` in HeroBanner.jsx, copied to dist on build)
- `public/favicon.svg` - Default Vite favicon

## Build Notes
- Lucide-react does NOT export Facebook, Instagram, WhatsApp, TikTok, YouTube icons - use inline SVGs instead
- Product names may contain special characters (quotes, en-dashes) - escape or replace them in products.js
- Tailwind CSS v4 uses `@import "tailwindcss"` (not @tailwind directives)
- @import url() must precede all other rules (warning shown but works)
- Video file imported via relative path in HeroBanner.jsx

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build

## Status: BUILD PASSING ✓
- All components implemented and working
- All 50 products have individual detail pages at /product/:id with full specs
- Build succeeds with no errors (only CSS @import order warning)
- Site ready for visual review and asset replacement

## Pending / To Be Replaced
- [ ] Place actual hero video at `public/banner.mp4`
- [ ] Replace logo.svg with actual brand logo
- [ ] Update phone number in Navbar.jsx (+8801577080024) and Footer.jsx
- [ ] Update WhatsApp number in Navbar.jsx and Footer.jsx (8801577080024)
- [ ] Update Email in Footer.jsx (ahammedlimon807@gmail.com)
- [ ] Update Facebook URL in Footer.jsx (https://www.facebook.com/lfswatch)
- [ ] Add TikTok URL in Footer.jsx (currently #)
- [ ] Provide checkout page template for /checkout route