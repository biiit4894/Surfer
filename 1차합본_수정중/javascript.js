$(document).ready(function() {
    $(window).scroll(() => setProgress())
    setMenuPosition();

    $(window).resize(() => {
        setProgress();
        setMenuPosition(); 
    });

    $(window).on('load', () => {
        // $("body,html").animate({
        //     scrollTop : 0
        // }, 500);
        setProgress();
        setMenuPosition();
    });
})

function setMenuPosition() {
    let totalY = $(document).outerHeight() - $(window).height(); // 전체 페이지 크기 제대로 구하기 

    // 인덱스 위치 지정 
    let preTopPos = 0; 
    let curTopPos = 0; 

    for(i = 1; i <= 5; i++) {
        document.querySelector(`#block${i}`).style.left = `${curTopPos / totalY * 100}%`; 
        preTopPos = curTopPos;
        if(i == 5) curTopPos = $(document).outerHeight(); 
        else curTopPos = $(`#page${i}`).offset().top;
        document.querySelector(`#block${i}`).style.width = ((curTopPos - preTopPos) / totalY * 100) + "%"; 
    }
}

function setProgress() {
    let currY = $(window).scrollTop(); 
    let totalY = $(document).outerHeight() - $(window).height();
    let percentage = (currY / totalY) * 100; 
    document.querySelector("#progress").style.width = percentage + "%";
}

animateScrollTo = function(_selector, _speed, _adjust) {
    const targetEle = document.querySelector(_selector);
    if (!targetEle) return;

    // - Get current & target positions
    const scrollEle = document.documentElement || window.scrollingElement,
    currentY = scrollEle.scrollTop,
    targetY = targetEle.offsetTop - (_adjust || 0);
    animateScrollTo(currentY, targetY, _speed);

    // - Animate and scroll to target position
    function animateScrollTo(_startY, _endY, _speed) {
        _speed = _speed ? _speed : 100;

        const scrollTo = 
        (_startY < _endY) ?
        function() {
            _startY = scrollEle.scrollTop;
            if(_startY < _endY) {
                scrollEle.scrollTop = _startY + _speed;
                requestAnimationFrame(scrollTo);
            }
        }
        : 
        function() {
            _startY = scrollEle.scrollTop;
            if(_startY > _endY) {
                scrollEle.scrollTop = _startY - _speed;
                requestAnimationFrame(scrollTo);
            }
        }
        requestAnimationFrame(scrollTo); 
    };
};

function typing(_selector, _selector2, _text) {
    let textObj = document.querySelector(_selector);
    let text = _text;   
    const sleep = ms => new Promise(res => setTimeout(res,ms)); // sleep 함수 

    //text = text.replace(/<[^>]+>/g, '');
    //console.log(text); 
    text = text.split("");

    textObj.innerHTML = "";
    async function typingMotion() {
        await sleep(500); 
        for(t of text) {
            textObj.innerHTML += t; 
            await sleep(80); 
            if(document.querySelector(_selector2) == null) break; // 말풍선이 화면에 보이지 않으면 break (추가된 클래스가 존재하는지 계속 체크)
        }
    }

    typingMotion(); 
}

function clearText(_selector) {
    let textObj = document.querySelector(_selector);
    textObj.innerHTML = ""; 
}

// 이미지 fade-in 
let controller = new ScrollMagic.Controller(); 

const spyEls = document.querySelectorAll('img.scroll-spy'); // img 태그 중 scroll-spy가 붙은 요소들을 전부 찾겠다.
spyEls.forEach(function (spyEl) {
    new ScrollMagic
        .Scene({ // 감시할 장면(Scene)을 추가
            triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
            triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부 감시
        })
        .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
        .addTo(controller) // 컨트롤러에 장면을 할당(필수!)
})

// 탈시설 장애인 타이핑 
new ScrollMagic.Scene({
    triggerElement: '.q1',
    triggerHook: .8
})
.setClassToggle('.q1', 'show_q1') // 요소가 화면에 보이는지 않보이는지 클래스 추가로 체크 
.on('enter', () => {
    typing('.q1', '.show_q1', "탈시설 장애인 문제를 해결할 공약은 무엇인가요?");
})
.on('leave', () => {
    clearText('.q1'); 
})
.addTo(controller);

// 청소년 성범죄 타이핑 
new ScrollMagic.Scene({
    triggerElement: '.q2',
    triggerHook: .8
})
.setClassToggle('.q2', 'show_q2') // 요소가 화면에 보이는지 않보이는지 클래스 추가로 체크 
.on('enter', () => {
    typing('.q2', '.show_q2', "청소년 성범죄 문제를 해결할 공약은 무엇인가요?");
})
.on('leave', () => {
    clearText('.q2'); 
})
.addTo(controller);