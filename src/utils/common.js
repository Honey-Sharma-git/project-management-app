export const alert = (message, type) => {
  let alertStyles = "bg-gray-700 text-white";
  if (type === "warning") {
    alertStyles = "bg-amber-300";
  } else if (type === "error") {
    alertStyles = "bg-red-300 text-white";
  } else if (type === "success") {
    alertStyles = "bg-green-300";
  }
  const alertBox = document.createElement("div");
  const alertMsg = document.createElement("div");

  alertBox.className =
    "min-h-screen bg-black/80 absolute inset-0 flex flex-row justify-center items-center";
  alertMsg.className = `border h-30  text-black flex flex-row items-center justify-center ${alertStyles} rounded-xl p-5 alert-animation`;

  alertMsg.innerText = message;

  alertBox.appendChild(alertMsg);
  document.body.appendChild(alertBox);

  //Removing alert after 3 seconds:
  setTimeout(() => {
    alertBox.remove();
  }, 2000);
};
