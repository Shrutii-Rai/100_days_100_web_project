(function () {
    "use strict";

    var WIN_LINES = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    var board = Array(9).fill(null);
    var current = "O";
    var gameOver = false;
    var scores = { O: 0, X: 0, D: 0 };
    var moveHistory = [];
    var timerSec = 0;
    var timerInterval = null;
    var mode = "pvp";
    var theme = "neon";

    var boardEl     = document.getElementById("board");
    var statusEl    = document.getElementById("statusText");
    var turnChip    = document.getElementById("turnChip");
    var timerChip   = document.getElementById("timerChip");
    var scoreOEl    = document.getElementById("scoreO");
    var scoreXEl    = document.getElementById("scoreX");
    var scoreDEl    = document.getElementById("scoreD");
    var historyList = document.getElementById("historyList");
    var startView   = document.getElementById("startView");
    var gameView    = document.getElementById("gameView");
    var winView     = document.getElementById("winView");
    var modeSelect  = document.getElementById("modeSelect");
    var themeSelect = document.getElementById("themeSelect");

    /* ── Theme ───────────────────────────── */
    function applyTheme(t) {
        document.body.setAttribute("data-theme", t);
    }

    /* ── Start screen ────────────────────── */
    document.getElementById("startBtn").addEventListener("click", function () {
        mode  = document.getElementById("startMode").value;
        theme = document.getElementById("startTheme").value;
        modeSelect.value  = mode;
        themeSelect.value = theme;
        applyTheme(theme);
        startView.style.display = "none";
        gameView.style.display  = "grid";
        startNewRound();
    });

    modeSelect.addEventListener("change", function () {
        mode = this.value;
        startNewRound();
    });

    themeSelect.addEventListener("change", function () {
        theme = this.value;
        applyTheme(theme);
    });

    /* ── Render board ────────────────────── */
    function renderBoard() {
        boardEl.innerHTML = "";
        board.forEach(function (val, i) {
            var btn = document.createElement("button");
            btn.className = "cell";
            if (val) {
                btn.classList.add(val === "O" ? "mark-o" : "mark-x");
                btn.textContent = val;
                btn.disabled = true;
            }
            btn.addEventListener("click", function () { handleClick(i); });
            boardEl.appendChild(btn);
        });
    }

    /* ── Handle player click ─────────────── */
    function handleClick(i) {
        if (gameOver || board[i]) return;
        if (mode !== "pvp" && current === "X") return;
        placeMove(i, current);
    }

    /* ── Place a move ────────────────────── */
    function placeMove(i, mark) {
        board[i] = mark;
        moveHistory.push({ index: i, mark: mark });
        renderBoard();
        updateHistory();

        var win = checkWin();
        if (win) {
            highlightWin(win);
            scores[mark]++;
            updateScores();
            gameOver = true;
            stopTimer();
            setTimeout(function () { showWinModal(mark); }, 400);
        } else if (board.every(Boolean)) {
            scores.D++;
            updateScores();
            gameOver = true;
            stopTimer();
            setTimeout(showDrawModal, 300);
        } else {
            current = current === "O" ? "X" : "O";
            updateStatus();
            if (mode !== "pvp" && current === "X") {
                setTimeout(doCpuMove, 480);
            }
        }
    }

    /* ── CPU move ────────────────────────── */
    function doCpuMove() {
        if (gameOver) return;
        var avail = board.map(function (v, i) { return v ? null : i; }).filter(function (v) { return v !== null; });
        if (!avail.length) return;

        var move;
        if (mode === "cpu-easy") {
            move = avail[Math.floor(Math.random() * avail.length)];
        } else if (mode === "cpu-medium") {
            move = Math.random() < 0.6 ? bestMove() : avail[Math.floor(Math.random() * avail.length)];
        } else {
            move = bestMove();
        }

        boardEl.classList.add("thinking");
        setTimeout(function () {
            boardEl.classList.remove("thinking");
            placeMove(move, "X");
        }, 0);
    }

    /* ── Minimax best move ───────────────── */
    function bestMove() {
        var best = -Infinity, mv = -1;
        board.forEach(function (v, i) {
            if (!v) {
                board[i] = "X";
                var s = minimax(board, 0, false);
                board[i] = null;
                if (s > best) { best = s; mv = i; }
            }
        });
        return mv;
    }

    function minimax(b, depth, isMax) {
        var w = scanWinner(b);
        if (w === "X") return 10 - depth;
        if (w === "O") return depth - 10;
        if (b.every(Boolean)) return 0;

        var best = isMax ? -Infinity : Infinity;
        b.forEach(function (v, i) {
            if (!v) {
                b[i] = isMax ? "X" : "O";
                var s = minimax(b, depth + 1, !isMax);
                b[i] = null;
                best = isMax ? Math.max(best, s) : Math.min(best, s);
            }
        });
        return best;
    }

    function scanWinner(b) {
        for (var i = 0; i < WIN_LINES.length; i++) {
            var l = WIN_LINES[i];
            if (b[l[0]] && b[l[0]] === b[l[1]] && b[l[0]] === b[l[2]]) return b[l[0]];
        }
        return null;
    }

    function checkWin() {
        for (var i = 0; i < WIN_LINES.length; i++) {
            var l = WIN_LINES[i];
            if (board[l[0]] && board[l[0]] === board[l[1]] && board[l[0]] === board[l[2]]) return l;
        }
        return null;
    }

    function highlightWin(line) {
        var cells = boardEl.querySelectorAll(".cell");
        line.forEach(function (i) { cells[i].classList.add("win-cell"); });
    }

    /* ── UI helpers ──────────────────────── */
    function updateStatus() {
        var label = (mode !== "pvp" && current === "X") ? "CPU" : "Player " + current;
        statusEl.textContent = label + "'s turn";
        turnChip.textContent = "Turn: " + current;
        turnChip.className = "chip " + (current === "O" ? "turn-o" : "turn-x");
        resetTimer();
    }

    function updateScores() {
        scoreOEl.textContent = scores.O;
        scoreXEl.textContent = scores.X;
        scoreDEl.textContent = scores.D;
    }

    function updateHistory() {
        historyList.innerHTML = "";
        var recent = moveHistory.slice(-10);
        recent.forEach(function (m, idx) {
            var li = document.createElement("li");
            var num = moveHistory.length - recent.length + idx + 1;
            var who = (mode !== "pvp" && m.mark === "X") ? "CPU" : "Player " + m.mark;
            li.textContent = "#" + num + " " + who + " → cell " + (m.index + 1);
            historyList.appendChild(li);
        });
        historyList.scrollTop = historyList.scrollHeight;
    }

    /* ── Modals ──────────────────────────── */
    function showWinModal(mark) {
        var label = (mode !== "pvp" && mark === "X") ? "CPU" : "Player " + mark;
        document.getElementById("winBadge").textContent = "Winner!";
        document.getElementById("winTitle").textContent = label + " wins!";
        document.getElementById("winSub").textContent = "Great moves. Ready for the next round?";
        winView.style.display = "flex";
    }

    function showDrawModal() {
        document.getElementById("winBadge").textContent = "Draw";
        document.getElementById("winTitle").textContent = "It's a draw!";
        document.getElementById("winSub").textContent = "Nobody wins this round.";
        winView.style.display = "flex";
    }

    document.getElementById("winNextBtn").addEventListener("click", function () {
        winView.style.display = "none";
        startNewRound();
    });
    document.getElementById("winCloseBtn").addEventListener("click", function () {
        winView.style.display = "none";
    });
    document.getElementById("newRoundBtn").addEventListener("click", function () {
        winView.style.display = "none";
        startNewRound();
    });
    document.getElementById("resetAllBtn").addEventListener("click", function () {
        scores = { O: 0, X: 0, D: 0 };
        updateScores();
        winView.style.display = "none";
        startNewRound();
    });

    /* ── Hint ────────────────────────────── */
    document.getElementById("hintBtn").addEventListener("click", function () {
        if (gameOver) return;
        var cells = boardEl.querySelectorAll(".cell");
        cells.forEach(function (c) { c.classList.remove("hint-cell"); });

        var avail = board.map(function (v, i) { return v ? null : i; }).filter(function (v) { return v !== null; });
        if (!avail.length) return;

        var pick = avail[Math.floor(Math.random() * avail.length)];

        // Try to find a winning/blocking move for hints in medium/hard
        if (mode === "cpu-hard" || mode === "cpu-medium") {
            for (var i = 0; i < WIN_LINES.length; i++) {
                var l = WIN_LINES[i];
                var empties = l.filter(function (x) { return !board[x]; });
                var marks   = l.map(function (x) { return board[x]; }).filter(Boolean);
                if (empties.length === 1 && marks.length === 2 && marks[0] === marks[1] && marks[0] === current) {
                    pick = empties[0];
                    break;
                }
            }
        }

        cells[pick].classList.add("hint-cell");
        setTimeout(function () { cells[pick].classList.remove("hint-cell"); }, 2000);
    });

    /* ── Undo ────────────────────────────── */
    document.getElementById("undoBtn").addEventListener("click", function () {
        if (!moveHistory.length) return;
        var steps = mode === "pvp" ? 1 : 2;
        for (var i = 0; i < steps; i++) {
            var last = moveHistory.pop();
            if (!last) break;
            board[last.index] = null;
        }
        gameOver = false;
        winView.style.display = "none";
        var filled = board.filter(Boolean).length;
        current = filled % 2 === 0 ? "O" : "X";
        renderBoard();
        updateHistory();
        updateStatus();
    });

    /* ── Timer ───────────────────────────── */
    function resetTimer() {
        stopTimer();
        timerSec = 0;
        timerChip.textContent = "0s";
        timerInterval = setInterval(function () {
            timerSec++;
            timerChip.textContent = timerSec + "s";
        }, 1000);
    }

    function stopTimer() {
        if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    }

    /* ── New round ───────────────────────── */
    function startNewRound() {
        board = Array(9).fill(null);
        current = "O";
        gameOver = false;
        moveHistory = [];
        renderBoard();
        updateHistory();
        updateStatus();
        if (mode !== "pvp" && current === "X") setTimeout(doCpuMove, 600);
    }

})();