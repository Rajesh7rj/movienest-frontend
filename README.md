# 🎬 MovieNest Frontend – A Movie Management App

This is the frontend application for **MovieNest**, a movie database platform built with **Next.js 15 + Tailwind CSS 4 + TypeScript**. It consumes the backend API built with **NestJS** to allow users to **create, update, and browse movies** along with image upload functionality.

---

## 🚀 Features

- 🖼️ Upload and preview movie posters
- ✏️ Create and edit movie details (title, year, image)
- 📄 Paginated list of all movies
- 🔍 View and edit movie details by ID
- 🧭 Routing using **App Router** (Next.js 15)
- 🌈 Fully responsive UI with Tailwind CSS 4
- 🔐 Auth-ready structure (with future support via NextAuth)
- ⚡ Deployed on **Vercel**

---

## ⚙️ Tech Stack

- [Next.js 15](https://nextjs.org/) – React framework with App Router
- [Tailwind CSS 4](https://tailwindcss.com/) – Utility-first styling
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) – Form handling & validation
- [Axios](https://axios-http.com/) – HTTP requests
- [React Hot Toast](https://react-hot-toast.com/) – Notifications
- [Vercel](https://vercel.com/) – Frontend hosting

---

## 📦 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/movienest-frontend.git
cd movienest-frontend
```

## 2. Install Dependencies
```
npm install
```

## 3.Create .env.local File
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

## 4.Start the Development Server
```
npm run dev
```

App runs at: http://localhost:3000


# 🌍 API Endpoints (from Backend)
Make sure the backend is running. Example endpoints:

| Method | Endpoint                             | Description             |
| ------ | ------------------------------------ | ----------------------- |
| POST   | `/movies/create-movie`               | Create a new movie      |
| POST   | `/movies/update-movie/:id`           | Update a movie          |
| GET    | `/movies/get-movie-by-id/:id`        | Get movie details by ID |
| GET    | `/movies/get-movies?page=1&limit=10` | Paginated movie list    |


# 🚀 Deployment

Deployed live at: https://movienest-frontend.vercel.app
You can deploy your own version using:
```
# Build the app
npm run build

# Start in production
npm start
```

Or connect the repo to Vercel for automatic CI/CD deployment.

# Credentials 
email :- admin@gmail.com
password :- Admin@12345

# 🧾 License
MIT License. Free for personal and commercial use.



