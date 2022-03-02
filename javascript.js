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
    //$("#petition_category").jQCloud(word_list, {randomClasses: 3});

    $(window).scroll(() => {
        setProgress()
        $(document.querySelector('.top_button_container')).css('display', 'block'); 
    });

    $(window).scrollStopped(() => {
        $(document.querySelector('.top_button_container')).css('display', 'none');
    })

    // $(window).resize(() => {
    //     location.reload(); 
    // });

    $(window).on('load', () => {
        setProgress();
        setMenuPosition();
        resize_img(); 
    });
})

function setMenuPosition() {
    let totalY = $(document).outerHeight();// - $(window).height();

    // 인덱스 위치 지정 
    let preTopPos = 0; 
    let curTopPos = 0; 

    for(i = 1; i <= 5; i++) {
        document.querySelector(`#block${i}`).style.left = `${curTopPos / totalY * 100}%`; 
        preTopPos = curTopPos;
        if(i == 5) curTopPos = $(document).outerHeight();// - $(window).height();
        else curTopPos = $(`#page${i}`).offset().top + (i == 1 ? -90 : (i == 4 ? -90 : 170)); // 숫자들 offset 
        document.querySelector(`#block${i}`).style.width = `${(curTopPos - preTopPos) / totalY * 100}%`; 
    }
}

function setProgress() {
    let currY = $(window).scrollTop(); 
    let totalY = $(document).outerHeight();// - $(window).height();
    document.querySelector("#progress").style.width = `${(currY / totalY) * 100}%`;
}

function animateScrollTo(_selector, _speed) {
    let page = document.querySelector(_selector);
    $("body,html").animate({
        scrollTop : (page.offsetTop - 50) // offset: 50 
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

// 텍스트 fade-in
const spyTxts = document.querySelectorAll('.scroll_txt');
spyTxts.forEach(function (spyTxt) {
    new ScrollMagic
        .Scene({
            triggerElement: spyTxt,
            triggerHook: .9
        })
        .setClassToggle(spyTxt, 'show_txt')
        .addTo(controller)
})

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

// 이미지 크기 조정 
function resize_img() {
    let img_ctn_width;
    if($(window) != null) {
        img_ctn_width = $(window).width();
    } else if(window.document != null && window.document.documentElement != null 
        && img_ctn_width.document.documentElement.clientWidth != null) {
        img_ctn_width = window.document.documentElement.clientWidth;
    }
    img_ctn_width *= (img_ctn_width > 960) ? 0.75 : (img_ctn_width > 500) ? 0.9 : 1; 

    for(let i = 1; i <= 7; i++) {
        let img = document.querySelector('#img' + i);
        let img_width = img.naturalWidth;
        let img_height = img.naturalHeight;         
        let img_ctn_height = img_ctn_width * (img_height / img_width); 

        let img_ctn = document.querySelector('#img_ctn' + i);
        img_ctn.style.height = parseInt(img_ctn_height) + "px";
    }
}

let category_num = 1; 
$('#next_btn').click(() => {
    category_num = (category_num % 17) + 1;
    $('#category_graph_img').attr('src', './images/category_graph' + category_num + '.png'); 
    $('#category_desc_text' + ((category_num == 1) ? 17 : category_num - 1)).css('display', 'none'); 
    $('#category_desc_text' + category_num).css('display', 'block');

    $('#post_by_ctg_title' + ((category_num == 1) ? 17 : category_num - 1)).css('display', 'none'); 
    $('#post_by_ctg_title' + category_num).css('display', 'block');
})

$('#prev_btn').click(() => {
    category_num = (category_num == 1) ? 17 : category_num - 1;
    $('#category_graph_img').attr('src', './images/category_graph' + category_num + '.png'); 
    $('#category_desc_text' + ((category_num % 17) + 1)).css('display', 'none'); 
    $('#category_desc_text' + category_num).css('display', 'block');

    $('#post_by_ctg_title' + ((category_num % 17) + 1)).css('display', 'none'); 
    $('#post_by_ctg_title' + category_num).css('display', 'block');
})

let post_num = 0;
$('.graph_text_switch_btn').click(() => {
    if(post_num % 2 == 0) {
        $('#category_graph_img_ctn').css('display', 'none');
        $('#category_desc_text_ctn').css('display', 'flex');
        $('#graph_text_switch_img').attr('src', './images/graph_icon.png');
    } else {
        $('#category_graph_img_ctn').css('display', 'flex');
        $('#category_desc_text_ctn').css('display', 'none');
        $('#graph_text_switch_img').attr('src', './images/text_icon.png');
    }
    post_num++; 
})

// 한빛

// 장애인 키워드, 장애인 생활권 키워드 관련 청원 강조 - 해당 부분 위치에서 시도하는중....
$(window).scroll( function(){
    $('#topic2_txt7_centertxt').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        if( bottom_of_window > bottom_of_object/2 ){
            $(this).animate({'opacity':'1'},500);
        }
    });
})

// 답변 보기 버튼 클릭 시 이재명 답변 먼저 fadeIn

// 이 후보 답변 fadeIn 후 스크롤 시 윤 후보 fadeIn, 
// 그 후 스크롤 시 다음 후보 fadeIn 되는 식으로  차례로 fadeIn

$('#answer_button1').click(function(){ // 첫번째 답변 보기 버튼 클릭 후 이 후보 답변 fadIn
    $('#topic1-answer-box1').animate( {opacity: '1'},900);
    $(window).scroll( function(){
        $('#topic1-answer-box2').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object/2 ){
                $(this).animate({'opacity':'1'},900);
            }
        }); 
    });
    $(window).scroll( function(){
        $('#topic1-answer-box3').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object){
                $(this).animate({'opacity':'1'},900);
            }
        });
    });
    $(window).scroll( function(){
        $('#topic1-answer-box4').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object){
                $(this).animate({'opacity':'1'},900);
            }
        });
    });
;})

$('#answer_button2').click(function(){ // 첫번째 답변 보기 버튼 클릭 후 이 후보 답변 fadIn
    $('#topic2-answer-box1').animate( {opacity: '1'},900);
    $(window).scroll( function(){
        $('#topic2-answer-box2').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object/2 ){
                $(this).animate({'opacity':'1'},900);
            }
        }); 
    });
    $(window).scroll( function(){
        $('#topic2-answer-box3').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object){
                $(this).animate({'opacity':'1'},900);
            }
        });
    });
    $(window).scroll( function(){
        $('#topic2-answer-box4').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object){
                $(this).animate({'opacity':'1'},900);
            }
        });
    });
;})