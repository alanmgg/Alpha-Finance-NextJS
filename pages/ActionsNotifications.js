import { toast } from "react-toastify";

export default {
  pushSuccess: function (message) {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  },

  pushInfo: function (message) {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  },

  pushError: function (message) {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  },

  pushLoadingSuccess: async function (message) {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const id = toast.info("Por favor, espere...", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    await sleep(1500);

    toast.update(id, {
      render: message,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "success"
    });
  },

  pushLoadingError: async function (message) {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const id = toast.info("Por favor, espere...", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    await sleep(1500);

    toast.update(id, {
      render: message,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "error"
    });
  }
};
