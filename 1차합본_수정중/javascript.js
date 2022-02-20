$(document).ready(function() {
    $(window).scroll(() => setProgress())
    setMenuPosition();

    $(window).resize(() => {
        setProgress();
        setMenuPosition(); 
    });

    $(window).on('load', () => {
        $("body,html").animate({
            scrollTop : 0
        }, 500);
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

// 모바일 화면에서 카테고리랑 프로그래스바 고치기 