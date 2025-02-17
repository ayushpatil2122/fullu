export interface MenuItem {
  id: number
  name: string
  price: string
  image: string
}


export const menuItems = [
  {
    id: 1,
    name: "Cold Coffee",
    price: 120,
    image: "/assets/Cold-Coffee.jpeg",
    rating: 4.5,
    soldCount: "1000+"
  },
  {
    id: 2,
    name: "French Fries",
    price: 120,
    image: "/assets/French-Fries.jpeg",
    rating: 4.5,
    soldCount: "1000+"
  },
  {
    id: 3,
    name: "Mojito Mint",
    price: 90,
    image: "/assets/Mojito-Mint.jpeg",
    rating: 4.5,
    soldCount: "1000+"
  }
]


export const tables = [
  { id: 1, number: 1, capacity: 2 },
  { id: 2, number: 2, capacity: 4 },
  { id: 3, number: 3, capacity: 6 },
  { id: 4, number: 4, capacity: 2 },
  { id: 5, number: 5, capacity: 8 },
  { id: 6, number: 6, capacity: 4 },
  { id: 7, number: 7, capacity: 2 },
  { id: 8, number: 8, capacity: 6 },
]




export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  item?: string;  // Keep for backward compatibility
}

export interface Table {
  id: string;
  status: TableStatus;
  size: "small" | "medium" | "large";
  hasAlert?: boolean;
  capacity: number;
  lastOrder?: string;
  orders: OrderItem[];
}

export type TableStatus = "available" | "occupied" | "ready";

export interface WebSocketMessage {
  type: "connection" | "order_update" | "admin_order_update";
  tableNumber?: number;
  orders?: OrderItem[];
  status?: string;
}

export interface WSServerMessage {
  type: "order_update";
  tableNumber: number;
  orders: OrderItem[];
}

export interface CartProps {
  tableNumber: number;
}