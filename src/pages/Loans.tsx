import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  Calculator, 
  CreditCard, 
  BarChart3, 
  LogOut,
  Menu,
  X,
  Plus,
  Search,
  MoreVertical,
  Eye,
  Trash2,
  IndianRupee
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

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
    startDate: "2023-01-15",
    paidMonths: 23,
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
    startDate: "2023-06-01",
    paidMonths: 18,
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
    startDate: "2024-01-01",
    paidMonths: 6,
  },
];

const Loans = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLoan, setSelectedLoan] = useState<typeof mockLoans[0] | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");

  const filteredLoans = mockLoans.filter(loan =>
    loan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleRecordPayment = () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    toast.success(`Payment of ${formatCurrency(parseFloat(paymentAmount))} recorded successfully!`);
    setIsPaymentDialogOpen(false);
    setPaymentAmount("");
  };

  const handleDeleteLoan = (loanId: number) => {
    toast.success("Loan deleted successfully");
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
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <Calculator className="w-5 h-5" />
              <span>EMI Calculator</span>
            </Link>
            <Link
              to="/loans"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground"
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
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">My Loans</h1>
              <p className="text-muted-foreground">Manage and track your loans</p>
            </div>
            <Button variant="accent" onClick={() => navigate("/calculator")}>
              <Plus className="w-4 h-4 mr-2" />
              Add Loan
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search loans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 max-w-md"
            />
          </div>

          {/* Loans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLoans.map((loan) => (
              <div key={loan.id} className="glass-card p-6 group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{loan.name}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                      loan.type === "EMI" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-accent/10 text-accent"
                    }`}>
                      {loan.type}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedLoan(loan)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDeleteLoan(loan.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Principal</span>
                    <span className="text-foreground font-medium">{formatCurrency(loan.principal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Interest Rate</span>
                    <span className="text-foreground font-medium">{loan.interestRate}% p.a.</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly EMI</span>
                    <span className="text-primary font-medium">{formatCurrency(loan.emi)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Outstanding</span>
                    <span className="text-destructive font-medium">{formatCurrency(loan.remaining)}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{loan.paidMonths} of {loan.tenure} months</span>
                    <span>{Math.round((loan.paidMonths / loan.tenure) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${(loan.paidMonths / loan.tenure) * 100}%` }}
                    />
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => {
                    setSelectedLoan(loan);
                    setIsPaymentDialogOpen(true);
                  }}
                >
                  <IndianRupee className="w-4 h-4 mr-2" />
                  Record Payment
                </Button>
              </div>
            ))}
          </div>

          {filteredLoans.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No loans found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try a different search term" : "Start by adding your first loan"}
              </p>
              <Button variant="accent" onClick={() => navigate("/calculator")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Loan
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Record Payment</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Record a payment for {selectedLoan?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-foreground">Payment Amount (₹)</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="pl-10"
                  placeholder="Enter amount"
                />
              </div>
              {selectedLoan && (
                <p className="text-sm text-muted-foreground">
                  Suggested EMI: {formatCurrency(selectedLoan.emi)}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setIsPaymentDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="accent" className="flex-1" onClick={handleRecordPayment}>
                Record Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Loans;
