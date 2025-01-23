'use client'

import Cart from "@/components/Cart"
import Menu from "@/components/Menu"
import { useParams } from "next/navigation"

export default function Page() {
  const params = useParams();
  const { selectedTable, submenu } = params;
  const tableNumber = Number(selectedTable);


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