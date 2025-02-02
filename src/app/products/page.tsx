// src/app/products/page.tsx
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  created_at: string;
  image_url: string | null;  // New field in the JSON response
}

export default async function ProductsPage() {
  // Fetch the JSON from Django
  const res = await fetch('https://ahsapmasadunyasi.com/api/products/', {
    next: { revalidate: 60 },
  });
  const products: Product[] = await res.json();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

            {/* Display the image if available */}
            {product.image_url ? (
              // Using Next.js <Image> with a remote image:
              <Image
                src={product.image_url}
                alt={product.name}
                width={400}
                height={400}
                // If Next complains about the domain, see 'images' config in next.config.js
              />
            ) : (
              <p className="text-gray-500">No image available</p>
            )}

            <p>{product.description}</p>
            <p className="font-bold">{product.price}₺</p>
          </div>
        ))}
      </div>
    </main>
  );
}
