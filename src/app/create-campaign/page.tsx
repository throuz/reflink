"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { toast } from "react-hot-toast";

export default function CreateCampaign() {
  const { publicKey } = useWallet();
  const [formData, setFormData] = useState({
    rewardAmount: "",
    rewardToken: "SOL", // Default to SOL
    campaignName: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }

    // TODO: Implement campaign creation logic
    toast.success("Campaign created successfully!");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create Referral Campaign</h1>

          {!publicKey ? (
            <div className="bg-slate-800 p-6 rounded-lg text-center">
              <p className="mb-4">
                Please connect your wallet to create a campaign
              </p>
              <WalletMultiButton />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={formData.campaignName}
                  onChange={(e) =>
                    setFormData({ ...formData, campaignName: e.target.value })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Reward Amount
                  </label>
                  <input
                    type="number"
                    value={formData.rewardAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, rewardAmount: e.target.value })
                    }
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Reward Token
                  </label>
                  <select
                    value={formData.rewardToken}
                    onChange={(e) =>
                      setFormData({ ...formData, rewardToken: e.target.value })
                    }
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2"
                  >
                    <option value="SOL">SOL</option>
                    <option value="USDC">USDC</option>
                    <option value="CUSTOM">Custom SPL Token</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
              >
                Create Campaign
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
