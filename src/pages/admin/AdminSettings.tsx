import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ExternalLink, KeyRound, Info } from "lucide-react";

const AdminSettings = () => {
  const { logout } = useAdmin();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-white">Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Admin account and quick links</p>
      </div>

      {/* Account Info */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Admin Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-700/40 border border-slate-600 rounded-xl p-4 flex gap-3">
            <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-slate-300 text-sm leading-relaxed">
              Your admin ID and password are stored in your project's{" "}
              <code className="bg-slate-800 px-1 rounded text-blue-300">.env</code>{" "}
              file.<br />
              To change the password, update{" "}
              <code className="bg-slate-800 px-1 rounded text-blue-300">VITE_ADMIN_PASSWORD</code>{" "}
              and restart your server.
            </div>
          </div>

          <Button
            variant="destructive"
            onClick={logout}
            className="w-full font-bold"
          >
            Logout
          </Button>
        </CardContent>
      </Card>

      {/* Change Password Info */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-primary" />
            How to Change Password / ID
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside leading-relaxed">
            <li>
              Open the <code className="bg-slate-800 px-1 rounded">.env</code> file in your project folder
            </li>
            <li>
              Enter your new ID in <code className="bg-slate-800 px-1 rounded">VITE_ADMIN_ID</code>
            </li>
            <li>
              Enter your new password in{" "}
              <code className="bg-slate-800 px-1 rounded">VITE_ADMIN_PASSWORD</code>
            </li>
            <li>
              Save the file and restart the dev server (
              <code className="bg-slate-800 px-1 rounded">bun run dev</code>)
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base">Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { label: "Supabase Dashboard", url: "https://supabase.com/dashboard" },
            { label: "WHMCS Admin Panel", url: "https://client.infinitivecloud.com/admin" },
            { label: "Razorpay Dashboard", url: "https://dashboard.razorpay.com" },
          ].map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors text-sm text-slate-300 hover:text-white"
            >
              {link.label}
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
