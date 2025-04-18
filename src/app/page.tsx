import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          {"Boost Your Solana Project's Growth"}
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Track and reward on-chain referrals with Reflink — the easiest way to
          grow your dApp.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/create-campaign"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
          >
            Create Campaign
          </Link>
          <Link
            href="/learn-more"
            className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Track Referrals</h3>
            <p className="text-slate-300">
              Monitor every referral click and conversion with our on-chain
              tracking system.
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Reward Users</h3>
            <p className="text-slate-300">
              Automatically distribute rewards in SOL or SPL tokens when
              referrals convert.
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Analytics Dashboard</h3>
            <p className="text-slate-300">
              Get detailed insights into your campaign performance and user
              behavior.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
