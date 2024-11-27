import { ReactNode } from "react";

import MenuNavbar from "@/components/MenuNavbar";

export default function ({children} : {children : ReactNode}) {
    return <>
        <MenuNavbar/>
        {children}
    </>
}