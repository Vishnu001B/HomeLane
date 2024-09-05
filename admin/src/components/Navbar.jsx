import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  BarChart,
  Edit,
} from "lucide-react";

const Navbar = () => {
  return (
    <div>
      <nav className="grid gap-6 text-lg font-medium px-2 pt-10">
        <Link
          to="/dashboard"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Home className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          to="/manage-navbar"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Users className="h-5 w-5" />
          Manage Navbar
        </Link>
        <Link
          to="/orders"
          className="flex items-center gap-4 px-2.5 text-foreground"
        >
          <ShoppingCart className="h-5 w-5" />
          Orders
        </Link>
        <Link
          to="/create-product"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Package className="h-5 w-5" />
          Create Product
        </Link>
        <Link
          to="/Mange-product"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Package className="h-5 w-5" />
          Mange-product
        </Link>
        <Link
          to="/manage-category"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Edit className="h-5 w-5" />
          Manage Category
        </Link>
        <Link
          to="/manage-banner"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Edit className="h-5 w-5" />
          Manage Banner
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <BarChart className="h-5 w-5" />
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
