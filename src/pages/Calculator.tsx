import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  TrendingUp, 
  Calculator as CalcIcon, 
  CreditCard, 
  BarChart3, 
  LogOut,
  Menu,
  X,
  IndianRupee,
  Calendar,
  Percent,
  ArrowLeft,
  Save
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tenureOptions = [6, 12, 24, 36, 60];
const interestOptions = [8, 10, 12, 15, 18];
const emiOptions = [5000, 10000, 15000, 25000, 50000];

interface ScheduleItem {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

const Calculator = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loanType, setLoanType] = useState<"emi" | "interest-only">("emi");
  
  const [principal, setPrincipal] = useState<string>("100000");
  const [tenure, setTenure] = useState<string>("24");
  const [interestRate, setInterestRate] = useState<string>("12");
  const [emiAmount, setEmiAmount] = useState<string>("");
  const [calculateField, setCalculateField] = useState<"emi" | "tenure" | "interest">("emi");
  
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [calculatedEMI, setCalculatedEMI] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateEMI = (p: number, r: number, n: number) => {
    const monthlyRate = r / 12 / 100;
    if (monthlyRate === 0) return p / n;
    const emi = (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    return emi;
  };

  const calculateTenure = (p: number, r: number, emi: number) => {
    const monthlyRate = r / 12 / 100;
    if (monthlyRate === 0) return p / emi;
    const n = Math.log(emi / (emi - p * monthlyRate)) / Math.log(1 + monthlyRate);
    return Math.ceil(n);
  };

  const calculateInterestRate = (p: number, n: number, emi: number) => {
    let low = 0;
    let high = 100;
    let mid = 0;
    
    for (let i = 0; i < 100; i++) {
      mid = (low + high) / 2;
      const calculatedEMI = calculateEMI(p, mid, n);
      
      if (Math.abs(calculatedEMI - emi) < 1) break;
      
      if (calculatedEMI < emi) low = mid;
      else high = mid;
    }
    
    return Math.round(mid * 100) / 100;
  };

  const generateSchedule = (p: number, r: number, n: number, emi: number, type: "emi" | "interest-only") => {
    const scheduleItems: ScheduleItem[] = [];
    let balance = p;
    const monthlyRate = r / 12 / 100;

    for (let i = 1; i <= n; i++) {
      const interest = balance * monthlyRate;
      let principalPaid = type === "emi" ? emi - interest : 0;
      
      if (type === "interest-only" && i === n) {
        principalPaid = balance;
      }
      
      balance = Math.max(0, balance - principalPaid);

      scheduleItems.push({
        month: i,
        emi: type === "emi" ? emi : interest + (i === n ? p : 0),
        principal: principalPaid,
        interest: interest,
        balance: balance,
      });
    }

    return scheduleItems;
  };

  useEffect(() => {
    const p = parseFloat(principal) || 0;
    const t = parseInt(tenure) || 0;
    const r = parseFloat(interestRate) || 0;
    const e = parseFloat(emiAmount) || 0;

    if (p <= 0) return;

    let calculatedEmi = 0;
    let calculatedTenure = t;
    let calculatedRate = r;

    if (loanType === "interest-only") {
      const monthlyInterest = (p * r) / 12 / 100;
      setCalculatedEMI(monthlyInterest);
      setTotalInterest(monthlyInterest * t);
      setTotalPayment(p + monthlyInterest * t);
      setSchedule(generateSchedule(p, r, t, monthlyInterest, "interest-only"));
      return;
    }

    if (calculateField === "emi" && t > 0 && r > 0) {
      calculatedEmi = calculateEMI(p, r, t);
    } else if (calculateField === "tenure" && e > 0 && r > 0) {
      calculatedTenure = calculateTenure(p, r, e);
      calculatedEmi = e;
    } else if (calculateField === "interest" && e > 0 && t > 0) {
      calculatedRate = calculateInterestRate(p, t, e);
      calculatedEmi = e;
    }

    if (calculatedEmi > 0 && calculatedTenure > 0) {
      setCalculatedEMI(calculatedEmi);
      setTotalInterest(calculatedEmi * calculatedTenure - p);
      setTotalPayment(calculatedEmi * calculatedTenure);
      setSchedule(generateSchedule(p, calculatedRate || r, calculatedTenure, calculatedEmi, "emi"));
    }
  }, [principal, tenure, interestRate, emiAmount, calculateField, loanType]);

  const handleSaveLoan = () => {
    toast.success("Loan saved successfully!");
    navigate("/dashboard");
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-foreground">LoanManager</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-40
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-6">
          <Link to="/dashboard" className="flex items-center gap-2 mb-8">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg text-sidebar-foreground">LoanManager</span>
          </Link>

          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/calculator"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground"
            >
              <CalcIcon className="w-5 h-5" />
              <span>EMI Calculator</span>
            </Link>
            <Link
              to="/loans"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <CreditCard className="w-5 h-5" />
              <span>My Loans</span>
            </Link>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">EMI Calculator</h1>
              <p className="text-muted-foreground">Calculate your loan EMI and view payment schedule</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="glass-card p-6">
              <Tabs value={loanType} onValueChange={(v) => setLoanType(v as "emi" | "interest-only")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="emi">EMI Loan</TabsTrigger>
                  <TabsTrigger value="interest-only">Interest-Only</TabsTrigger>
                </TabsList>

                <div className="space-y-6">
                  {/* Principal Amount */}
                  <div className="space-y-2">
                    <Label className="text-foreground">Principal Amount (₹)</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        className="pl-10"
                        placeholder="Enter loan amount"
                      />
                    </div>
                  </div>

                  {loanType === "emi" && (
                    <>
                      {/* Calculate Field Selection */}
                      <div className="space-y-2">
                        <Label className="text-foreground">Calculate</Label>
                        <Select value={calculateField} onValueChange={(v) => setCalculateField(v as any)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="emi">EMI Amount</SelectItem>
                            <SelectItem value="tenure">Tenure</SelectItem>
                            <SelectItem value="interest">Interest Rate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Conditional Fields */}
                      {calculateField !== "tenure" && (
                        <div className="space-y-2">
                          <Label className="text-foreground">Tenure (Months)</Label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {tenureOptions.map((t) => (
                              <Button
                                key={t}
                                variant={tenure === String(t) ? "default" : "outline"}
                                size="sm"
                                onClick={() => setTenure(String(t))}
                              >
                                {t}m
                              </Button>
                            ))}
                          </div>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              type="number"
                              value={tenure}
                              onChange={(e) => setTenure(e.target.value)}
                              className="pl-10"
                              placeholder="Custom tenure"
                            />
                          </div>
                        </div>
                      )}

                      {calculateField !== "interest" && (
                        <div className="space-y-2">
                          <Label className="text-foreground">Interest Rate (% p.a.)</Label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {interestOptions.map((r) => (
                              <Button
                                key={r}
                                variant={interestRate === String(r) ? "default" : "outline"}
                                size="sm"
                                onClick={() => setInterestRate(String(r))}
                              >
                                {r}%
                              </Button>
                            ))}
                          </div>
                          <div className="relative">
                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              type="number"
                              step="0.1"
                              value={interestRate}
                              onChange={(e) => setInterestRate(e.target.value)}
                              className="pl-10"
                              placeholder="Custom rate"
                            />
                          </div>
                        </div>
                      )}

                      {calculateField !== "emi" && (
                        <div className="space-y-2">
                          <Label className="text-foreground">EMI Amount (₹)</Label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {emiOptions.map((e) => (
                              <Button
                                key={e}
                                variant={emiAmount === String(e) ? "default" : "outline"}
                                size="sm"
                                onClick={() => setEmiAmount(String(e))}
                              >
                                ₹{(e / 1000).toFixed(0)}K
                              </Button>
                            ))}
                          </div>
                          <div className="relative">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              type="number"
                              value={emiAmount}
                              onChange={(e) => setEmiAmount(e.target.value)}
                              className="pl-10"
                              placeholder="Custom EMI"
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {loanType === "interest-only" && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-foreground">Tenure (Months)</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {tenureOptions.map((t) => (
                            <Button
                              key={t}
                              variant={tenure === String(t) ? "default" : "outline"}
                              size="sm"
                              onClick={() => setTenure(String(t))}
                            >
                              {t}m
                            </Button>
                          ))}
                        </div>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type="number"
                            value={tenure}
                            onChange={(e) => setTenure(e.target.value)}
                            className="pl-10"
                            placeholder="Custom tenure"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-foreground">Interest Rate (% p.a.)</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {interestOptions.map((r) => (
                            <Button
                              key={r}
                              variant={interestRate === String(r) ? "default" : "outline"}
                              size="sm"
                              onClick={() => setInterestRate(String(r))}
                            >
                              {r}%
                            </Button>
                          ))}
                        </div>
                        <div className="relative">
                          <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type="number"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            className="pl-10"
                            placeholder="Custom rate"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <Button variant="accent" className="w-full" onClick={handleSaveLoan}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Loan
                  </Button>
                </div>
              </Tabs>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-card p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    {loanType === "interest-only" ? "Monthly Interest" : "Monthly EMI"}
                  </p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(calculatedEMI)}</p>
                </div>
                <div className="glass-card p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                  <p className="text-2xl font-bold text-destructive">{formatCurrency(totalInterest)}</p>
                </div>
                <div className="glass-card p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Payment</p>
                  <p className="text-2xl font-bold text-accent">{formatCurrency(totalPayment)}</p>
                </div>
              </div>

              {/* Payment Schedule */}
              <div className="glass-card overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Payment Schedule</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-secondary/50 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Month</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">EMI</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Principal</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Interest</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {schedule.map((item) => (
                        <tr key={item.month} className="hover:bg-secondary/30 transition-colors">
                          <td className="px-4 py-3 text-sm text-foreground">{item.month}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{formatCurrency(item.emi)}</td>
                          <td className="px-4 py-3 text-sm text-accent">{formatCurrency(item.principal)}</td>
                          <td className="px-4 py-3 text-sm text-destructive">{formatCurrency(item.interest)}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{formatCurrency(item.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calculator;
