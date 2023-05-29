import React, { useEffect, useState } from "react";
import Head from "next/head";
import FilesContent from "../../components/profile/FilesContent";

export default function Profile() {
  const [user, setUser] = useState(null);

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const sessionClient = localStorage.getItem("logClient");
    var objectJSON = JSON.parse(sessionClient);
    setUser(objectJSON);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>Alpha Mining | Perfil de usuario</title>
      </Head>

      {user !== null ? (
        <div className="grid">
          {windowSize.width > 590 ? (
            <div className="col-2 xl:col-2">
              <div
                className="card"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <img
                  src="https://cdn.icon-icons.com/icons2/714/PNG/512/user_icon-icons.com_62212.png"
                  alt="user-icon"
                  width="88"
                />
              </div>
            </div>
          ) : null}

          <div
            className={
              windowSize.width > 590 ? "col-10 xl:col-10" : "col-12 xl:col-12"
            }
          >
            <div className="card">
              <h5>
                {user.name} {user.last_name}
              </h5>
              <p>
                {user.email}
                <br />
                Teléfono: {user.phone}
              </p>
            </div>
          </div>

          <FilesContent var={user} />
        </div>
      ) : null}
    </div>
  );
}
