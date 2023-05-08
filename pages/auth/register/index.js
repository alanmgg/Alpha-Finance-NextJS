import React, { useContext, useState } from "react";
import Link from "next/link";
import AppConfig from "../../../layout/AppConfig";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { LayoutContext } from "../../../layout/context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
// Api
import { createUser } from "../../api/usersApi";
// Notifications
import ActionsNotifications from "../../ActionsNotifications";

export default function RegisterPage() {
  const [checked, setChecked] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""
  });

  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );

  function fillFields(type, data) {
    switch (type) {
      case "name":
        setForm({ ...form, name: data });
        break;
      case "lastName":
        setForm({ ...form, lastName: data });
        break;
      case "email":
        setForm({ ...form, email: data });
        break;
      case "phone":
        setForm({ ...form, phone: data });
        break;
      case "password":
        setForm({ ...form, password: data });
        break;
      default:
        break;
    }
  }

  function onSubmit() {
    createUser(form, loadUserHandler, loadErrorHandler);
  }

  async function loadUserHandler(response) {
    if (response.ok) {
      var logClient = await response.json();
      ActionsNotifications.pushSuccess("Usuario creado ...");
      setForm({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        password: ""
      });
      return;
    }
    if (response.status === 400) {
      const error = await response.text();
      throw new Error(error);
    } else if (response.status === 401) {
      const error = await response.json();
      ActionsNotifications.pushLoadingError(error.message);
    } else if (response.status === 404) {
      const error = await response.json();
      ActionsNotifications.pushLoadingError(error.detail);
    }
    throw new Error("Network response was not ok");
  }

  function loadErrorHandler(error) {}

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <img
          src={`/layout/images/logo-${
            layoutConfig.colorScheme === "light" ? "dark" : "white"
          }.svg`}
          alt="Sakai logo"
          className="mb-5 w-6rem flex-shrink-0"
        />
        <div
          style={{
            borderRadius: "56px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)"
          }}
        >
          <div
            className="w-full surface-card py-8 px-5 sm:px-8"
            style={{ borderRadius: "53px" }}
          >
            <div className="text-center mb-5">
              <div className="text-900 text-3xl font-medium mb-3">
                Registrate
              </div>
              <span className="text-600 font-medium">
                ¿Ya tienes una cuenta?
              </span>
              <Link
                href="/auth/login"
                className="text-600 font-medium font-bold"
              >
                {" "}
                Inicia sesión
              </Link>
            </div>

            <div>
              <label
                htmlFor="name1"
                className="block text-900 text-xl font-medium mb-2"
              >
                Nombres
              </label>
              <InputText
                inputid="name1"
                type="text"
                placeholder="Guillermo"
                className="w-full md:w-30rem mb-5"
                style={{ padding: "1rem" }}
                value={form.name !== "" ? form.name : ""}
                onChange={(e) => fillFields("name", e.target.value)}
              />

              <label
                htmlFor="lastname1"
                className="block text-900 text-xl font-medium mb-2"
              >
                Apellidos
              </label>
              <InputText
                inputid="lastname1"
                type="text"
                placeholder="Molero"
                className="w-full md:w-30rem mb-5"
                style={{ padding: "1rem" }}
                value={form.lastName !== "" ? form.lastName : ""}
                onChange={(e) => fillFields("lastName", e.target.value)}
              />

              <label
                htmlFor="email1"
                className="block text-900 text-xl font-medium mb-2"
              >
                Correo
              </label>
              <InputText
                inputid="email1"
                type="text"
                placeholder="admin@mail.com"
                className="w-full md:w-30rem mb-5"
                style={{ padding: "1rem" }}
                value={form.email !== "" ? form.email : ""}
                onChange={(e) => fillFields("email", e.target.value)}
              />

              <label
                htmlFor="phonenumber1"
                className="block text-900 text-xl font-medium mb-2"
              >
                Número télefonico
              </label>
              <InputText
                inputid="phonenumber1"
                type="text"
                placeholder="55 1234 5678"
                className="w-full md:w-30rem mb-5"
                style={{ padding: "1rem" }}
                value={form.phone !== "" ? form.phone : ""}
                onChange={(e) => fillFields("phone", e.target.value)}
              />

              <label
                htmlFor="password1"
                className="block text-900 font-medium text-xl mb-2"
              >
                Password
              </label>
              <Password
                inputid="password1"
                placeholder="Password"
                toggleMask
                className="w-full mb-5"
                inputClassName="w-full p-3 md:w-30rem"
                value={form.password !== "" ? form.password : ""}
                onChange={(e) => fillFields("password", e.target.value)}
              ></Password>

              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                  <Checkbox
                    inputid="rememberme1"
                    checked={checked}
                    onChange={(e) => setChecked(e.checked)}
                    className="mr-2"
                  ></Checkbox>
                  <label htmlFor="rememberme1">Remember me</label>
                </div>
                <a
                  className="font-medium no-underline ml-2 text-right cursor-pointer"
                  style={{ color: "var(--primary-color)" }}
                >
                  Forgot password?
                </a>
              </div>
              <Button
                label="Registrate"
                className="w-full p-3 text-xl"
                onClick={() => onSubmit()}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

RegisterPage.getLayout = function getLayout(page) {
  return (
    <React.Fragment>
      {page}
      <AppConfig simple />
    </React.Fragment>
  );
};
