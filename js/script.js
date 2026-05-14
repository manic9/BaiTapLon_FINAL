// JavaScript for handling login and register modals
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

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM elements
    const rateBtns = document.querySelectorAll('.rate-btn');
    const commentBoxDiv = document.getElementById('commentBox');
    const userCommentTextarea = document.getElementById('userComment');
    const submitBtn = document.getElementById('submitVoteBtn');
    const cancelBtn = document.getElementById('cancelCommentBtn');
    const feedbackDiv = document.getElementById('feedbackMessage');

    let selectedRating = null;      // lưu giá trị (1-5)
    let selectedLabel = "";

    // --- Hiển thị comment box (khi nhấn vào nút bình chọn)
    function showCommentBox() {
        if (commentBoxDiv) {
            commentBoxDiv.classList.add('show');
            commentBoxDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function hideCommentBox() {
        if (commentBoxDiv) {
            commentBoxDiv.classList.remove('show');
            if (userCommentTextarea) {
                userCommentTextarea.value = "";
            }
        }
    }

    // --- Xoá active khỏi tất cả nút
    function removeActiveClass() {
        rateBtns.forEach(btn => btn.classList.remove('active'));
    }

    // --- Xử lý khi chọn mức độ
    function handleRatingClick(btn) {
        const value = parseInt(btn.getAttribute('data-value'));
        const label = btn.getAttribute('data-label');

        if (selectedRating === value && commentBoxDiv && commentBoxDiv.classList.contains('show')) {
            removeActiveClass();
            btn.classList.add('active');
            return;
        }

        if (selectedRating === value && commentBoxDiv && !commentBoxDiv.classList.contains('show')) {
            showCommentBox();
            removeActiveClass();
            btn.classList.add('active');
            return;
        }

        // trường hợp chọn rating mới
        selectedRating = value;
        selectedLabel = label;
        removeActiveClass();
        btn.classList.add('active');
        showCommentBox();
        
        // gợi ý placeholder
        const placeholders = {
            1: "Rất tệ? Hãy cho chúng tôi biết vấn đề cụ thể...",
            2: "Bạn chưa hài lòng ở điểm nào? Góp ý giúp team cải thiện nhé.",
            3: "Bình thường. Làm sao để nâng cấp trải nghiệm lên Tốt hơn?",
            4: "Tốt! Bạn thích điều gì nhất? Gửi lời khen ngợi hoặc góp ý thêm.",
            5: "Rất tốt! Cảm ơn bạn. Hãy chia sẻ trải nghiệm tuyệt vời của bạn!"
        };
        if (userCommentTextarea) {
            userCommentTextarea.placeholder = placeholders[value] || "Nhận xét của bạn...";
        }
    }

    // Gắn sự kiện click cho từng nút
    rateBtns.forEach(btn => {
        btn.addEventListener('click', () => handleRatingClick(btn));
    });

    // --- Huỷ comment (ẩn ô, bỏ chọn rating, reset)
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            hideCommentBox();
            removeActiveClass();
            selectedRating = null;
            selectedLabel = "";
            if (feedbackDiv) {
                feedbackDiv.innerHTML = "🔁 Đã huỷ. Bạn có thể chọn lại mức độ khác.";
                feedbackDiv.style.background = "#fff0e6";
                setTimeout(() => {
                    if (!selectedRating && feedbackDiv) {
                        feedbackDiv.innerHTML = "✨ Hãy chọn một mức độ và để lại nhận xét nhé!";
                        feedbackDiv.style.background = "#eef3ff";
                    }
                }, 2500);
            }
        });
    }

    // --- Gửi đánh giá (submit)
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            if (!selectedRating) {
                if (feedbackDiv) {
                    feedbackDiv.innerHTML = "⚠️ Vui lòng chọn một mức độ (Rất tệ → Rất tốt) trước khi gửi.";
                    feedbackDiv.style.background = "#ffe6e6";
                    setTimeout(() => {
                        if (!selectedRating && feedbackDiv) {
                            feedbackDiv.style.background = "#eef3ff";
                        }
                    }, 2000);
                }
                return;
            }

            const comment = userCommentTextarea ? userCommentTextarea.value.trim() : "";
            const ratingText = selectedLabel;
            const ratingValue = selectedRating;

            console.log("Đã gửi đánh giá:", {
                rating: ratingValue,
                label: ratingText,
                comment: comment || "(không có nhận xét)"
            });

            let message = `✅ Cảm ơn bạn! Bạn đã đánh giá "${ratingText}"`;
            if (comment) message += ` và để lại nhận xét: "${comment.substring(0, 80)}${comment.length > 80 ? '…' : ''}"`;
            else message += `. Bạn có thể đóng hộp thoại.`;

            if (feedbackDiv) {
                feedbackDiv.innerHTML = message + `<br><small>🎉 Phản hồi đã được lưu (demo console).</small>`;
                feedbackDiv.style.background = "#dcfce7";
                feedbackDiv.style.color = "#166534";
            }

            hideCommentBox();

            setTimeout(() => {
                if (commentBoxDiv && !commentBoxDiv.classList.contains('show')) {
                    setTimeout(() => {
                        if (commentBoxDiv && !commentBoxDiv.classList.contains('show') && !selectedRating && feedbackDiv) {
                            feedbackDiv.innerHTML = "✨ Hãy chọn một mức độ và để lại nhận xét nhé!";
                            feedbackDiv.style.background = "#eef3ff";
                            feedbackDiv.style.color = "#2c5282";
                        } else if (selectedRating && commentBoxDiv && !commentBoxDiv.classList.contains('show') && feedbackDiv) {
                            feedbackDiv.innerHTML = `⭐ Bạn đang đánh giá "${selectedLabel}". Nhấn lại nút để thay đổi hoặc gửi thêm nhận xét.`;
                        }
                    }, 3500);
                }
            }, 100);
        });
    }

    // Optional: handle any other "#" links to prevent navigation
    const allFakeLinks = document.querySelectorAll('a[href="#"]');
    allFakeLinks.forEach(link => {
        link.addEventListener('click', (e) => e.preventDefault());
    });

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

    const joinBtn = document.getElementById('joinServerBtn');
    const discordBtn = document.getElementById('discordBtn');

    if (joinBtn) {
        joinBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('➡️ Connect to play.cubecraft.net (Java Edition / Bedrock)');
        });
    }

    if (discordBtn) {
        discordBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('✨ Join the official CubeCraft Discord community!');
        });
    }
});