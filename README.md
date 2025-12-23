# Team Kudos System 🎉

A modern, responsive web application enabling team members to recognize and appreciate each other's contributions. Built with **Next.js** and **React**.

![Kudos App Screenshot](https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80) 


## 🚀 Features

-   **Give Kudos**: An intuitive form to select colleagues and send messages of appreciation (max 280 chars).
-   **Live Feed**: A real-time updating stream showing recent kudos with sender and recipient details.
-   **Moderation (Admin View)**: Built-in administrator controls to hide or remove inappropriate content.
-   **Responsive Design**: A sleek, dark-themed UI verified with Glassmorphism aesthetics.
-   **Rate Limiting & Validation**: Prevents spam and invalid submissions.

## 🛠️ Technology Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **Styling**: Vanilla CSS (CSS Modules & Global Variables)
-   **Data Storage**: Local JSON (Simulation of a persistent database)

## 📦 Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/kudos-feature.git
    cd kudos-feature
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the app**:
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🛡️ Moderation Guide

To moderate content:
1.  Check the **"Admin View"** toggle at the top of the feed.
2.  Inappropriate kudos will show a **"Hide"** button.
3.  Clicking "Hide" removes the post from the public feed.
4.  Hidden posts can be restored by clicking **"Show"** while in Admin View.

## 📁 Project Structure

-   `/app`: Next.js App Router pages and API endpoints.
-   `/components`: Reusable UI components (`KudosForm`, `KudosFeed`, `KudosCard`).
-   `/lib`: Data access layer and types.
-   `/data`: Local storage file (`kudos.json`).

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.

---
*Built with ❤️ for the team.*
