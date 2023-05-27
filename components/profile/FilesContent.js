import React, { useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";

import { Input, Table } from "reactstrap";

export default function FilesContent() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(undefined);

  function onUpload() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  function handleFileChange(file) {
    console.log(file[0]);
  }

  return (
    <div className="col-12 xl:col-12">
      <div
        className="card"
        style={{ borderColor: "#F1F1F1", boxShadow: "2px 2px 4px #F1F1F1" }}
      >
        <Input
          type="file"
          name="file"
          id="exampleFile"
          onChange={(e) => handleFileChange(e.target.files)}
        />

        <Table hover className="mt-3" size="sm" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Tamaño</th>
              <th>Tipo</th>
              <th>Modificación más reciente</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>Delete</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
