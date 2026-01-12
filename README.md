# Product Store

A modern e-commerce web application built with React, featuring product management, shopping cart, and admin dashboard.

## 🚀 Features

- **Product Catalog**: Browse products with search and filtering
- **Shopping Cart**: Add products to cart and manage quantities
- **Admin Dashboard**: Full CRUD operations for product management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **WhatsApp Integration**: Direct ordering via WhatsApp
- **Real-time Updates**: Live product data from MockAPI

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0, React Router 7.11.0
- **Styling**: Tailwind CSS, Radix UI
- **Build Tool**: Vite
- **API**: MockAPI (REST)
- **Deployment**: GitHub Pages, Netlify

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/product-store.git
cd product-store
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🚀 Deployment

### GitHub Pages
```bash
npm run deploy
```

### Netlify
```bash
npm run build
npx netlify deploy --dir=dist --prod
```

## 📁 Project Structure

```
src/
├── components/
│   ├── public/          # Public-facing components
│   ├── admin/           # Admin dashboard components
│   └── ui/              # Reusable UI components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── services/            # API services
└── lib/                 # Utility functions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 📱 Usage

### For Customers
1. Browse products on the homepage
2. Use search and filters to find products
3. Add products to cart
4. Complete checkout via WhatsApp

### For Admins
1. Login with admin credentials
2. Manage products (Create, Read, Update, Delete)
3. View dashboard with statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.