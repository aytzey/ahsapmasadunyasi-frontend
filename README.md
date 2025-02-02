# Ahşap Masa Dünyası - Next.js Frontend

This repository contains the **Next.js** frontend for the Ahşap Masa Dünyası website. The site fetches data (such as product lists) from an existing Django API, then renders the data in a modern React-based interface.

## Table of Contents

1. [Project Overview](#project-overview)  
2. [API Access](#api-access)  
3. [Local Development](#local-development)  
4. [Production Build and Deployment](#production-build-and-deployment)  
5. [Managing with PM2](#managing-with-pm2)  
6. [Directory Structure](#directory-structure)

---

## Project Overview

- **Framework**: [Next.js](https://nextjs.org/)  
- **Language**: TypeScript (with ESLint rules restricting usage of `any`).  
- **Styling**: Tailwind CSS (if you see `tailwind.config` in the repo).  
- **Server-Side Rendering**: Next.js fetches data from the Django backend to render pages.  

### Live Domain

- The main domain (`ahsapmasadunyasi.com`) points to this Next.js app.  
- All API calls go to the **Django** backend under `https://ahsapmasadunyasi.com/api/...`.

---

## API Access

The Django backend provides various endpoints under the `/api/` path. For this project, the key endpoint you need is:

- **`GET /api/products/`**  
  - Returns a JSON array of product objects:
    ```json
    [
      {
        "id": 1,
        "name": "Minecraft masası",
        "description": "Seasea",
        "price": "40000.00",
        "stock": 50,
        "created_at": "2025-01-28T19:46:48.225Z"
      },
      ...
    ]
    ```
  - Each product typically has fields like `id`, `name`, `description`, `price`, `stock`, and `created_at`.

**Usage in Next.js**:  
A typical server component fetch might look like:

```ts
// Example: src/app/products/page.tsx

async function getProducts() {
  const res = await fetch("https://ahsapmasadunyasi.com/api/products/", {
    // If you want fresh data each request: cache: 'no-store'
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  // Render the products...
}
```

---

## Local Development

1. **Clone** the repo:
   ```bash
   git clone https://github.com/yourusername/ahsapmasadunyasi-frontend.git
   cd ahsapmasadunyasi-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
   (depending on which package manager your project uses).

3. **Local Dev Server**:
   ```bash
   npm run dev
   ```
   - Runs on `http://localhost:3000`.
   - You can point your code to a local Django instance if needed (update fetch URLs accordingly).

---

## Production Build and Deployment

1. **Install Dependencies** (only once or when dependencies change):
   ```bash
   npm install
   ```

2. **Build**:
   ```bash
   npm run build
   ```
   - Creates an optimized production build in the `.next` folder.

3. **Start**:
   ```bash
   npm run start
   ```
   - Default port: **3000**.  

If you see an ESLint error about `any` usage, define proper TypeScript interfaces or disable the rule locally.

---

## Managing with PM2

On the remote server (e.g., a Linux VPS), you can run Next.js via [PM2](https://pm2.keymetrics.io/). This allows the service to auto-restart if it crashes and start on boot.

1. **Install PM2** (if not installed globally):
   ```bash
   sudo npm install -g pm2
   ```
2. **Navigate to the Project Folder**:
   ```bash
   cd /home/django/nextjs/my-frontend  # Example path
   ```
3. **Build for Production**:
   ```bash
   npm install
   npm run build
   ```
4. **Start with PM2**:
   ```bash
   pm2 start npm --name nextjs -- start
   pm2 save
   ```
5. **Check Process**:
   ```bash
   pm2 list
   pm2 logs nextjs
   ```
6. **Stop / Restart**:
   ```bash
   pm2 stop nextjs
   pm2 restart nextjs
   pm2 delete nextjs
   ```

Once running, Next.js is reachable on port 3000 (unless specified otherwise). Typically, **Nginx** is set to reverse-proxy `https://ahsapmasadunyasi.com` → `127.0.0.1:3000`.

---

## Directory Structure

A basic Next.js (App Router) layout:

```
my-frontend/
├── .next/             # Production build output
├── node_modules/
├── package.json
├── tsconfig.json
├── public/
│   └── favicon.ico
└── src/
    └── app/
        ├── layout.tsx
        ├── globals.css
        ├── page.tsx        # homepage
        └── products/
            └── page.tsx    # /products route, fetches from /api/products
```

**Key Files**:

- **`package.json`**: Dependencies + scripts (`dev`, `build`, `start`).  
- **`tsconfig.json`**: TypeScript configuration.  
- **`src/app/`**: Next.js 13+ “App Router.” Each folder is a route.  
- **`.next/`**: created after build; do **not** commit to source control.

---

### Questions or Contributions

- For front-end issues, open a PR or contact the repository maintainer.  
- For back-end or API changes, coordinate with the Django API team to see updates to `https://ahsapmasadunyasi.com/api/`.

**Happy coding!**