const vscode = acquireVsCodeApi();

// const button = document.querySelector("button");

// button.addEventListener("click", () => {
//   vscode.postMessage({ type: "colorSelected", value: "asdfasdf" });
// });

const converter = new showdown.Converter();
const form = document.querySelector("form");
const actionButtons = document.querySelectorAll(".action-button");
const content = document.querySelector(".content");
const textarea = form.querySelector("textarea");

const handleDisableButtons = () => {
  form
    .querySelectorAll("button")
    .forEach((button) => button.setAttribute("disabled", "disabled"));
};

const handleEnableButtons = () => {
  form
    .querySelectorAll("button")
    .forEach((button) => button.removeAttribute("disabled"));
};

window.addEventListener("message", (event) => {
  const message = event.data; // The json data that the extension sent
  switch (message.type) {
    case "content": {
      content.innerHTML = converter.makeHtml(message.result);
      handleEnableButtons();
      textarea.value = "";
      break;
    }
    case "validation-error": {
      handleEnableButtons();
      break;
    }
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleDisableButtons();
  vscode.postMessage({ type: "prompt", value: textarea.value });
});

actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleDisableButtons();
    vscode.postMessage({ type: "shortcut", value: button.dataset.type });
  });
});
