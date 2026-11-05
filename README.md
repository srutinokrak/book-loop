# BookNook

BookNook is a community bookshelf where readers can discover books, share titles, and keep track of borrowed books.

## Live Website

Visit **BookNook**: [https://book-loop-frontend-zeta.vercel.app/](https://book-loop-frontend-zeta.vercel.app/)

## Features

- Browse the full book collection and view individual book details.
- Discover recently added books from the home page.
- Create an account and sign in to access member features.
- Add, edit, and remove books from your personal shelf.
- Borrow available books and review your borrowing list.
- View book availability and information about who added a book.
- Use a responsive interface designed for desktop and mobile screens.

## Built With

- Next.js and React
- TypeScript
- Tailwind CSS
- MongoDB
- Better Auth

## Run Locally

1. Install [Node.js](https://nodejs.org/) and npm.
2. Clone this repository and open its folder:

   ```bash
   git clone https://github.com/srutinokrak/book-loop.git
   cd book-loop
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and configure the required environment variables for MongoDB, authentication, and the books API. Keep credentials private; do not commit `.env`.
5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` — start the local development server.
- `npm run build` — create a production build.
- `npm run start` — start the production server.
- `npm run lint` — run ESLint.
