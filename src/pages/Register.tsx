import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type Step = "details" | "otp";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("details");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sending OTP - will be replaced with actual implementation
    setTimeout(() => {
      setIsLoading(false);
      toast.success("OTP sent to your email!");
      setStep("otp");
    }, 1000);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate OTP verification - will be replaced with actual implementation
    setTimeout(() => {
      setIsLoading(false);
      if (otp === "123456") {
        toast.success("Account created successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    }, 1000);
  };

  const handleResendOTP = () => {
    toast.success("OTP resent to your email!");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <span className="font-bold text-xl text-foreground">LoanManager</span>
        </Link>

        {/* Register Card */}
        <div className="glass-card p-8 animate-fade-in">
          {step === "details" ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">Create Account</h1>
                <p className="text-muted-foreground">Start managing your loans today</p>
              </div>

              <form onSubmit={handleSendOTP} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full" variant="accent" disabled={isLoading}>
                  {isLoading ? "Sending OTP..." : "Continue"}
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">Verify Email</h1>
                <p className="text-muted-foreground">
                  Enter the 6-digit code sent to<br />
                  <span className="text-foreground font-medium">{formData.email}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-12 h-14 text-lg border-border bg-input" />
                      <InputOTPSlot index={1} className="w-12 h-14 text-lg border-border bg-input" />
                      <InputOTPSlot index={2} className="w-12 h-14 text-lg border-border bg-input" />
                      <InputOTPSlot index={3} className="w-12 h-14 text-lg border-border bg-input" />
                      <InputOTPSlot index={4} className="w-12 h-14 text-lg border-border bg-input" />
                      <InputOTPSlot index={5} className="w-12 h-14 text-lg border-border bg-input" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button type="submit" className="w-full" variant="accent" disabled={isLoading || otp.length < 6}>
                  {isLoading ? "Verifying..." : "Verify & Create Account"}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-primary hover:underline text-sm"
                  >
                    Didn't receive code? Resend
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="w-full text-center text-muted-foreground hover:text-foreground text-sm"
                >
                  ← Back to registration
                </button>
              </form>
            </>
          )}

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
