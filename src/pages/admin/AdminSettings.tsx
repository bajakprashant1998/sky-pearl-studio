import AdminLayout from "@/components/admin/AdminLayout";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Lock, Save, Shield, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminSettings = () => {
  const { user, changePassword } = useAdmin();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 2FA state
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [qrUri, setQrUri] = useState("");
  const [enrolling, setEnrolling] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    setLoading(true);
    const { error } = await changePassword(newPassword);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully");
      setNewPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  };

  const enrollTOTP = async () => {
    setEnrolling(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "Admin TOTP",
      });
      if (error) throw error;
      setFactorId(data.id);
      setQrUri(data.totp.uri);
      setShowQR(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to enroll 2FA");
    }
    setEnrolling(false);
  };

  const verifyTOTP = async () => {
    if (!factorId || !otpCode) return;
    try {
      const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });
      if (challengeError) throw challengeError;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.id,
        code: otpCode,
      });
      if (verifyError) throw verifyError;

      setTwoFAEnabled(true);
      setShowQR(false);
      toast.success("2FA enabled successfully!");
    } catch (err: any) {
      toast.error(err.message || "Invalid code");
    }
  };

  const unenrollTOTP = async () => {
    if (!factorId) return;
    try {
      const { error } = await supabase.auth.mfa.unenroll({ factorId });
      if (error) throw error;
      setTwoFAEnabled(false);
      setFactorId(null);
      toast.success("2FA disabled");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Check existing TOTP factors
  useState(() => {
    supabase.auth.mfa.listFactors().then(({ data }) => {
      const totp = data?.totp?.[0];
      if (totp && totp.status === "verified") {
        setTwoFAEnabled(true);
        setFactorId(totp.id);
      }
    });
  });

  return (
    <AdminLayout>
      <div className="max-w-xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and security</p>
        </div>

        {/* Change Password */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Lock className="w-5 h-5 text-muted-foreground" />
            Change Password
          </h2>
          <p className="text-sm text-muted-foreground">Logged in as: {user?.email}</p>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">New Password</label>
              <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Confirm Password</label>
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>

        {/* 2FA */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Shield className="w-5 h-5 text-muted-foreground" />
            Two-Factor Authentication
          </h2>

          {twoFAEnabled ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-green-600">2FA is enabled</span>
              </div>
              <Button variant="destructive" size="sm" onClick={unenrollTOTP}>
                Disable 2FA
              </Button>
            </div>
          ) : showQR ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.):</p>
              <div className="bg-muted p-4 rounded-xl">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrUri)}&size=200x200`}
                  alt="2FA QR Code"
                  className="mx-auto"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Enter verification code</label>
                <div className="flex gap-2">
                  <Input
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                  />
                  <Button onClick={verifyTOTP} disabled={otpCode.length !== 6}>Verify</Button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your admin account using a TOTP authenticator app.</p>
              <Button onClick={enrollTOTP} disabled={enrolling}>
                <Smartphone className="w-4 h-4 mr-2" />
                {enrolling ? "Setting up..." : "Enable 2FA"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
