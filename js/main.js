document.addEventListener("DOMContentLoaded", function () {
    // 헤더 로드
    const headerInclude = document.querySelector("#header-include");

    if (headerInclude) {
        fetch("header.html")
            .then((response) => response.text())
            .then((data) => {
                headerInclude.innerHTML = data;
                initMainScripts(); // 헤더 로드 후 스크립트 실행
            })
            .catch((error) => console.error("Error loading header:", error));
    } else {
        initMainScripts(); // 헤더가 없는 페이지라도 스크립트 실행
    }

    // 푸터 로드
    const footerInclude = document.querySelector("#footer-include");
    if (footerInclude) {
        fetch("footer.html")
            .then((response) => response.text())
            .then((data) => {
                footerInclude.innerHTML = data;
            })
            .catch((error) => console.error("Error loading footer:", error));
    }
});

function initMainScripts() {
    // ============================
    // 모바일 아코디언 메뉴 (div 구조)
    // ============================

    const depth1 = document.querySelectorAll(".menu > li");

    depth1.forEach((item) => {
        const btn = item.querySelector("div");
        if (!btn) return;

        btn.addEventListener("click", function (e) {
            e.stopPropagation();

            let sub = item.querySelector(".sub");

            // 모든 메뉴 닫기
            depth1.forEach((other) => {
                if (other !== item) {
                    other.querySelector("div")?.classList.remove("active");
                    const otherSub = other.querySelector(".sub");
                    if (otherSub) otherSub.style.height = "0px";
                }
            });

            // 현재 열기/닫기
            btn.classList.toggle("active");

            if (sub) {
                if (btn.classList.contains("active")) {
                    const subItems = sub.querySelectorAll("li").length;
                    const liHeight = sub.querySelector("li").clientHeight;
                    sub.style.height = subItems * liHeight + "px";
                } else {
                    sub.style.height = "0px";
                }
            }
        });
    });
    // ============================
    // 모바일 메뉴 열기/닫기
    // ============================

    const mBtn = document.querySelector(".m-btn");
    const mGnb = document.querySelector(".m-gnb");
    const header = document.querySelector("#header");

    if (mBtn && mGnb && header) {
        mBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            mBtn.classList.toggle("active"); // 버튼 자체에 애니메이션 클래스 토글
            mGnb.classList.toggle("move");
            header.classList.toggle("on");
        });
    }

    // ============================
    // 메인 슬라이드 (자동)
    // ============================
    const slider = document.querySelector(".slider");
    if (slider) {
        let currentSlide = 0;
        setInterval(function () {
            currentSlide++;
            if (currentSlide >= 5) {
                // 이미지 개수 5개
                currentSlide = 0;
            }
            slider.style.marginLeft = -100 * currentSlide + "%";
        }, 3000); // 3000ms = 3초
    }

    // ============================
    // 이벤트 배너 닫기
    // ============================
    const eventBanner = document.querySelector("#event");
    const eventCloseBtn = document.querySelector(".event-close-btn");
    const mainVisual = document.querySelector("#main-visual");

    if (eventCloseBtn && eventBanner) {
        eventCloseBtn.addEventListener("click", function () {
            eventBanner.style.display = "none";
            if (header) header.style.paddingTop = "10px";
            if (mainVisual) mainVisual.style.marginTop = "140px";
        });
    }

    // ============================
    // 장바구니 추가 모달
    // ============================
    const addToCartButtons = document.querySelectorAll(".add-cart-btn");
    const cartModal = document.querySelector("#cart-modal");

    if (addToCartButtons.length > 0 && cartModal) {
        const modalCloseBtn = cartModal.querySelector(".modal-close");
        const openModal = () => cartModal.classList.add("show");
        const closeModal = () => cartModal.classList.remove("show");

        addToCartButtons.forEach(button => button.addEventListener("click", openModal));
        if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
        cartModal.addEventListener("click", (e) => {
            if (e.target === cartModal) closeModal();
        });
    }
}
