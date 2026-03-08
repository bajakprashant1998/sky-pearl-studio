import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Gift, Copy, CheckCircle2, Users } from "lucide-react";

const AdminReferrals = () => {
  const queryClient = useQueryClient();
  const [rewardInput, setRewardInput] = useState<Record<string, string>>({});

  const { data: referrals = [], isLoading } = useQuery({
    queryKey: ["admin-referrals"],
    queryFn: async () => {
      const { data, error } = await supabase.from("referrals").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateReferral = useMutation({
    mutationFn: async ({ id, status, reward }: { id: string; status: string; reward?: string }) => {
      const update: any = { status };
      if (reward) update.reward = reward;
      const { error } = await supabase.from("referrals").update(update).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-referrals"] });
      toast.success("Referral updated");
    },
  });

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    contacted: "bg-blue-100 text-blue-700",
    converted: "bg-green-100 text-green-700",
    rewarded: "bg-purple-100 text-purple-700",
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Referral Program</h1>
          <p className="text-muted-foreground mt-1">{referrals.length} total referrals</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-2xl border border-border p-5 text-center">
            <div className="text-3xl font-bold text-primary">{referrals.length}</div>
            <div className="text-sm text-muted-foreground mt-1">Total</div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5 text-center">
            <div className="text-3xl font-bold text-green-600">{referrals.filter((r: any) => r.status === "converted").length}</div>
            <div className="text-sm text-muted-foreground mt-1">Converted</div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5 text-center">
            <div className="text-3xl font-bold text-purple-600">{referrals.filter((r: any) => r.status === "rewarded").length}</div>
            <div className="text-sm text-muted-foreground mt-1">Rewarded</div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {referrals.length === 0 ? (
            <div className="p-12 text-center">
              <Gift className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">No referrals yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {referrals.map((ref: any) => (
                <div key={ref.id} className="p-5 hover:bg-muted/20 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground text-sm">{ref.referrer_name}</span>
                        <span className="text-xs text-muted-foreground">({ref.referrer_email})</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[ref.status] || statusColors.pending}`}>
                          {ref.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Referred: {ref.referred_name || "Pending"} {ref.referred_email ? `(${ref.referred_email})` : ""}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Code: <code className="bg-muted px-1.5 py-0.5 rounded text-primary">{ref.code}</code>
                        {ref.reward && <span className="ml-2">Reward: {ref.reward}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={ref.status}
                        onChange={(e) => updateReferral.mutate({ id: ref.id, status: e.target.value, reward: rewardInput[ref.id] })}
                        className="text-xs border border-border rounded-md px-2 py-1 bg-background text-foreground"
                      >
                        {["pending", "contacted", "converted", "rewarded"].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReferrals;
