// src/ui.js
import { initAuth, login, logout } from "./auth.js";
import { sendCommand } from "./commands.js";
import { addMemory, loadMemory } from "./memory.js";

let currentUser = null;

const userLabel = document.getElementById("user-label");
const logsEl = document.getElementById("logs");
const commandInput = document.getElementById("command-input");
const btnSendCommand = document.getElementById("btn-send-command");
const btnLogout = document.getElementById("btn-logout");

const btnOpenApp = document.getElementById("btn-open-app");
const btnSendMsg = document.getElementById("btn-send-msg");
const btnRunRoutine = document.getElementById("btn-run-routine");

const memoryInput = document.getElementById("memory-input");
const btnSaveMemory = document.getElementById("btn-save-memory");
const memoryList = document.getElementById("memory-list");

// Auth
initAuth(async user => {
  currentUser = user;
  if (user) {
    userLabel.textContent = `Signed in as ${user.email}`;
    await refreshMemory();
  } else {
    userLabel.textContent = "Not signed in";
  }
});

// TEMP: auto-login for dev (replace with real login UI)
login("test@example.com", "password").catch(() => {
  console.warn("Login failed, set up a real login UI.");
});

// Commands
function log(text) {
  const div = document.createElement("div");
  div.className = "text-sm text-gray-300 mb-1";
  div.textContent = text;
  logsEl.prepend(div);
}

btnSendCommand.addEventListener("click", async () => {
  if (!currentUser) return;
  const text = commandInput.value.trim();
  if (!text) return;

  await sendCommand(currentUser.uid, "TEXT_COMMAND", { text });
  log(`You: ${text}`);
  commandInput.value = "";
});

btnOpenApp.addEventListener("click", async () => {
  if (!currentUser) return;
  await sendCommand(currentUser.uid, "OPEN_APP", { package: "com.spotify.music" });
  log("Command: Open Spotify");
});

btnSendMsg.addEventListener("click", async () => {
  if (!currentUser) return;
  await sendCommand(currentUser.uid, "SEND_SMS", {
    to: "+441234567890",
    body: "Jarvis test message",
  });
  log("Command: Send test SMS");
});

btnRunRoutine.addEventListener("click", async () => {
  if (!currentUser) return;
  await sendCommand(currentUser.uid, "RUN_ROUTINE", { name: "evening_mode" });
  log("Command: Run routine 'evening_mode'");
});

btnLogout.addEventListener("click", async () => {
  await logout();
});

// Memory
async function refreshMemory() {
  if (!currentUser) return;
  const items = await loadMemory(currentUser.uid);
  memoryList.innerHTML = "";
  for (const item of items) {
    const div = document.createElement("div");
    div.className = "bg-gray-800 rounded px-3 py-2";
    div.textContent = item.content;
    memoryList.appendChild(div);
  }
}

btnSaveMemory.addEventListener("click", async () => {
  if (!currentUser) return;
  const content = memoryInput.value;
  await addMemory(currentUser.uid, content);
  memoryInput.value = "";
  await refreshMemory();
});
