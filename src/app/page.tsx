// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-4">
      <h1>Welcome to Our Site</h1>
      <Link href="/products" className="text-blue-500 underline">
        View Products
      </Link>
    </main>
  );
}
