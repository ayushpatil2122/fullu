'use client'

import Menu from "@/components/Menu";
import { useParams } from "next/navigation";

interface PageProps {
  params: {
    submenu: string;
  };
}

export default function Page({ params }: PageProps) {
  const parameter = useParams();
  const {  selectedTable } = parameter;
  return (
    <>
      <Menu submenu={params.submenu} tableNumber = {Number(selectedTable)}/>
    </>
  );
}
