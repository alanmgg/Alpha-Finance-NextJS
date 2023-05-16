import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function Tablecompanies(props) {
  const [companies, setCompanies] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (props.var !== null) {
      setCompanies(props.var);
    }
  }, [props]);

  function formatCurrency(value) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  }

  function pushPage(name, symbol) {
    // var nombre = name.replace(" ", "-");
    var nombre = name.replace(".", "");
    nombre = nombre.replace(",", "");
    router.push(
      "/process/[symbol]-[name]",
      "/process/" + symbol + "-" + encodeURIComponent(nombre)
    );
  }

  return (
    <div className="grid">
      <div className="col-12 xl:col-12">
        <div className="card">
          <h5>Empresas</h5>
          <DataTable
            value={companies}
            rows={10}
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
              field="price"
              header="Precio"
              sortable
              style={{ width: "35%" }}
              body={(data) => formatCurrency(data.price)}
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
                    <Button
                      icon="pi pi-wallet"
                      type="button"
                      text
                      // onClick={() => pushPage(data.name, data.symbol)}
                    />
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
