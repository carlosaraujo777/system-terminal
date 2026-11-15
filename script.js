const body = document.getElementById("terminal-body");
const input = document.getElementById("terminal-input");

// ===== SISTEMA DE INTRO =====
const introScreen = document.getElementById("intro-screen");
const introText = document.getElementById("intro-text");
const mainTerminal = document.getElementById("main-terminal");

const mensagensIntro = [
  "> INITIALIZING SYSTEM... [OK]",
  "> LOADING KERNEL MODULES... [OK]",
  "> BYPASSING LOCAL FIREWALL... [OK]",
  "> ESTABLISHING SECURE CONNECTION... [OK]",
  "> WELCOME, NEO 🐇."
];

let msgIndex = 0;
let charIndex = 0;

function digitarIntro() {
  if (msgIndex < mensagensIntro.length) {
    const msgAtual = mensagensIntro[msgIndex];
    
    if (charIndex < msgAtual.length) {
      introText.textContent = mensagensIntro.slice(0, msgIndex).join("\n") + "\n" + msgAtual.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(digitarIntro, 30);
    } else {
      msgIndex++;
      charIndex = 0;
      setTimeout(digitarIntro, 500);
    }
  } else {
    setTimeout(() => {
      introScreen.classList.add("escondido");
      mainTerminal.classList.remove("escondido");
      document.getElementById("terminal-input").focus();
      // Inicia os eventos do terminal só depois da intro
      iniciarTerminal();
    }, 1000);
  }
}

window.addEventListener("load", () => {
  setTimeout(digitarIntro, 500);
});


// ===== LÓGICA DO JOGO =====
let missaoAtual = 1;
let alvoAtual = null;
let conectado = false;

const missoes = {
  1: {
    ip: "192.168.0.42",
    nome: "Servidor Local",
    sucessoMsg: "Accessing root directory... [OK]",
    pegadinha: [
      "[SYSTEM] Wait a second...",
      "You really thought it was that easy?",
      "We logged your IP. The police are on their way. 🚓",
      "Nice try, but you can't access here. 🤭"
    ]
  },
  2: {
    ip: "10.0.0.99",
    nome: "Banco Central",
    sucessoMsg: "Bypassing bank firewall... [OK]",
    pegadinha: [
      "[SYSTEM] Transferring $1,000,000...",
      "[SYSTEM] ALMOST DONE... [OK]",
      "ERROR: Account balance is zero.",
      "Did you really think a bank would be this easy?",
      "Go get a job, script kiddie. 💸"
    ]
  },
  3: {
    ip: "44.55.66.77",
    nome: "NASA Mainframe",
    sucessoMsg: "Accessing satellite controls... [OK]",
    pegadinha: [
      "[SYSTEM] Launching nuclear missiles...",
      "[SYSTEM] ALMOST DONE... [OK]",
      "Just kidding.",
      "FBI has been notified. Your IP is 127.0.0.1 (localhost).",
      "You're not a hacker, you're a clown. 🚔🤡"
    ]
  }
};

function tocarSom() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = 'square';
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.05;
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
  } catch (e) {
    // Ignora se o navegador bloquear o áudio
  }
}

function iniciarTerminal() {
  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const comando = input.value.trim().toLowerCase();
    input.value = "";
    if (comando === "") return;

    adicionarLinha(`C:\\Users\\root> ${comando}`, "comando");
    processarComando(comando);
  });
}

function processarComando(comando) {
  const missao = missoes[missaoAtual];

  if (comando === "help") {
    adicionarLinha("Available commands:", "resposta");
    if (!alvoAtual) {
      adicionarLinha("  scan         → scan the network for targets", "resposta");
    } else if (!conectado) {
      adicionarLinha(`  connect ${alvoAtual} → connect to the target IP`, "resposta");
    } else {
      adicionarLinha("  exploit      → run the exploit on the target", "resposta");
    }
    adicionarLinha("  clear        → clear the terminal screen", "resposta");
    return;
  }

  if (comando === "clear") {
    const paragrafos = body.querySelectorAll("p");
    paragrafos.forEach((p) => {
      if (!p.classList.contains("prompt-line")) p.remove();
    });
    return;
  }

  if (comando === "scan") {
    if (alvoAtual) {
      adicionarLinha("Already scanned. Proceed to connection.", "resposta");
      return;
    }
    adicionarLinha("Scanning local network...", "resposta");
    tocarSom();
    setTimeout(() => {
      adicionarLinha(`[+] Found active host: ${missao.ip} (Port 22 - SSH open)`, "comando");
      adicionarLinha(`[!] Type 'connect ${missao.ip}' to initiate connection.`, "resposta");
      tocarSom();
      alvoAtual = missao.ip;
    }, 1500);
    return;
  }

  if (comando.startsWith("connect")) {
    if (!alvoAtual) {
      adicionarLinha("ERROR: You need to scan the network first. Type 'scan'.", "erro");
      return;
    }
    if (comando !== `connect ${missao.ip}`) {
      adicionarLinha(`ERROR: Invalid IP. The target is ${missao.ip}`, "erro");
      return;
    }
    
    adicionarLinha(`Connecting to ${missao.ip}...`, "resposta");
    setTimeout(() => {
      adicionarLinha(`Connection established. Firewall detected at ${missao.nome}.`, "comando");
      adicionarLinha("[!] Run 'exploit' to attempt bypass.", "resposta");
      tocarSom();
      conectado = true;
    }, 1500);
    return;
  }

  if (comando === "exploit") {
    if (!conectado) {
      adicionarLinha("ERROR: You need to be connected first. Type 'connect [ip]'.", "erro");
      return;
    }

    adicionarLinha("Injecting payload...", "resposta");
    tocarSom();
    setTimeout(() => {
      adicionarLinha("Bypassing firewall... [OK]", "resposta");
      adicionarLinha(missao.sucessoMsg, "resposta");
      tocarSom();
      
      setTimeout(() => {
        missao.pegadinha.forEach((msg, index) => {
          setTimeout(() => {
            tocarSom();
            adicionarLinha(msg, "erro");
            
            if (index === missao.pegadinha.length - 1) {
              if (missaoAtual < 3) {
                setTimeout(() => {
                  adicionarLinha(`[SYSTEM] Target ${missao.nome} was a decoy.`, "resposta");
                  adicionarLinha(`[SYSTEM] New mission unlocked: ${missoes[missaoAtual + 1].nome}.`, "comando");
                  adicionarLinha("Type 'scan' to start the new mission.", "resposta");
                  missaoAtual++;
                  alvoAtual = null;
                  conectado = false;
                }, 1500);
              } else {
                // Fim do jogo - Chama o carregamento falso
                setTimeout(() => {
                  adicionarLinha("[SYSTEM] All missions completed. You are not a hacker. Goodbye. 🖥️", "comando");
                  setTimeout(mostrarCarregamentoFalso, 1500); 
                }, 1000);
              }
            }
          }, index * 1500);
        });
      }, 1500);
    }, 2000);
    return;
  }

  adicionarLinha(`'${comando}' is not recognized as an internal or external command.`, "erro");
}

function adicionarLinha(texto, tipo = "resposta") {
  const linhas = texto.split("\n");
  linhas.forEach((linha) => {
    const p = document.createElement("p");
    p.textContent = linha;
    
    if (tipo === "comando") p.className = "txt-cinza";
    if (tipo === "erro") p.className = "txt-vermelho";
    
    const promptLine = body.querySelector(".prompt-line");
    body.insertBefore(p, promptLine);
  });
  body.scrollTop = body.scrollHeight;
}

// ===== TROLAGEM DO CARREGAMENTO FALSO =====
function mostrarCarregamentoFalso() {
  const carregamentoDiv = document.createElement("div");
  carregamentoDiv.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.95); color: #fff;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    font-family: "Consolas", monospace; z-index: 9999;
  `;

  const textoStatus = document.createElement("p");
  textoStatus.textContent = "Installing Hack.exe...";
  textoStatus.style.marginBottom = "20px";
  textoStatus.style.fontSize = "1.2rem";

  const barraContainer = document.createElement("div");
  barraContainer.style.cssText = `
    width: 300px; height: 20px; border: 2px solid #fff;
    border-radius: 4px; padding: 2px;
  `;

  const barraProgresso = document.createElement("div");
  barraProgresso.style.cssText = `
    height: 100%; width: 0%; background-color: #fff; transition: width 0.1s linear;
  `;

  const textoPorcentagem = document.createElement("p");
  textoPorcentagem.textContent = "0%";
  textoPorcentagem.style.marginTop = "10px";

  barraContainer.appendChild(barraProgresso);
  carregamentoDiv.appendChild(textoStatus);
  carregamentoDiv.appendChild(barraContainer);
  carregamentoDiv.appendChild(textoPorcentagem);
  document.body.appendChild(carregamentoDiv);

  let progresso = 0;
  
  const intervalo = setInterval(() => {
    progresso += Math.floor(Math.random() * 5) + 1;
    
    if (progresso >= 99) {
      progresso = 99;
      clearInterval(intervalo);
      
      setTimeout(() => { textoStatus.textContent = "Almost done..."; }, 1000);
      setTimeout(() => {
        textoStatus.textContent = "Finalizing installation...";
        textoStatus.style.color = "#ff0";
      }, 3000);

      setTimeout(() => {
        textoStatus.textContent = "ERROR: Connection timed out.";
        textoStatus.style.color = "#f00";
        textoPorcentagem.textContent = "99%";
        
        let piscar = 0;
        const piscarInterval = setInterval(() => {
          carregamentoDiv.style.background = piscar % 2 === 0 ? "#300" : "#000";
          piscar++;
          if (piscar > 6) {
            clearInterval(piscarInterval);
            carregamentoDiv.style.background = "#000";
            
            setTimeout(() => {
              carregamentoDiv.remove();
              adicionarLinha("[SYSTEM] Just kidding. But you actually waited for it, didn't you? 🤡", "erro");
            }, 1500);
          }
        }, 200);
      }, 6000);
      return;
    }

    barraProgresso.style.width = `${progresso}%`;
    textoPorcentagem.textContent = `${progresso}%`;
  }, 150);
}