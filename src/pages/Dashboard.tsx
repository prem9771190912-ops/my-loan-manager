import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Calculator, 
  CreditCard, 
  BarChart3, 
  Plus, 
  LogOut,
  Menu,
  X,
  IndianRupee,
  Calendar,
  Percent
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const mockLoans = [
  {
    id: 1,
    name: "Home Loan",
    principal: 5000000,
    interestRate: 8.5,
    tenure: 240,
    emi: 43391,
    remaining: 4200000,
    type: "EMI",
  },
  {
    id: 2,
    name: "Personal Loan",
    principal: 300000,
    interestRate: 12,
    tenure: 36,
    emi: 9964,
    remaining: 180000,
    type: "EMI",
  },
  {
    id: 3,
    name: "Business Loan",
    principal: 1000000,
    interestRate: 10,
    tenure: 12,
    emi: 8333,
    remaining: 750000,
    type: "Interest-Only",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const totalLoanAmount = mockLoans.reduce((sum, loan) => sum + loan.principal, 0);
  const totalOutstanding = mockLoans.reduce((sum, loan) => sum + loan.remaining, 0);
  const totalEMI = mockLoans.reduce((sum, loan) => sum + loan.emi, 0);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
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
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/calculator"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <Calculator className="w-5 h-5" />
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Overview of your loan portfolio</p>
            </div>
            <Button variant="accent" onClick={() => navigate("/calculator")}>
              <Plus className="w-4 h-4 mr-2" />
              New Loan
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <IndianRupee className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Loan Amount</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(totalLoanAmount)}</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/10">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly EMI</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(totalEMI)}</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-destructive/10">
                  <Percent className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(totalOutstanding)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Loans Table */}
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Active Loans</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Loan Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Principal</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Interest Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">EMI</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Outstanding</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockLoans.map((loan) => (
                    <tr key={loan.id} className="hover:bg-secondary/30 transition-colors cursor-pointer">
                      <td className="px-6 py-4">
                        <span className="font-medium text-foreground">{loan.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          loan.type === "EMI" 
                            ? "bg-primary/10 text-primary" 
                            : "bg-accent/10 text-accent"
                        }`}>
                          {loan.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-foreground">{formatCurrency(loan.principal)}</td>
                      <td className="px-6 py-4 text-foreground">{loan.interestRate}%</td>
                      <td className="px-6 py-4 text-foreground">{formatCurrency(loan.emi)}</td>
                      <td className="px-6 py-4 text-foreground">{formatCurrency(loan.remaining)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
