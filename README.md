# 🖥️ System Terminal - Fake Hacker CTF

Um simulador de terminal hacker interativo com 3 missões, efeitos sonoros e uma trolagem clássica no final. Inspirado na estética de filmes de invasão dos anos 90 (e no clássico "carregamento que trava no 99%").

🔗 **[Acesse o projeto ao vivo e tente hackear (se conseguir)](https://carlosaraujo777.github.io/system-terminal/)**

---

## 🎮 Como jogar
O jogo funciona como um Capture The Flag (CTF) falso. Você precisa seguir a sequência lógica de comandos no terminal:

1. Digite `scan` para encontrar um alvo na rede.
2. Digite `connect [IP]` para se conectar ao servidor.
3. Digite `exploit` para tentar invadir.

**Cuidado:** Se você pular etapas, o sistema vai rir da sua cara.

## 😈 A Trolagem
Existem 3 missões no total. A cada missão completada, o sistema te dá um "Nice try" e libera a próxima. No final, se você aguentar até o fim, vai se deparar com uma barra de carregamento antiga que... bom, você vai ter que jogar pra ver.

## 🛠️ Tecnologias Utilizadas
- **HTML5 & CSS3:** Layout do terminal retrô, com efeito visual e tipografia monoespaçada.
- **JavaScript (Vanilla):** 
  - Lógica de estado para controle das missões (`missaoAtual`).
  - Efeitos de digitação e delay com `setTimeout`.
  - Efeitos sonoros gerados nativamente pela **Web Audio API** (sem arquivos de áudio).
  - Manipulação dinâmica do DOM.

## 👨‍💻 Autor
**Carlos Alexandre**
Desenvolvedor focado em Dados e Web.

- 💼 [LinkedIn](https://www.linkedin.com/in/carlosaraujo777/)
- 🐙 [GitHub](https://github.com/carlosaraujo777)

---
*"You're not a hacker. Goodbye. 🖥️"*
