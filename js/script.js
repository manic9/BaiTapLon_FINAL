// ======================
// LOGIN / MODAL (giữ nguyên)
// ======================
function openLogin() {
    document.getElementById("loginModal").style.display = "block";
}

function openRegister() {
    document.getElementById("registerModal").style.display = "block";
}

function closeModal() {
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("registerModal").style.display = "none";
}

function copyIP() {
    navigator.clipboard.writeText("play.negatecraft.net");
    alert("Đã copy IP!");
}

// Optional: handle any other "#" links to prevent navigation
const allFakeLinks = document.querySelectorAll('a[href="#"]');
console.log(allFakeLinks);
for (let i = 0; i < allFakeLinks.length; i++) {
    allFakeLinks[i].addEventListener('click', function (e) {
        e.preventDefault();
    });
}

const menu = document.querySelector('.forum-header');
if (menu) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            menu.classList.add('sticky-active');
        } else {
            menu.classList.remove('sticky-active');
        }
    });
}

const scrollUpBtn = document.getElementById('scrollUpBtn');
const scrollDownBtn = document.getElementById('scrollDownBtn');

if (scrollUpBtn) {
    scrollUpBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });
}

// ======================
// MAIN APP
// ======================
document.addEventListener("DOMContentLoaded", () => {

    // ===== DOM =====
    const rateBtns = document.querySelectorAll(".rate-btn");
    const commentBoxDiv = document.getElementById("commentBox");
    const userCommentTextarea = document.getElementById("userComment");
    const submitBtn = document.getElementById("submitVoteBtn");
    const cancelBtn = document.getElementById("cancelCommentBtn");
    const feedbackDiv = document.getElementById("feedbackMessage");

    // ===== STATE =====
    let selectedRating = null;
    let selectedLabel = "";

    // ===== CONFIG =====
    const placeholders = {
        1: "Rất tệ? Hãy cho chúng tôi biết vấn đề cụ thể...",
        2: "Bạn chưa hài lòng ở điểm nào? Góp ý giúp team cải thiện nhé.",
        3: "Bình thường. Làm sao để nâng cấp trải nghiệm lên Tốt hơn?",
        4: "Tốt! Bạn thích điều gì nhất? Gửi lời khen ngợi hoặc góp ý thêm.",
        5: "Rất tốt! Cảm ơn bạn. Hãy chia sẻ trải nghiệm tuyệt vời của bạn!"
    };

    // ===== UI HELPERS =====
    const showCommentBox = () => commentBoxDiv?.classList.add("show");
    const hideCommentBox = () => commentBoxDiv?.classList.remove("show");

    const setActiveButton = (btn) => {
        rateBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    };

    const resetButtons = () => {
        rateBtns.forEach(b => b.classList.remove("active"));
    };

    const updatePlaceholder = (value) => {
        if (userCommentTextarea) {
            userCommentTextarea.placeholder =
                placeholders[value] || "Nhận xét của bạn...";
        }
    };

    const renderFeedback = (html, bg = "#eef3ff", color = "#2c5282") => {
        if (!feedbackDiv) return;
        feedbackDiv.innerHTML = html;
        feedbackDiv.style.background = bg;
        feedbackDiv.style.color = color;
    };

    const truncate = (text, max = 80) =>
        text.length > max ? text.slice(0, max) + "…" : text;

    // ===== RATING LOGIC =====
    const handleRating = (value, label, btn) => {

        const isSame = selectedRating === value;

        // click lại rating cũ
        if (isSame) {
            if (commentBoxDiv?.classList.contains("show")) {
                setActiveButton(btn);
            } else {
                showCommentBox();
                setActiveButton(btn);
            }
            return;
        }

        // chọn mới
        selectedRating = value;
        selectedLabel = label;

        setActiveButton(btn);
        showCommentBox();
        updatePlaceholder(value);
    };

    rateBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            handleRating(
                Number(btn.dataset.value),
                btn.dataset.label,
                btn
            );
        });
    });

    // ===== CANCEL =====
    cancelBtn?.addEventListener("click", () => {
        hideCommentBox();
        resetButtons();

        selectedRating = null;
        selectedLabel = "";

        renderFeedback("🔁 Đã huỷ. Bạn có thể chọn lại mức độ khác.", "#fff0e6");

        setTimeout(() => {
            if (!selectedRating) {
                renderFeedback("✨ Hãy chọn một mức độ và để lại nhận xét nhé!");
            }
        }, 2500);
    });

    // ===== SUBMIT =====
    submitBtn?.addEventListener("click", () => {

        if (!selectedRating) {
            renderFeedback("⚠️ Vui lòng chọn một mức độ trước khi gửi.", "#ffe6e6");
            return;
        }

        const comment = userCommentTextarea?.value.trim() || "";

        console.log("Đã gửi đánh giá:", {
            rating: selectedRating,
            label: selectedLabel,
            comment: comment || "(không có nhận xét)"
        });

        let message = `✅ Cảm ơn bạn! Bạn đã đánh giá "${selectedLabel}"`;

        if (comment) {
            message += ` và để lại nhận xét: "${truncate(comment)}"`;
        } else {
            message += `. Bạn có thể đóng hộp thoại.`;
        }

        renderFeedback(
            message + `<br><small>🎉 Phản hồi đã được lưu (demo console).</small>`,
            "#dcfce7",
            "#166534"
        );

        hideCommentBox();

        setTimeout(() => {
            if (!selectedRating) {
                renderFeedback("✨ Hãy chọn một mức độ và để lại nhận xét nhé!");
            } else {
                renderFeedback(
                    `⭐ Bạn đang đánh giá "${selectedLabel}". Nhấn lại nút để thay đổi hoặc gửi thêm nhận xét.`
                );
            }
        }, 3500);
    });

});