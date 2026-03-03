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
      document.body.classList.toggle("no-scroll");
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
      if (currentSlide >= 4) {
        // 이미지 개수 4개
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

    addToCartButtons.forEach((button) =>
      button.addEventListener("click", openModal),
    );
    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
    cartModal.addEventListener("click", (e) => {
      if (e.target === cartModal) closeModal();
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.querySelector(".options select");
  const detailsList = document.querySelector(".details");
  const soldOutButton = document.querySelector(".sold-out");
  const totalDisplay = document.querySelector(".total span:last-child");
  const priceElement = document.querySelector(".product-info .price");

  // 상세 페이지가 아니면 스크립트 실행 중단
  if (
    !selectElement ||
    !detailsList ||
    !soldOutButton ||
    !totalDisplay ||
    !priceElement
  ) {
    return;
  }

  // 가격 텍스트에서 숫자만 추출 (예: "74,000원" -> 74000)
  const productPrice = parseInt(
    priceElement.textContent.replace(/[^0-9]/g, ""),
  );

  function updateButtonState() {
    // 선택된 옵션 목록(detailsList)에 항목이 있는지 확인
    const hasItems = detailsList.children.length > 0;

    if (hasItems) {
      // 옵션이 하나라도 선택되어 있으면 '장바구니로 가기' 활성화
      soldOutButton.disabled = false;
      soldOutButton.textContent = "장바구니로 가기";
      soldOutButton.style.backgroundColor = "#00A9B5";
      soldOutButton.style.cursor = "pointer";
    } else {
      // 선택된 옵션이 없으면 'SOLD OUT' 비활성화
      soldOutButton.disabled = true;
      soldOutButton.textContent = "SOLD OUT";
      soldOutButton.style.backgroundColor = ""; // 기본 색상으로
      soldOutButton.style.cursor = "not-allowed";
    }
  }

  // 페이지 로드 시 버튼 상태 초기화
  updateButtonState();

  selectElement.addEventListener("change", function () {
    const selectedOption = this.value;

    // 필수 옵션 안내 문구 선택 시 동작하지 않음
    if (selectedOption.includes("OPTION")) return;

    const existingItem = Array.from(detailsList.children).find(
      (li) => li.querySelector(".option-name").textContent === selectedOption,
    );

    if (existingItem) {
      alert("이미 선택된 옵션입니다.");
      this.value = this.options[0].value; // 선택 초기화
      return;
    }

    // 리스트 아이템 생성
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="selected-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee;">
          <span class="option-name">${selectedOption}</span>
          <div class="qty-box" style="display: flex; align-items: center; gap: 5px;">
              <input type="number" class="qty-input" value="1" min="1" style="width: 40px; text-align: center;">
              <button class="remove-item" style="border: none; background: none; cursor: pointer;"><i class="fa-solid fa-xmark"></i></button>
          </div>
      </div>
    `;
    detailsList.appendChild(li);

    // 합계 및 버튼 상태 업데이트
    updateTotal();
    updateButtonState();

    // 드롭다운 선택 초기화
    this.value = this.options[0].value;
  });

  // 수량 변경 및 삭제 이벤트 위임
  detailsList.addEventListener("click", function (e) {
    if (e.target.closest(".remove-item")) {
      e.target.closest("li").remove();
      updateTotal();
      updateButtonState(); // 옵션 삭제 후 버튼 상태 업데이트
    }
  });

  detailsList.addEventListener("input", function (e) {
    if (e.target.classList.contains("qty-input")) {
      if (e.target.value < 1) e.target.value = 1;
      updateTotal();
    }
  });

  function updateTotal() {
    let totalQty = 0;
    let totalPrice = 0;

    const items = detailsList.querySelectorAll("li");
    items.forEach((item) => {
      const qty = parseInt(item.querySelector(".qty-input").value) || 0;
      totalQty += qty;
      totalPrice += qty * productPrice;
    });

    totalDisplay.textContent = `${totalPrice.toLocaleString()}원 (${totalQty}개)`;
  }

  soldOutButton.addEventListener("click", function () {
    if (!this.disabled) {
      window.location.href = "cart.html";
    }
  });
});
