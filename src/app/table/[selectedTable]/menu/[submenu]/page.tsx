'use client'

import Cart from "@/components/Cart"
import Menu from "@/components/Menu"
import { useParams } from "next/navigation"

export default function Page() {
  const params = useParams();
  const { selectedTable, submenu } = params;
  
  const tableNumber = Number(selectedTable);
  
  if (isNaN(tableNumber) || tableNumber < 1 || tableNumber > 6) {
    return (
      <div className="p-4 text-red-500">
        Invalid table number. Please select a valid table (1-6).
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {submenu === "cart" ? (
        <Cart tableNumber={tableNumber} />
      ) : (
        <Menu submenu={submenu as string} tableNumber={tableNumber} />
      )}
    </div>
  );
}