import Menu from "@/components/Menu";

export default function({params} : {params : {submenu : string}}) {
    return <>
        <Menu submenu={params.submenu}/>
    </>
}