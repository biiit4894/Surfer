// 스크롤 멈춤 이벤트 처리 콜백 함수 (출처: https://yeolco.tistory.com/155 [열코의 프로그래밍 일기])
$.fn.scrollStopped = function(callback) {
    var that = this, $this = $(that);
    $this.scroll(function(ev) {
        clearTimeout($this.data('scrollTimeout'));
        $this.data('scrollTimeout', setTimeout(callback.bind(that), 3000, ev));
    });
};

// jqcloud 워드리스트 
let word_list = [
    {text: "인권/성평등", weight: 13, url: ""},
    {text: "정치개혁", weight: 10.5, url: ""},
    {text: "안전/환경", weight: 9.4, url: ""},
    {text: "기타", weight: 8},
    {text: "보건복지", weight: 6.2},
    {text: "육아/교육", weight: 5},
    {text: "문화/예술/체육/언론", weight: 5},
    {text: "교통/건축/국토", weight: 5},
    {text: "행정", weight: 5},
    {text: "외교/통일/국방", weight: 4},
    {text: "일자리", weight: 4},
    {text: "미래", weight: 3},
    {text: "성장동력", weight: 3},
    {text: "저출산/고령화대책", weight: 3},
    {text: "반려동물", weight: 3},
    {text: "농산어촌", weight: 3},
    {text: "경제민주화", weight: 3}];

$(document).ready(function() {
    $("#petition_category").jQCloud(word_list, {randomClasses: 3});

    $(window).scroll(() => {
        setProgress()
        $(document.querySelector('.top_button_container')).css('display', 'block'); 
    });

    $(window).scrollStopped(() => {
        $(document.querySelector('.top_button_container')).css('display', 'none');
    })

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

    setMenuPosition();
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

// animateScrollTo = function(_selector, _speed, _adjust) {
//     const targetEle = document.querySelector(_selector);
//     if (!targetEle) return;

//     // - Get current & target positions
//     const scrollEle = document.documentElement || window.scrollingElement,
//     currentY = scrollEle.scrollTop,
//     targetY = targetEle.offsetTop - (_adjust || 0);
//     animateScrollTo(currentY, targetY, _speed);

//     // - Animate and scroll to target position
//     function animateScrollTo(_startY, _endY, _speed) {
//         _speed = _speed ? _speed : 100;

//         const scrollTo = 
//         (_startY < _endY) ?
//         function() {
//             _startY = scrollEle.scrollTop;
//             if(_startY < _endY) {
//                 scrollEle.scrollTop = _startY + _speed;
//                 requestAnimationFrame(scrollTo);
//             }
//         }
//         : 
//         function() {
//             _startY = scrollEle.scrollTop;
//             if(_startY > _endY) {
//                 scrollEle.scrollTop = _startY - _speed;
//                 requestAnimationFrame(scrollTo);
//             }
//         }
//         requestAnimationFrame(scrollTo); 
//     };
// };

function animateScrollTo(_selector, _speed) {
    let page = document.querySelector(_selector);
    $("body,html").animate({
        scrollTop : (page.offsetTop - 60) // offset: 60 
    }, _speed);
}

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
// new ScrollMagic.Scene({
//     triggerElement: '.q1',
//     triggerHook: .8
// })
// .setClassToggle('.q1', 'show_q1') // 요소가 화면에 보이는지 않보이는지 클래스 추가로 체크 
// .on('enter', () => {
//     typing('.q1', '.show_q1', "탈시설 장애인 문제를 해결할 공약은 무엇인가요?");
// })
// .on('leave', () => {
//     clearText('.q1'); 
// })
// .addTo(controller);

// 청소년 성범죄 타이핑 
// new ScrollMagic.Scene({
//     triggerElement: '.q2',
//     triggerHook: .8
// })
// .setClassToggle('.q2', 'show_q2') // 요소가 화면에 보이는지 않보이는지 클래스 추가로 체크 
// .on('enter', () => {
//     typing('.q2', '.show_q2', "청소년 성범죄 문제를 해결할 공약은 무엇인가요?");
// })
// .on('leave', () => {
//     clearText('.q2'); 
// })
// .addTo(controller);

// 모바일 햄버거 메뉴바 
let num = 0; 
let hamburger_button = document.querySelector('.mobile_hamburger_button');
$(hamburger_button).click(() => {
    if(num % 2 == 0) {
        hamburger_button.innerHTML = 'Ⅹ';  
        $('.mobile_menu_container').css('height', '25vh');
        $('.mobile_menu').css('height', '5vh');
        setTimeout(()=>{
            $('.mobile_menu').css('display', 'block'); 
        }, 150); 
    } else {
        hamburger_button.innerHTML = '&#9776;'; 
        $('.mobile_menu_container').css('height', '0vh');
        $('.mobile_menu').css('height', '0vh');
        setTimeout(()=>{
            $('.mobile_menu').css('display', 'none'); 
        }, 200); 
    }
    num += 1; 
})

let mobile_menus = document.querySelectorAll('.mobile_menu');
mobile_menus.forEach((mobile_menu) => {
    $(mobile_menu).click(() => {
        hamburger_button.innerHTML = '&#9776;'; 
        $('.mobile_menu_container').css('height', '0vh');
        $('.mobile_menu').css('height', '0vh');
        setTimeout(()=>{
            $('.mobile_menu').css('display', 'none'); 
        }, 200); 
        num += 1; 
    })
})

// 페이지 맨 위로 이동 
let top_button = document.querySelector('.top_button');
$(top_button).click(() => {
    $("body,html").animate({
        scrollTop : 0
    }, 500);
})

// 한빛
// 답변 보기 버튼 클릭 시 이재명 답변 먼저 fadeIn

// 이 후보 답변 fadeIn 후 스크롤 시 윤 후보 fadeIn, 
// 그 후 스크롤 시 다음 후보 fadeIn 되는 식으로  차례로 fadeIn

$('#answer_button1').click(function(){ // 첫번째 답변 보기 버튼 클릭 후 이 후보 답변 fadIn
    $('#lee_1').animate( {opacity: '1'});
    $('#lee_answer1').animate( {opacity: '1'});
    $(window).scroll( function(){
        $('#yoon_1').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object/2 ){
                $(this).animate({'opacity':'1'},800);
            }
        });
        $('#yoon_answer1').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object/2 ){
                $(this).animate({'opacity':'1'},800);
            }
        }); 
    });
    $(window).scroll( function(){
        $('#sim_1').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object/2 ){
                $(this).animate({'opacity':'1'},800);
            }
        });
        $('#sim_answer1').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object/2 ){
                $(this).animate({'opacity':'1'},800);
            }
        });
    });
    $(window).scroll( function(){
        $('#ahn_1').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object/2 ){
                $(this).animate({'opacity':'1'},800);
            }
        });
        $('#ahn_answer1').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object/2 ){
                $(this).animate({'opacity':'1'},800);
            }
        });
    })
;})

$('#answer_button2').click(function(){ // 두번째 답변 보기 버튼 클릭 후 이 후보 답변 fadeIn
    $('#lee_2').animate( {opacity: '1'});
    $('#lee_answer2').animate( {opacity: '1'});
    $(window).scroll( function(){
        $('#yoon_2').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object/2 ){
                $(this).animate({'opacity':'1'},800);
            }
        });
        $('#yoon_answer2').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object/2 ){
                $(this).animate({'opacity':'1'},800);
            }
        }); 
    });
    $(window).scroll( function(){
        $('#sim_2').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object/2 ){
                $(this).animate({'opacity':'1'},800);
            }
        });
        $('#sim_answer2').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object/2 ){
                $(this).animate({'opacity':'1'},800);
            }
        });
    });
    $(window).scroll( function(){
        $('#ahn_2').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object/2 ){
                $(this).animate({'opacity':'1'},800);
            }
        });
        $('#ahn_answer2').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object/2 ){
                $(this).animate({'opacity':'1'},800);
            }
        });
    })
;})

