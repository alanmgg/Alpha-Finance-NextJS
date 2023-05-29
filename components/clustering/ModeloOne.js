import React, { useState, useEffect } from "react";
import MatrizEstandarizada from "./MatrizEstandarizada";
import LineData from "./LineData";
import MatrizParticional from "./MatrizParticional";
import ClusterC from "./GrupByC";
import Centroides from "./Centroides";
import ScatterChart from "./ScatterChart";
import Spinner from "./../utilities/Spinner";

export default function ModeloOne(props) {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      setMainData(props.var);
    }
  }, [props]);

  return (
    <div className="grid pt-5">
      {mainData !== null ? (
        <div className="col-12 xl:col-12">
          <div>
            <h5>Modelo 1: Segmentación particional.</h5>
            <h6>Algoritmo: K-means.</h6>
            <p>
              Los clústeres mediante K-means es un aprendizaje no supervisado
              popular. Se utiliza para encontrar grupos intrínsecos dentro del
              conjunto de datos sin etiquetar y extraer inferencias de ellos.
            </p>
            <p>
              Cuando se trabaja con clustering, dado que son algoritmos basados
              en distancias, es fundamental escalar los datos para que cada una
              de las variables contribuyan por igual en el análisis.
            </p>

            <MatrizEstandarizada var={mainData} />
            <LineData var={mainData} />
            <MatrizParticional var={mainData} />
            <ClusterC var={mainData} />
            <Centroides var={mainData} />
            <ScatterChart var={mainData} />
          </div>
        </div>
      ) : (
        <div className="col-12 xl:col-12">
          <Spinner layout="small" />
        </div>
      )}
    </div>
  );
}
