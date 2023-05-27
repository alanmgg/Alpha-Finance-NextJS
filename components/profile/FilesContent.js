import React, { useEffect, useState } from "react";
import Link from "next/link";
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

  function deleteFile(idx) {
    setLoadSpinner(true);
    deleteFileApi(
      user.id_user,
      file[idx].name,
      loadDeleteFileHandler,
      loadErrorHandler
    );
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
        <div
          className="card"
          style={{ borderColor: "#F1F1F1", boxShadow: "2px 2px 4px #F1F1F1" }}
        >
          {saveFile === true ? (
            <Input
              type="file"
              name="file"
              id="exampleFile"
              onChange={(e) => handleFileChange(e.target.files)}
            />
          ) : null}

          <Table hover className="mt-3" size="sm" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Tamaño</th>
                <th>Tipo</th>
                <th>Modificación más reciente</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            {loadSpinner === false ? (
              <tbody>
                {file !== null
                  ? file.map((item, idx) => {
                      return (
                        <tr>
                          <th scope="row">{idx + 1}</th>
                          <td>{item.name}</td>
                          <td>{item.size}</td>
                          <td>{item.type}</td>
                          <td>{item.date}</td>
                          <td>
                            <Link
                              href={{
                                pathname: "/process/edaimproved",
                                query: {
                                  user: user.id_user,
                                  filename: item.name
                                }
                              }}
                            >
                              <Button severity="info" icon="pi pi-search" />
                            </Link>
                          </td>
                          <td>
                            {loadSpinner === false ? (
                              <Button
                                severity="danger"
                                icon="pi pi-trash"
                                onClick={() => deleteFile(idx)}
                              />
                            ) : (
                              <Button
                                severity="danger"
                                icon="pi pi-trash"
                                onClick={() => deleteFile(idx)}
                                disabled
                              />
                            )}
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            ) : null}
          </Table>
        </div>
      ) : (
        <div className="col-12 xl:col-12">
          <Spinner layout="small" />
        </div>
      )}

      {loadSpinner !== false ? (
        <div className="col-12 xl:col-12">
          <Spinner layout="small" />
        </div>
      ) : null}
    </div>
  );
}
