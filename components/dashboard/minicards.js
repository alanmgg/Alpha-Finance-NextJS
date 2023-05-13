import React, { useEffect, useState } from "react";

export default function Minicards(props) {
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      var index = [];
      var result = [];

      while (index.length < 4) {
        var indexA = Math.floor(Math.random() * props.var.length);
        if (!index.includes(indexA)) {
          index.push(indexA);
          result.push(props.var[indexA]);
        }
      }

      setCompanies(result);
    }
  }, [props]);

  return (
    <div className="grid">
      {companies !== null
        ? companies.map((item, index) => {
            return (
              <div key={index} className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                  <div className="flex justify-content-between mb-3">
                    <div>
                      <span className="block text-500 font-medium mb-3">
                        {item.name}
                      </span>
                      <div className="text-900 font-medium text-xl">
                        ${item.price}
                      </div>
                    </div>
                    <div
                      className="flex align-items-center justify-content-center bg-blue-100 border-round"
                      style={{ width: "3.5rem", height: "3.5rem" }}
                    >
                      <span className="text-blue-600 text-lg">
                        {item.symbol}
                      </span>
                    </div>
                  </div>
                  <span className="text-500">Cambio:</span>
                  <span
                    className={
                      item.change_porcent.includes("+")
                        ? "text-green-500 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {" "}
                    {item.change_porcent}
                  </span>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}
