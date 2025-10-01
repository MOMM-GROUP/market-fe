# MOMM Market - A Multi-Vendor Marketplace for Economic Justice

[![Vercel Deploy](https://vercel.com/button)](https://vercel.com/purcell3as-projects/v0-multi-vendor-platform)
[![Discord](https://img.shields.io/discord/YOUR_DISCORD_INVITE_ID?color=7289DA&label=Discord&logo=discord&logoColor=white)](YOUR_DISCORD_INVITE_LINK)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MOMM (Makers of Modern Markets) is an open-source, multi-vendor e-commerce platform built for economic justice. The era of the billionaire is over. Our mission is to create a marketplace where a significant portion of the value we create goes straight back to the communities and makers who power it.

**This project is in active development and we are looking for contributors to help build the future of ethical e-commerce!**

### ✨ Core Features

* **Multi-Vendor Architecture:** Allows multiple independent vendors to sign up and manage their own storefronts.
* **Product & Category Management:** A flexible system for organizing and displaying products.
* **Full-Text Search:** Powered by PostgreSQL's native search capabilities for fast and relevant results.
* **Authentication & User Profiles:** Secure user and vendor accounts managed by Supabase.
* **Modern Shopping Cart & Favorites:** A smooth, client-side user experience.

### 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Database & Auth:** [Supabase](https://supabase.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
* **UI Generation:** [v0.app](https://v0.app/)
* **Deployment:** [Vercel](https://vercel.com/)

### 🚀 Getting Started (Local Development)

Want to run the project locally? Follow these steps.

1.  **Fork & Clone the Repository**
    ```bash
    git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/market-fe.git
    cd market-fe
    ```

2.  **Install Dependencies**
    We use `npm` for this project.
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**
    Create a new file named `.env.local` in the root of your project. You'll need to get your project URL and Anon Key from your Supabase dashboard (`Settings` -> `API`).
    ```
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### 🤝 How to Contribute

We welcome contributions of all kinds! The best way to start is by looking at our open issues.

Please read our **[Contribution Guidelines](CONTRIBUTING.md)** for the full workflow, including our coding standards and pull request process.

### Code of Conduct

To ensure a welcoming and inclusive community, we have a **[Code of Conduct](CODE_OF_CONDUCT.md)** that all contributors are expected to follow.

### 📜 License

This project is open source and licensed under the **[MIT License](LICENSE)**.
