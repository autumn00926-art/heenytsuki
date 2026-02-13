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

mBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  mBtn.classList.toggle("active"); // 버튼 자체에 애니메이션 클래스 토글
  mGnb.classList.toggle("move");
  header.classList.toggle("on");
});

// ============================
// 메인 슬라이드 (자동)
// ============================
const slider = document.querySelector(".slider");
let currentSlide = 0;

setInterval(function () {
  currentSlide++;
  if (currentSlide >= 5) {
    // 이미지 개수 5개
    currentSlide = 0;
  }
  slider.style.marginLeft = -100 * currentSlide + "%";
}, 3000); // 3000ms = 3초

// ============================
// 이벤트 배너 닫기
// ============================
const eventBanner = document.querySelector("#event");
const eventCloseBtn = document.querySelector(".event-close-btn");
const mainVisual = document.querySelector("#main-visual");

if (eventCloseBtn) {
  eventCloseBtn.addEventListener("click", function () {
    eventBanner.style.display = "none";
    header.style.paddingTop = "10px";
    if (mainVisual) mainVisual.style.marginTop = "140px";
  });
}
