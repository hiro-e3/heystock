import { LucideIcon } from "lucide-react";

export type MenuItem = {
  title: string;
  href: string;
  icon?: LucideIcon;
  subItems?: MenuItem[];
};