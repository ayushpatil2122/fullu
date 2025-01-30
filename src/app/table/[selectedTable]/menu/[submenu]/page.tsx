"use client"

import { Provider } from "react-redux"
import Cart from "@/components/Cart"
import Menu from "@/components/Menu"
import { useParams } from "next/navigation"
import { useTableNumber } from "@/hooks/useTableNumber"
import { store } from "@/store/store"

function Page() {
  const params = useParams()
  const { selectedTable, submenu } = params
  const urlTableNumber = Number(selectedTable)

  const tableNumber = useTableNumber(urlTableNumber)

  if (tableNumber === null) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      {submenu === "cart" ? (
        <Cart tableNumber={tableNumber} />
      ) : (
        <Menu submenu={submenu as string} tableNumber={tableNumber} />
      )}
    </div>
  )
}

export default function WrappedPage() {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  )
}

