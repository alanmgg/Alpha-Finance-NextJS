import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function TableCompanies(props) {
  const [companies, setCompanies] = useState(null);
  const [copyCompanies, setCopyCompanies] = useState(null);
  const [form, setForm] = useState({ companie: "" });

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    setForm({ companie: "" });

    // Screen resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (props.var !== null) {
      setCompanies(props.var);
      setCopyCompanies(props.var);
    }
  }, [props]);

  function fillFields(type, data) {
    switch (type) {
      case "companie":
        setForm({ ...form, companie: data });

        const copyArrayCompanie = [...copyCompanies];

        const patron = new RegExp(data);
        const arrayFiltrado = copyArrayCompanie.filter((objeto) => {
          return Object.values(objeto).some((valor) => patron.test(valor));
        });

        setCompanies(arrayFiltrado);
        break;
      default:
        break;
    }
  }

  return (
    <div className="grid">
      <div className="col-12 xl:col-12">
        <div className="card">
          <h5>Empresas</h5>
          <InputText
            inputid="companie1"
            type="text"
            placeholder="Tesla, AMD, Meta, Netflix ..."
            className="w-full mb-3"
            style={{ padding: "1rem" }}
            value={form.companie !== "" ? form.companie : ""}
            onChange={(e) => fillFields("companie", e.target.value)}
          />
          <DataTable
            value={companies}
            rows={windowSize.width > 590 ? 10 : 5}
            paginator
            responsiveLayout="scroll"
          >
            <Column
              field="name"
              header="Nombre"
              sortable
              style={{ width: "35%" }}
            />
            <Column
              field="symbol"
              header="Simbolo"
              sortable
              style={{ width: "35%" }}
            />
            <Column
              field="founded"
              header="Fundada"
              sortable
              style={{ width: "35%" }}
            />
            <Column
              header="Vista"
              style={{ width: "25%" }}
              body={(data) => (
                <>
                  <Link
                    href={{
                      pathname: "/process",
                      query: { symbol: data.symbol, name: data.name }
                    }}
                  >
                    <Button icon="pi pi-search" type="button" text />
                  </Link>
                </>
              )}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
}
