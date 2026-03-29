import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Server, FileText, RefreshCw, Loader2, Search, AlertCircle, CheckCircle } from "lucide-react";
import { useClientDomains, useNameservers, useWhoisInfo, useDomainRenewal } from "@/hooks/use-domain-management";
import { toast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";

const DomainManagement = () => {
  const [email, setEmail] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<any>(null);
  const { domains, fetchDomains, loading: domainsLoading } = useClientDomains();
  const { nameservers, getNameservers, updateNameservers, loading: nsLoading, error: nsError } = useNameservers();
  const { whoisData, getWhois, updateWhois, loading: whoisLoading } = useWhoisInfo();
  const { renew, loading: renewLoading, error: renewError } = useDomainRenewal();

  const [nsForm, setNsForm] = useState(["", "", "", "", ""]);
  const [renewPeriod, setRenewPeriod] = useState(1);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const res = await fetchDomains(email);
    if (res) {
      setAuthenticated(true);
    }
  };

  const selectDomain = async (domain: any) => {
    setSelectedDomain(domain);
    const domainName = domain.domainname || domain.domain;
    const ns = await getNameservers(domainName);
    const padded = [...(ns || []), "", "", "", "", ""].slice(0, 5);
    setNsForm(padded);
    await getWhois(domainName);
  };

  const handleUpdateNs = async () => {
    const domainName = selectedDomain?.domainname || selectedDomain?.domain;
    if (!domainName) return;
    const filtered = nsForm.filter(Boolean);
    if (filtered.length < 2) {
      toast({ title: "At least 2 nameservers required", variant: "destructive" });
      return;
    }
    const res = await updateNameservers(domainName, filtered);
    if (res?.result === 'success') {
      toast({ title: "Nameservers Updated", description: "DNS changes may take up to 48 hours to propagate." });
    } else {
      toast({ title: "Update Failed", description: nsError || "Could not update nameservers.", variant: "destructive" });
    }
  };

  const handleRenew = async () => {
    const domainName = selectedDomain?.domainname || selectedDomain?.domain;
    if (!domainName) return;
    const res = await renew(domainName, renewPeriod);
    if (res?.result === 'success') {
      toast({ title: "Domain Renewed!", description: `${domainName} renewed for ${renewPeriod} year(s).` });
    } else {
      toast({ title: "Renewal Failed", description: renewError || res?.message || "Could not renew domain.", variant: "destructive" });
    }
  };

  // WHOIS form state
  const [whoisForm, setWhoisForm] = useState({
    'First Name': '', 'Last Name': '', 'Organisation Name': '', 'Email': '',
    'Address 1': '', 'City': '', 'State': '', 'Postcode': '', 'Country': '', 'Phone Number': '',
  });

  useEffect(() => {
    if (whoisData?.Registrant || whoisData?.registrant) {
      const reg = whoisData.Registrant || whoisData.registrant || {};
      setWhoisForm({
        'First Name': reg['First Name'] || reg.firstname || '',
        'Last Name': reg['Last Name'] || reg.lastname || '',
        'Organisation Name': reg['Organisation Name'] || reg.companyname || '',
        'Email': reg['Email'] || reg.email || '',
        'Address 1': reg['Address 1'] || reg.address1 || '',
        'City': reg['City'] || reg.city || '',
        'State': reg['State'] || reg.state || '',
        'Postcode': reg['Postcode'] || reg.postcode || '',
        'Country': reg['Country'] || reg.country || '',
        'Phone Number': reg['Phone Number'] || reg.phonenumber || '',
      });
    }
  }, [whoisData]);

  const handleUpdateWhois = async () => {
    const domainName = selectedDomain?.domainname || selectedDomain?.domain;
    if (!domainName) return;
    const contactdetails = {
      Registrant: whoisForm,
      Admin: whoisForm,
      Tech: whoisForm,
      Billing: whoisForm,
    };
    const res = await updateWhois(domainName, contactdetails);
    if (res?.result === 'success') {
      toast({ title: "WHOIS Updated", description: "Contact information has been updated." });
    } else {
      toast({ title: "Update Failed", description: "Could not update WHOIS info.", variant: "destructive" });
    }
  };

  if (!authenticated) {
    return (
      <>
        <Helmet><title>Domain Management | Infinitive Cloud</title></Helmet>
        <div className="min-h-screen">
          <Navigation />
          <main className="pt-28 pb-20">
            <div className="section-container max-w-md mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <Globe className="w-12 h-12 text-primary mx-auto mb-3" />
                  <CardTitle>Domain Management</CardTitle>
                  <p className="text-sm text-muted-foreground">Enter your email to view and manage your domains.</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                    </div>
                    <Button type="submit" disabled={domainsLoading} className="btn-gradient w-full h-11 font-bold">
                      {domainsLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
                      View My Domains
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Domain Management | Infinitive Cloud</title></Helmet>
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-28 pb-20">
          <div className="section-container max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Domain Management</h1>
            <p className="text-muted-foreground mb-8">Manage nameservers, WHOIS, and renewals for your domains.</p>

            <div className="grid lg:grid-cols-[300px_1fr] gap-6">
              {/* Domain List */}
              <Card className="h-fit">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Your Domains ({domains.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 p-3">
                  {domains.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground text-sm">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      No domains found for this email.
                    </div>
                  )}
                  {domains.map((d, i) => {
                    const name = d.domainname || d.domain;
                    const isSelected = (selectedDomain?.domainname || selectedDomain?.domain) === name;
                    return (
                      <button
                        key={i}
                        onClick={() => selectDomain(d)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-foreground'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate">{name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            d.status === 'Active' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'
                          }`}>
                            {d.status || 'Active'}
                          </span>
                        </div>
                        {d.expirydate && <p className="text-[10px] text-muted-foreground mt-0.5">Expires: {d.expirydate}</p>}
                      </button>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Domain Details */}
              {selectedDomain ? (
                <Tabs defaultValue="nameservers">
                  <TabsList className="mb-4">
                    <TabsTrigger value="nameservers" className="gap-1.5"><Server className="w-4 h-4" /> Nameservers</TabsTrigger>
                    <TabsTrigger value="whois" className="gap-1.5"><FileText className="w-4 h-4" /> WHOIS</TabsTrigger>
                    <TabsTrigger value="renew" className="gap-1.5"><RefreshCw className="w-4 h-4" /> Renew</TabsTrigger>
                  </TabsList>

                  {/* Nameservers Tab */}
                  <TabsContent value="nameservers">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Nameservers for {selectedDomain.domainname || selectedDomain.domain}</CardTitle>
                        <p className="text-sm text-muted-foreground">Changes may take up to 48 hours to propagate globally.</p>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {nsForm.map((ns, i) => (
                          <div key={i}>
                            <Label>Nameserver {i + 1}{i < 2 ? ' *' : ''}</Label>
                            <Input
                              value={ns}
                              onChange={(e) => {
                                const updated = [...nsForm];
                                updated[i] = e.target.value;
                                setNsForm(updated);
                              }}
                              placeholder={`ns${i + 1}.example.com`}
                            />
                          </div>
                        ))}
                        <Button onClick={handleUpdateNs} disabled={nsLoading} className="btn-gradient font-bold">
                          {nsLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                          Update Nameservers
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* WHOIS Tab */}
                  <TabsContent value="whois">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">WHOIS Information</CardTitle>
                        <p className="text-sm text-muted-foreground">Update registrant, admin, tech, and billing contact details.</p>
                      </CardHeader>
                      <CardContent>
                        {whoisLoading ? (
                          <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                        ) : (
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              {Object.entries(whoisForm).map(([key, val]) => (
                                <div key={key}>
                                  <Label>{key}</Label>
                                  <Input
                                    value={val}
                                    onChange={(e) => setWhoisForm((prev) => ({ ...prev, [key]: e.target.value }))}
                                  />
                                </div>
                              ))}
                            </div>
                            <Button onClick={handleUpdateWhois} disabled={whoisLoading} className="btn-gradient font-bold">
                              {whoisLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                              Update WHOIS Info
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Renew Tab */}
                  <TabsContent value="renew">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Renew Domain</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {selectedDomain.expirydate
                            ? `Current expiry: ${selectedDomain.expirydate}`
                            : "Extend your domain registration."}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Renewal Period</Label>
                          <div className="flex gap-2 mt-2">
                            {[1, 2, 3, 5].map((y) => (
                              <Button
                                key={y}
                                variant={renewPeriod === y ? "default" : "outline"}
                                onClick={() => setRenewPeriod(y)}
                                className="font-bold"
                              >
                                {y} Year{y > 1 ? 's' : ''}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <Button onClick={handleRenew} disabled={renewLoading} className="btn-gradient font-bold">
                          {renewLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                          Renew for {renewPeriod} Year{renewPeriod > 1 ? 's' : ''}
                        </Button>
                        {renewError && <p className="text-sm text-destructive">{renewError}</p>}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              ) : (
                <Card className="flex items-center justify-center min-h-[300px]">
                  <div className="text-center text-muted-foreground">
                    <Globe className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">Select a domain to manage</p>
                    <p className="text-sm">Choose a domain from the list to view nameservers, WHOIS info, and renewal options.</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DomainManagement;
