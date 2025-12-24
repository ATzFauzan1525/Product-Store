// Script to Clear localStorage Cache
// Run this in browser console (F12 → Console tab)

// 1. Clear localStorage completely
localStorage.clear();
console.log('✅ localStorage cleared successfully!');

// 2. Alternative: Clear only products data
// localStorage.removeItem('products');
// console.log('✅ Products data cleared!');

// 3. Force page reload to reload fresh data
setTimeout(() => {
  window.location.reload();
}, 1000);

// Instructions:
// 1. Open browser console (F12)
// 2. Copy and paste this entire script
// 3. Press Enter
// 4. Page will reload with fresh data
// 5. Product 6 should now show "20W USB-C Power Adapter"
