URLShortner

A simple, fast, and efficient URL shortening tool that allows users to generate short URLs, create QR codes, and manage their personal links directly in the browser. The app uses a database to store global short URLs, while each user’s generated links and QR codes are stored in LocalStorage for a personalized dashboard experience.

✨ Features

Shorten Long URLs — Instantly create short URLs from long links.

Database Storage — All generated short URLs are stored in the database.

Local Storage Support — User-specific short URLs and their QR codes are stored in LocalStorage.

Dashboard View — A clean table showing all user-saved URLs and QR codes.

QR Code Generator — Automatically generate QR codes for short URLs (stored only in LocalStorage).

Click Tracking — Counts how many times each short URL is clicked.

No Backend Required for UI — Dashboard reads directly from LocalStorage.

🛠️ Tech Stack

Next.js

Tailwind CSS

JavaScript

MongoDB

LocalStorage API

🚀 Getting Started

Clone the repository:

git clone <your-repo-link>
cd urlshortner


Install dependencies and run the project:

npm install
npm run dev


Your app will be available at:

http://localhost:3000

📊 Usage

Enter a long URL and click Shorten.

The generated short URL is saved to MongoDB and also stored for the user in LocalStorage.

A QR code is generated and saved only in LocalStorage.

Users can view all their URLs & QR codes in the dashboard table.

Click tracking updates automatically when short URLs are used.

🤝 Contributing

Contributions are welcome!
Feel free to submit issues, suggest improvements, or create pull requests.