import { Button } from "@/components/ui/button";
import { Stethoscope, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-card border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-primary p-3 rounded-lg shadow-card">
              <Stethoscope className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-heading font-bold text-foreground">CogniCare</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Dementia Screening</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/test">Patient Test</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="outline" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button variant="outline" size="icon" className="md:hidden">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}