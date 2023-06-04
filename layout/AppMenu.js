import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);

  const model = [
    {
      label: "Inicio",
      items: [{ label: "Panel", icon: "pi pi-fw pi-home", to: "/" }]
    },

    {
      label: "Algoritmos",
      items: [
        {
          label: "Análisis exploratorio de datos",
          icon: "pi pi-fw pi-table",
          to: "/process/eda",
          query: { symbol: "NFLX", name: "Netflix", menu: "no" }
        },
        {
          label: "Análisis de componentes principales",
          icon: "pi pi-fw pi-bars",
          to: "/process/acp",
          query: { symbol: "NFLX", name: "Netflix", menu: "no" }
        },
        {
          label: "Pronóstico con árboles de decisión",
          icon: "pi pi-fw pi-share-alt",
          to: "/process/forecastad",
          query: { symbol: "NFLX", name: "Netflix", menu: "no" }
        },
        {
          label: "Pronóstico con bosques aleatorios",
          icon: "pi pi-fw pi-circle",
          to: "/process/forecastba",
          query: { symbol: "NFLX", name: "Netflix", menu: "no" }
        },
        {
          label: "Clasificación múltiple",
          icon: "pi pi-fw pi-folder-open",
          to: "/process/classification",
          query: { menu: "no" }
        },
        {
          label: "Clustering particional",
          icon: "pi pi-fw pi-desktop",
          to: "/process/clustering",
          query: { menu: "no" }
        }
      ]
    },

    {
      label: "¿Cómo empezar?",
      items: [
        {
          label: "Documentación",
          icon: "pi pi-fw pi-question",
          to: "https://alphaminingdocs.vercel.app/",
          target: "_blank"
        },
        {
          label: "Ver código",
          icon: "pi pi-fw pi-search",
          url: "https://github.com/alanmgg/Alpha-Mining-NextJS",
          target: "_blank"
        }
      ]
    }
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
