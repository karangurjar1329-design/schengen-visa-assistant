(() => {
  const API_BASE = "https://schengen-visa-assistant-djtz-2mq7drj9c.vercel.app";
  const WHATSAPP_NUMBER = "+917742818800"; // your WhatsApp number

  // 💬 Style Definitions
  const style = document.createElement("style");
  style.textContent = `
  .sva-btn {
    position: fixed;
    right: 20px;
    bottom: 20px;
    background: #0a4dad;
    color: #fff;
    padding: 14px 18px;
    border-radius: 50px;
    border: none;
    font-weight: 600;
    font-family: system-ui, sans-serif;
    box-shadow: 0 8px 20px rgba(0,0,0,.15);
    cursor: pointer;
    z-index: 9999;
  }
  .sva-chatbox {
    position: fixed;
    right: 20px;
    bottom: 80px;
    width: 340px;
    max-height: 520px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0,0,0,.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 9999;
    transform: translateY(20px);
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s ease;
  }
  .sva-chatbox.open { opacity: 1; transform: translateY(0); pointer-events: auto; }
  .sva-header {
    background: #0a4dad;
    color: #fff;
    padding: 12px 16px;
    font-weight: 700;
    font-size: 15px;
  }
  .sva-body {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    font-family: system-ui, sans-serif;
    font-size: 14px;
    color: #111;
    background: #fafafa;
  }
  .sva-msg {
    margin: 8px 0;
    padding: 10px 12px;
    border-radius: 12px;
    max-width: 80%;
    line-height: 1.4;
    white-space: pre-wrap;
  }
  .sva-msg.bot { background: #e9efff; align-self: flex-start; }
  .sva-msg.user { background: #0a4dad; color: #fff; align-self: flex-end; }
  .sva-input {
    display: flex;
    padding: 8px;
    background: #fff;
    border-top: 1px solid #eee;
  }
  .sva-input input {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 999px;
    padding: 8px 12px;
    font-size: 14px;
    outline: none;
  }
  .sva-input button {
    margin-left: 6px;
    border: none;
    background: #e63946;
    color: #fff;
    border-radius: 999px;
    padding: 8px 14px;
    cursor: pointer;
  }
  .sva-whatsapp {
    margin: 10px auto;
    background: #25D366;
    color: #fff;
    border: none;
    border-radius: 50px;
    padding: 10px 18px;
    font-weight: 600;
    cursor: pointer;
    display: none;
  }
  `;
  document.head.appendChild(style);

  // 💬 Create Elements
  const btn = document.createElement("button");
  btn.className = "sva-btn";
  btn.textContent = "💬 Ask Schengen Visa Assistant";

  const chatbox = document.createElement("div");
  chatbox.className = "sva-chatbox";
  chatbox.innerHTML = `
    <div class="sva-header">Schengen Visa Assistant</div>
    <div class="sva-body"></div>
    <button class="sva-whatsapp">💬 Chat with a Visa Consultant on WhatsApp</button>
    <div class="sva-input">
      <input type="text" placeholder="Type your question..." />
      <button>Send</button>
    </div>
  `;

  const body = chatbox.querySelector(".sva-body");
  const input = chatbox.querySelector("input");
  const send = chatbox.querySelector(".sva-input button");
  const whatsappBtn = chatbox.querySelector(".sva-whatsapp");

  function appendMessage(text, who = "bot") {
    const msg = document.createElement("div");
    msg.className = "sva-msg " + who;
    msg.textContent = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    appendMessage(text, "user");
    input.value = "";
    appendMessage("Typing...", "bot");

    // Detect WhatsApp intent
    if (/whatsapp|contact|agent|talk|help/i.test(text)) {
      body.lastChild.remove();
      appendMessage("Sure! You can chat directly with one of our visa consultants on WhatsApp 👇", "bot");
      whatsappBtn.style.display = "block";
      return;
    }

    try {
      const res = await fetch(API_BASE + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: text }] })
      });
      const data = await res.json();
      body.lastChild.remove();
      appendMessage(data.reply || "Sorry, I couldn’t process that right now.", "bot");
    } catch (err) {
      body.lastChild.remove();
      appendMessage("⚠️ Error connecting to assistant.", "bot");
    }
  }

  send.addEventListener("click", sendMessage);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });

  whatsappBtn.addEventListener("click", () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=Hi! I was chatting with your visa assistant and would like to talk to an agent.`,
      "_blank"
    );
  });

  btn.addEventListener("click", () => {
    chatbox.classList.toggle("open");
    if (chatbox.classList.contains("open") && body.childNodes.length === 0) {
      appendMessage("👋 Hi! I’m the Schengen Visa Assistant. How can I help you today?");
    }
  });

  document.body.appendChild(btn);
  document.body.appendChild(chatbox);
})();
