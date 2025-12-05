import { Calculator, CreditCard, BarChart3, Shield, Zap, Layout } from "lucide-react";

const mainFeatures = [
  {
    icon: Calculator,
    title: "Smart EMI Calculator",
    description: "Calculate any missing value with our intelligent EMI calculator. Support for both EMI and interest-only loans.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: CreditCard,
    title: "Loan Tracking",
    description: "Track multiple loans, record payments, and monitor remaining balances with detailed payment histories.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: BarChart3,
    title: "Payment Analytics",
    description: "Get insights into your payment patterns, interest vs principal breakdown, and loan performance metrics.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const subFeatures = [
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data stays local and secure",
  },
  {
    icon: Zap,
    title: "Real-time Calculations",
    description: "Instant EMI and schedule updates",
  },
  {
    icon: Layout,
    title: "Professional Interface",
    description: "Clean, intuitive design",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mainFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Sub Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="stat-card group"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
