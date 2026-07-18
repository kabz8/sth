import { useListSettings, useUpsertSetting } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getListSettingsQueryKey } from "@workspace/api-client-react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

export default function AdminSettings() {
  const { data: settings, isLoading } = useListSettings();
  const upsertSetting = useUpsertSetting();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [localSettings, setLocalSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    if (settings) {
      const formatted = settings.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
      setLocalSettings(formatted);
    }
  }, [settings]);

  const handleSave = async () => {
    const entries = Object.entries(localSettings);
    if (entries.length === 0) return;
    for (const [key, value] of entries) {
      await new Promise<void>((resolve, reject) =>
        upsertSetting.mutate({ data: { key, value } }, { onSuccess: () => resolve(), onError: reject })
      );
    }
    queryClient.invalidateQueries({ queryKey: getListSettingsQueryKey() });
    toast({ title: "Settings saved", description: "All site settings have been updated." });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground font-sans mt-1">Configure global site settings.</p>
        </div>
        <Button onClick={handleSave} disabled={upsertSetting.isPending} className="bg-primary hover:bg-accent text-primary-foreground font-mono uppercase text-xs tracking-widest rounded-none">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm p-8 space-y-8">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Site Title</label>
              <Input 
                value={localSettings['site_title'] || 'Studio Hub Architects'} 
                onChange={(e) => setLocalSettings({...localSettings, 'site_title': e.target.value})}
                className="font-sans border-border h-12"
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Contact Email</label>
              <Input 
                value={localSettings['contact_email'] || 'hello@studiohub.co.ke'} 
                onChange={(e) => setLocalSettings({...localSettings, 'contact_email': e.target.value})}
                className="font-sans border-border h-12"
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">WhatsApp Number (digits only, e.g. 254701719824)</label>
              <Input 
                value={localSettings['whatsapp_number'] || '254701719824'} 
                onChange={(e) => setLocalSettings({...localSettings, 'whatsapp_number': e.target.value})}
                className="font-sans border-border h-12"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
