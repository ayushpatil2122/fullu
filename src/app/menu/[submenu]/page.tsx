import Menu from "@/components/Menu";

interface PageProps {
  params: {
    submenu: string;
  };
}

export default function Page({ params }: PageProps) {
  return (
    <>
      <Menu submenu={params.submenu} />
    </>
  );
}
