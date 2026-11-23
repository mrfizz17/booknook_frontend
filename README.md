# 📚 BookNook — A Cozy Home for Your Next Read

**BookNook** is a community-driven book-sharing platform where readers can discover, share, lend, and borrow books. It provides a simple and convenient way for book lovers to connect through their shared passion for reading.

🌐 **Live Website:** [https://mrfizz17-booknook.vercel.app/](https://mrfizz17-booknook.vercel.app/)

---

## ✨ Features

- **Explore Books:** Browse a collection of books across multiple categories and discover your next favorite read.
- **User Authentication:** Secure registration and login with email/password and Google authentication using Better Auth.
- **Add New Books:** Authenticated users can contribute books to the community by adding their own book listings.
- **Book Management:** Users can view and manage the books they have added to the platform.
- **Borrow Books:** Borrow available books from other readers and keep track of borrowing activities.
- **My Borrowed Books:** Access and manage your personal borrowing history.
- **New Arrivals:** Discover recently added books through a dedicated section on the homepage.
- **Protected Routes:** Restrict private features to authenticated users and maintain access control.
- **Responsive Interface:** Enjoy a consistent browsing experience across desktop, tablet, and mobile devices.
- **Interactive UI:** Smooth animations, intuitive navigation, and reusable UI components create an engaging user experience.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React | Component-based user interface |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Utility-first styling |
| Better Auth | Authentication and session management |
| MongoDB | Database integration |
| shadcn/ui | Reusable UI components |
| Framer Motion | UI animations and transitions |
| Swiper | Interactive sliders and carousels |
| React Hook Form | Form management |
| Zod | Form validation |
| Lucide React | Icons |
| Sonner | Toast notifications |
| Vercel | Frontend deployment |

---

## 📂 Project Structure

```text
booknook_frontend/
│
├── public/                 # Static assets
│
├── src/
│   ├── app/                # Next.js app routes and pages
│   ├── components/         # Reusable UI components
│   └── lib/                # Utilities and authentication setup
│
├── .gitignore
├── components.json
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

Follow these steps to run BookNook locally.

### 1. Clone the repository

```bash
git clone https://github.com/mrfizz17/booknook_frontend.git
```

### 2. Navigate to the project directory

```bash
cd booknook_frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory and configure the required environment variables.

These may include:

- Better Auth configuration
- MongoDB connection settings
- Google OAuth credentials
- Backend API URL

Use the exact variable names and values required by your application configuration. Never commit secret credentials to GitHub.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔗 Related Repository

The BookNook frontend communicates with a separate backend application.

- **Frontend Repository:** [booknook_frontend](https://github.com/mrfizz17/booknook_frontend)
- **Backend Repository:** [booknook_backend](https://github.com/mrfizz17/booknook_backend)
- **Backend Deployment:** [BookNook Backend API](https://mrfizz17-booknookbackend.vercel.app/api/all-books)

---

## 🌍 Live Demo

Experience BookNook:

**[Visit BookNook →](https://mrfizz17-booknook.vercel.app/)**

---

## 👨‍💻 Author

**Mustafizur Rahman Chowdhury**

- GitHub: [@mrfizz17](https://github.com/mrfizz17)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/mustafizur-r-chowdhury/)

---

<p align="center">
  <strong>Made with ❤️ for book lovers.</strong>
  <br />
  <em>Every story deserves another reader.</em>
</p>