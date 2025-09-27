      if (/^[\d\s\+\-\*\/\.\(\)]+$/.test(msg)) {
        try {
          return `The answer is ${eval(msg)}`;
        } catch {
          return "I couldn't calculate that expression.";
        }
      }

      const fallback = [
        `I'm still learning. Could you rephrase that?`,
        `That topic is intriguing. Let's explore it together.`,
        `I'm not sure yet, but I can learn if you teach me.`,
        `Let's reason through that and see what we discover.`,
        `Could you clarify that a bit more? I'm listening.`
      ];
      return fallback[Math.floor(Math.random() * fallback.length)];
    }

    function handleInput() {
      const text = input.value.trim();
      if (!text) return;
      addMessage(text, "user");
      input.value = "";
      reason(text).then(reply => {
        addMessage(reply, "bot");
        localStorage.setItem("superintellect_memory", JSON.stringify(memory));
      });
    }

    // Load memory from localStorage if available
    const saved = localStorage.getItem("superintellect_memory");
    if (saved) {
      try {
        memory = JSON.parse(saved);
      } catch {
        memory = { facts: [], definitions: {}, conditionals: [] };
      }
    }

    send.addEventListener("click", handleInput);
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") handleInput();
    });
  </script>
</body>
</html>
