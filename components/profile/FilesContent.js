import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Input, Table } from "reactstrap";
import { Button } from "primereact/button";
import Spinner from "./../utilities/Spinner";
// API
import {
  getFilesApi,
  deleteFileApi,
  uploadFileApi
} from "./../../api/filesApi";

export default function FilesContent(props) {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [loadSpinner, setLoadSpinner] = useState(false);
  const [saveFile, setSaveFile] = useState(true);

  useEffect(() => {
    setLoadSpinner(false);
    setSaveFile(true);
  }, []);

  useEffect(() => {
    if (props.var !== null) {
      getFilesApi(props.var.id_user, loadFilesHandler, loadErrorHandler);
      setUser(props.var);
    }
  }, [props]);

  function deleteFile(name) {
    setLoadSpinner(true);
    deleteFileApi(user.id_user, name, loadDeleteFileHandler, loadErrorHandler);
  }

  function handleFileChange(file) {
    setLoadSpinner(true);
    uploadFileApi(
      file[0],
      user.id_user,
      loadUploadFileHandler,
      loadErrorHandler
    );
  }

  async function loadFilesHandler(response) {
    if (response.ok) {
      var response = await response.json();
      if (response.length === 5) {
        setSaveFile(false);
      } else {
        setSaveFile(true);
      }
      setFile(response);
      return;
    }
    if (response.status === 400) {
      const error = await response.text();
      throw new Error(error);
    } else if (response.status === 401) {
      const error = await response.json();
    } else if (response.status === 404) {
      const error = await response.json();
    }
    throw new Error("Network response was not ok");
  }

  async function loadDeleteFileHandler(response) {
    if (response.ok) {
      var response = await response.json();
      getFilesApi(user.id_user, loadFilesHandler, loadErrorHandler);
      setLoadSpinner(false);
      return;
    }
    if (response.status === 400) {
      const error = await response.text();
      throw new Error(error);
    } else if (response.status === 401) {
      const error = await response.json();
    } else if (response.status === 404) {
      const error = await response.json();
    }
    throw new Error("Network response was not ok");
  }

  async function loadUploadFileHandler(response) {
    if (response.ok) {
      var response = await response.json();
      getFilesApi(user.id_user, loadFilesHandler, loadErrorHandler);
      setLoadSpinner(false);
      return;
    }
    if (response.status === 400) {
      const error = await response.text();
      throw new Error(error);
    } else if (response.status === 401) {
      const error = await response.json();
    } else if (response.status === 404) {
      const error = await response.json();
    }
    throw new Error("Network response was not ok");
  }

  function loadErrorHandler(error) {}

  return (
    <div className="col-12 xl:col-12">
      {file !== null && user !== null ? (
        <div className="card">
          {saveFile === true ? (
            <Input
              type="file"
              name="file"
              id="exampleFile"
              onChange={(e) => handleFileChange(e.target.files)}
            />
          ) : null}

          {loadSpinner === false ? (
            <DataTable
              value={file}
              rows={5}
              responsiveLayout="scroll"
              className="mt-3"
            >
              <Column field="name" header="Nombre" style={{ width: "20%" }} />
              <Column field="size" header="Tamaño" style={{ width: "20%" }} />
              <Column field="type" header="Tipo" style={{ width: "20%" }} />
              <Column
                field="date"
                header="Modificación más reciente"
                style={{ width: "25%" }}
              />
              <Column
                header=""
                style={{ width: "10%" }}
                body={(data) => (
                  <>
                    <Link
                      href={{
                        pathname: "/process-improved",
                        query: { user: user.id_user, name: data.name }
                      }}
                    >
                      <Button
                        severity="info"
                        icon="pi pi-search"
                        type="button"
                      />
                    </Link>
                  </>
                )}
              />
              <Column
                header=""
                style={{ width: "10%" }}
                body={(data) => (
                  <>
                    <Button
                      severity="danger"
                      icon="pi pi-trash"
                      onClick={() => deleteFile(data.name)}
                    />
                  </>
                )}
              />
            </DataTable>
          ) : (
            <div className="col-12 xl:col-12 mt-3">
              <Spinner layout="small" />
            </div>
          )}
        </div>
      ) : (
        <div className="col-12 xl:col-12">
          <Spinner layout="small" />
        </div>
      )}
    </div>
  );
}
