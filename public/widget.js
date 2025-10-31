// public/widget.js
(() => {
  const btn = document.createElement("button");
  btn.textContent = "💬 Ask Schengen Visa Assistant";
  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.right = "20px";
  btn.style.background = "#0a4dad";
  btn.style.color = "#fff";
  btn.style.padding = "12px 16px";
  btn.style.borderRadius = "50px";
  btn.style.border = "none";
  btn.style.cursor = "pointer";
  btn.onclick = () => alert("Chatbox will open here.");
  document.body.appendChild(btn);
})();
