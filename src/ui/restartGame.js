const restartButton = () => {
  const button = document.createElement("button");
  button.classList.add("restart-button");
  button.innerText = "Restart ?";
  button.style.display = "none";
  return button;
};

export default restartButton;
