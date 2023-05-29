import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";

export default function DynamicInputs(props) {
  const { columnas } = props.var || {};
  const [inputValues, setInputValues] = useState(
    Array.isArray(columnas) ? Array(columnas.length).fill(0) : []
  );
  const [pronostic, setPronostic] = useState(null);

  useEffect(() => {
    if (props.pronostic !== null) {
      console.log(props.pronostic);
      setPronostic(props.pronostic.pronostic);
    }
  }, [props]);

  function handleInputChange(index, label, value) {
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = Number(value);

      return newValues;
    });

    const jsonObject = {};
    columnas.forEach((key, index) => {
      jsonObject[key] = inputValues[index];
    });

    var newObject = { ...jsonObject };
    newObject[label] = Number(value);
    props.method(newObject);
  }

  return (
    <div div className="grid">
      {columnas !== undefined
        ? columnas.map((label, index) => (
            <div className="col-6 xl:col-6" key={index}>
              <div>
                <p htmlFor={`input-${index}`}>{label}</p>

                <InputText
                  inputid="email1"
                  type="text"
                  placeholder="..."
                  className="w-full mb-3"
                  style={{ padding: "1rem" }}
                  value={inputValues[index]}
                  onChange={(e) =>
                    handleInputChange(index, label, e.target.value)
                  }
                />
              </div>
            </div>
          ))
        : null}

      {pronostic !== null ? (
        <div className="col-12 xl:col-12">
          <pre className="app-code" style={{ fontSize: 12 }}>
            <code>Pronóstico: {pronostic}</code>
          </pre>
        </div>
      ) : null}
    </div>
  );
}
