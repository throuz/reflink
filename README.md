# Reflink

Reflink is a Solana-based referral tracking and reward system that helps dApps grow their user base through on-chain referrals.

## Features

- Create and manage referral campaigns
- Track referral clicks and conversions
- Distribute rewards in SOL or SPL tokens
- View detailed analytics and statistics
- Support for both campaign creators and referrers

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Solana Web3.js
- @solana/wallet-adapter
- React Query

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/reflink.git
cd reflink
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout with wallet providers
│   ├── page.tsx           # Landing page
│   ├── create-campaign/   # Campaign creation page
│   └── dashboard/         # Dashboard for creators and referrers
├── components/            # Reusable components
└── styles/               # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
