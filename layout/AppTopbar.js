import PrimeReact from "primereact/api";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { classNames } from "primereact/utils";
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { LayoutContext } from "./context/layoutcontext";
// Notifications
import { toast } from "react-toastify";

const AppTopbar = forwardRef((props, ref) => {
  const {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    onMenuToggle,
    showProfileSidebar
  } = useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);

  const [themeDark, setThemeDark] = useState(false);

  function changeThemeA(theme, colorScheme) {
    PrimeReact.changeTheme(layoutConfig.theme, theme, "theme-css", () => {
      setLayoutConfig((prevState) => ({ ...prevState, theme, colorScheme }));
    });
    setThemeDark(!themeDark);
  }

  const router = useRouter();

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current
  }));

  function logoutUser() {
    toast.info("Cerrando sesión ...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    localStorage.removeItem("logClient");
    router.push("/auth/login");
  }

  return (
    <div className="layout-topbar">
      <Link
        href="/"
        className="layout-topbar-logo"
        style={{ textDecoration: "none" }}
      >
        <img
          src={`/layout/images/logo-${
            layoutConfig.colorScheme !== "light" ? "white" : "dark"
          }.svg`}
          width="47.22px"
          height={"35px"}
          widt={"true"}
          alt="logo"
        />
        <span>Alpha Mining</span>
      </Link>

      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible
        })}
      >
        {/* <button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-calendar"></i>
          <span>Calendar</span>
        </button> */}

        <Link href="/profile" style={{ textDecoration: "none" }}>
          <button type="button" className="p-link layout-topbar-button">
            <i className="pi pi-user"></i>
            <span>Perfil</span>
          </button>
        </Link>

        {themeDark === false ? (
          <button
            type="button"
            className="p-link layout-topbar-button"
            onClick={() => changeThemeA("lara-dark-teal", "dark")}
          >
            <i className="pi pi-moon"></i>
            <span>Modo oscuro</span>
          </button>
        ) : (
          <button
            type="button"
            className="p-link layout-topbar-button"
            onClick={() => changeThemeA("lara-light-teal", "light")}
          >
            <i className="pi pi-sun"></i>
            <span>Modo claro</span>
          </button>
        )}

        <button
          type="button"
          className="p-link layout-topbar-button"
          onClick={() => logoutUser()}
        >
          <i className="pi pi-sign-in"></i>
          <span>Cerrar sesión</span>
        </button>

        {/* <Link href="/documentation">
          <button type="button" className="p-link layout-topbar-button">
            <i className="pi pi-cog"></i>
            <span>Settings</span>
          </button>
        </Link> */}
      </div>
    </div>
  );
});

export default AppTopbar;
