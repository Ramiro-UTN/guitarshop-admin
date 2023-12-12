"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MainNav = () => {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Resumen",
      active: pathname === `/${params.storeId}`
    },
    {
      href: `/${params.storeId}/carteleras`,
      label: "Carteleras",
      active: pathname === `/${params.storeId}/carteleras`
    },
    {
      href: `/${params.storeId}/intrumentos`,
      label: "Instrumentos",
      active: pathname === `/${params.storeId}/instrumentos`
    },
    {
      href: `/${params.storeId}/tipos`,
      label: "Tipos",
      active: pathname === `/${params.storeId}/tipos`
    },
    {
      href: `/${params.storeId}/tamaños`,
      label: "Tamaños",
      active: pathname === `/${params.storeId}/tamaños`
    },
    {
      href: `/${params.storeId}/maderas`,
      label: "Maderas",
      active: pathname === `/${params.storeId}/maderas`
    },
    {
      href: `/${params.storeId}/productos`,
      label: "Productos",
      active: pathname === `/${params.storeId}/productos`
    },
  ]
  return ( 
    <nav className="flex items-center gap-x-4">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            `text-sm font-medium transition-colors 
            relative after:bg-black dark:after:bg-white after:absolute after:h-[2px] after:w-0 
            after:bottom-[-0.5rem] after:left-0 hover:after:w-full after:transition-all 
            after:duration-300`,
            route.active ? `bg-primary after:h-0 hover:bg-primary/90 p-2 rounded-md after:bg-none
             text-white dark:text-black dark:bg-white`: "text-muted-foreground hover:text-primary "
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
   );
}
 
export default MainNav;