import React from "react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Adjust the import path based on your setup
import {
  Package2,
  Home,
  ShoppingCart,
  Package,
  Users2,
  LineChart,
  Settings,
} from "lucide-react";

const Navbar = () => {
  return (
    <div>
      <nav className="grid gap-6 text-lg font-medium px-10 pt-10">
        <Link
          to="/dashboard"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Home className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          to="/navbarheadercontroller"
          className="flex items-center gap-4 px-2.5 text-foreground"
        >
          <ShoppingCart className="h-5 w-5" />
          Navbar
        </Link>
        <Link
          to="/order"
          className="flex items-center gap-4 px-2.5 text-foreground"
        >
          <ShoppingCart className="h-5 w-5" />
          Orders
        </Link>
        <Link
          to="/products"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Package className="h-5 w-5" />
          Products
        </Link>
        <Link
          to="#"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Users2 className="h-5 w-5" />
          Customers
        </Link>
        <Link
          to="#"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <LineChart className="h-5 w-5" />
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
