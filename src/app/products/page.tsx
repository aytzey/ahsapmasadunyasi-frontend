// src/app/products/page.tsx

// Optional: re-generate (ISR) every 60 seconds, or remove if you want SSR on every request
export const revalidate = 60;

// Adjust property types as needed (e.g. `price: number` if you parse it)
interface Product {
  id: number;
  name: string;
  description: string;
  price: string; 
  stock: number;
  created_at: string;
}

/**
 * Fetch products from your Django API.
 * By default, Next.js caches the response. 
 * Use cache: 'no-store' if you want fresh data every request:
 *
 * fetch('https://...', { cache: 'no-store' });
 */
async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://ahsapmasadunyasi.com/api/products/', {
    // example: next: { revalidate: 60 } or cache: 'no-store'
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

// This is a server component by default in Next.js 13+ (App Router)
export default async function ProductsPage() {
  // Wait for the product data
  const products = await getProducts();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Our Products</h1>
      <ul className="space-y-4">
        {products.map((prod) => (
          <li key={prod.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{prod.name}</h2>
            <p className="text-sm text-gray-600 mb-1">Price: {prod.price}</p>
            <p className="text-sm text-gray-600 mb-1">Stock: {prod.stock}</p>
            <p className="text-xs text-gray-400 mb-1">Created: {prod.created_at}</p>
            <p className="mt-2">{prod.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

