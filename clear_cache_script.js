localStorage.clear();
console.log('✅ localStorage cleared successfully!');

// 2. Alternative: Clear only products data
// localStorage.removeItem('products');
// console.log('✅ Products data cleared!');

// 3. Force page reload to reload fresh data
setTimeout(() => {
  window.location.reload();
}, 1000);
