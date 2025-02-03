export interface MenuItem {
  id: number
  name: string
  price: string
  image: string
}


export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Butter Chicken",
    price: '390-H, 540-F',
    image: "/assets/butt-chick.jpeg"
  },
  
  {
    id: 2,
    name: "Paneer Masala",
    price: '220',
    image: "/assets/paneer masala.jfif",
  },
 
  {
    id: 3,
    name: "Chicken Tandur",
    price: '590.',
    image: "/assets/tandoor.jpeg",
  },
  {
    id: 4,
    name: "Veg Kolhapuri",
    price: '140',
    image: "/assets/Veg kolha.jpeg",
  },
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
  id: number;
  item: string;
  quantity: number;
  price: number;
  totalPrice: number;
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