import React, { useEffect, useState } from "react";
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
    console.log(objectJSON);
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
      {user !== null ? (
        <div className="grid">
          {windowSize.width > 590 ? (
            <div className="col-2 xl:col-2">
              <div
                className="card"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#F1F1F1",
                  boxShadow: "2px 2px 4px #F1F1F1"
                }}
              >
                <img
                  src="https://cdn.icon-icons.com/icons2/714/PNG/512/user_icon-icons.com_62212.png"
                  alt="user-icon"
                  width="80"
                />
              </div>
            </div>
          ) : null}

          <div
            className={
              windowSize.width > 590 ? "col-10 xl:col-10" : "col-12 xl:col-12"
            }
          >
            <div
              className="card"
              style={{
                borderColor: "#F1F1F1",
                boxShadow: "2px 2px 4px #F1F1F1"
              }}
            >
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

          <FilesContent />
        </div>
      ) : null}
    </div>
  );
}
