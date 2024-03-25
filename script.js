function renderMarkdown(content) {
  content = content.replace(/### (.*?)\n/g, "<h3>$1</h3>");
  content = content.replace(/\* (.*?)\n/g, "<li>$1</li>");
  content = content.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank">$1</a>'
  );
  return content.replace(/\n/g, "<br>");
}

function processCommand(command) {
  if (command.trim() === "") {
    return;
  }
  outputs.push(`-> ${command}`);
  executeCommand(command);
}

function executeCommand(command) {
  let result;
  let cmd = command.toLowerCase();
  if (cmd === "cls" || cmd === "clear") {
    outputs = [];
    outputContainer.innerHTML = "";
    return;
  } else if (cmd.startsWith("echo ")) {
    const textToEcho = command.substring("echo ".length);
    result = textToEcho;
  } else {
    switch (cmd) {
      case "date":
        result = new Date().toString();
        break;
      case "exit":
        result = "session ended....";
        break;
      case "about":
        result = ABOUT_TEXT;
        break;
      case "contact":
        result = CONTACT_TEXT;
        break;
      case "skills":
        result = SKILLS_TEXT;
        break;
      case "help":
        result = HELP_TEXT;
        break;
      default:
        result = `Command not found: ${command}`;
    }
  }
  outputs.push(result);
  renderOutput(result);

  // Move input field below the response
  setTimeout(() => {
    inputField.focus();
  }, 0);
}

function renderOutput(output) {
  const outputElement = document.createElement("div");
  outputElement.className = "cli-output";
  outputElement.innerHTML = renderMarkdown(output);
  outputContainer.appendChild(outputElement);
}

let outputs = [];
const outputContainer = document.getElementById("outputContainer");
const inputField = document.getElementById("inputField");

inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    processCommand(inputField.value);
    inputField.value = "";
  }
});
