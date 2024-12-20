import { ReactNode } from "react";

export default function InventoryLayout({ children }: { children: ReactNode }) {
  return <div className="container mx-auto">{children}</div>;
}
