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

    console.log(selectedTable);
  return (
    <>
      <Menu submenu={params.submenu} />
    </>
  );
}
