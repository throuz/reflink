"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  IconChartBar,
  IconUsers,
  IconCoins,
  IconLink,
} from "@tabler/icons-react";

export default function Dashboard() {
  const { publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState<"creator" | "referrer">("creator");

  // Mock data - replace with actual data from your backend
  const mockCampaigns = [
    {
      id: "1",
      name: "Solana NFT Launch",
      clicks: 150,
      conversions: 45,
      rewards: "45 SOL",
      status: "active",
    },
    {
      id: "2",
      name: "DeFi Protocol",
      clicks: 89,
      conversions: 23,
      rewards: "230 USDC",
      status: "active",
    },
  ];

  const mockReferrals = [
    {
      id: "1",
      campaign: "Solana NFT Launch",
      clicks: 12,
      conversions: 4,
      earned: "4 SOL",
      status: "pending",
    },
    {
      id: "2",
      campaign: "DeFi Protocol",
      clicks: 8,
      conversions: 2,
      earned: "20 USDC",
      status: "claimed",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        {!publicKey ? (
          <div className="bg-slate-800 p-6 rounded-lg text-center">
            <p className="mb-4">
              Please connect your wallet to view your dashboard
            </p>
            <WalletMultiButton />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("creator")}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === "creator"
                      ? "bg-blue-600"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                >
                  Creator View
                </button>
                <button
                  onClick={() => setActiveTab("referrer")}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === "referrer"
                      ? "bg-blue-600"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                >
                  Referrer View
                </button>
              </div>
            </div>

            {activeTab === "creator" ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                      <IconUsers className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="text-sm text-slate-400">
                          Total Referrals
                        </p>
                        <p className="text-2xl font-bold">68</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                      <IconChartBar className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="text-sm text-slate-400">
                          Conversion Rate
                        </p>
                        <p className="text-2xl font-bold">30%</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                      <IconCoins className="w-8 h-8 text-yellow-500" />
                      <div>
                        <p className="text-sm text-slate-400">Total Rewards</p>
                        <p className="text-2xl font-bold">275 SOL</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg overflow-hidden">
                  <h2 className="text-xl font-semibold p-6 border-b border-slate-700">
                    Your Campaigns
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left p-4">Campaign</th>
                          <th className="text-left p-4">Clicks</th>
                          <th className="text-left p-4">Conversions</th>
                          <th className="text-left p-4">Rewards</th>
                          <th className="text-left p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockCampaigns.map((campaign) => (
                          <tr
                            key={campaign.id}
                            className="border-b border-slate-700"
                          >
                            <td className="p-4">{campaign.name}</td>
                            <td className="p-4">{campaign.clicks}</td>
                            <td className="p-4">{campaign.conversions}</td>
                            <td className="p-4">{campaign.rewards}</td>
                            <td className="p-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  campaign.status === "active"
                                    ? "bg-green-900 text-green-300"
                                    : "bg-red-900 text-red-300"
                                }`}
                              >
                                {campaign.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                      <IconLink className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="text-sm text-slate-400">Total Clicks</p>
                        <p className="text-2xl font-bold">20</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                      <IconUsers className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="text-sm text-slate-400">Conversions</p>
                        <p className="text-2xl font-bold">6</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                      <IconCoins className="w-8 h-8 text-yellow-500" />
                      <div>
                        <p className="text-sm text-slate-400">Earned</p>
                        <p className="text-2xl font-bold">24 SOL</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg overflow-hidden">
                  <h2 className="text-xl font-semibold p-6 border-b border-slate-700">
                    Your Referrals
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left p-4">Campaign</th>
                          <th className="text-left p-4">Clicks</th>
                          <th className="text-left p-4">Conversions</th>
                          <th className="text-left p-4">Earned</th>
                          <th className="text-left p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockReferrals.map((referral) => (
                          <tr
                            key={referral.id}
                            className="border-b border-slate-700"
                          >
                            <td className="p-4">{referral.campaign}</td>
                            <td className="p-4">{referral.clicks}</td>
                            <td className="p-4">{referral.conversions}</td>
                            <td className="p-4">{referral.earned}</td>
                            <td className="p-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  referral.status === "claimed"
                                    ? "bg-green-900 text-green-300"
                                    : "bg-yellow-900 text-yellow-300"
                                }`}
                              >
                                {referral.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
