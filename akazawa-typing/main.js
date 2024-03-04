let untyped = '';
let typed = '';
let score = 0;

const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const text = document.getElementById('count-text');

const textLists = [
  'akazawa','akazawa sann','akazawa3','akasawa','I love akazawa','Good morning akazawa',
  'i am akazawa','Let akazawa','I want to be akazawa','my name is akazawa','akazawasann',
  'akasawasann','thankyou akazawa','seeyou akazawa','OK akazawa','AkaZaWa','Hey Akazawa','happybirthday akaZawa'
  ,'akayama','Oh aKazawa!','Merry ChrisTmaS AkaZaWa','redzawa',
];

const createText = () => {
  typed = '';
  typedfield.textContent = typed;
  let random= Math.floor(Math.random() * textLists.length);
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

const keyPress = e => {

  if(e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
    // 100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  // 正タイプの場合
  score++;
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // テキストがなくなったら新しいテキストを表示
  if(untyped === '') {
    createText();
  }
  text.textContent = score;
};


const rankCheck = score => {
  let text = '';
  if(score < 30) {
    text = `あなたはまだ赤沢さんになる資格がありません。\n赤沢さんっぽい人まであと${30 - score}文字です。`;
  } else if(score < 50) {
    text = `あなたは《赤沢さんっぽい人》です。\n「クリスマス帽をかぶった赤沢さん」まであと${50 - score}文字です。`;    
  } else if(score < 70) {
    text = `あなたは《クリスマス帽をかぶった赤沢さん》です。\n「真っ赤なお鼻の赤沢さん」まであと${70 - score}文字です。`;    
  } else if(score < 90) {
    text = `あなたは《真っ赤なお鼻の赤沢さん》です。\n「サンタクロース似の赤沢さん」まであと${90 - score}文字です。`;    
  } else if(score < 110) {
    text = `あなたは《サンタクロース似の赤沢さん》です。\n「世界の赤沢さん」まであと${110 - score}文字です。`;    
  } else if(score < 120) {
    text = `あなたは《世界の赤沢さん》です。\n「特別な赤沢さん」まであと${130 - score}文字です。`;    
  }else if(score >= 130) {
    text = `あなたは《特別な赤沢さん》です。\nおめでとうございます!！！`;    
  }
 
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
  clearInterval(id);

  const result = confirm(rankCheck(score));

  // OKボタンをクリックされたらリロードする
  if(result == true) {
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {

  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;

  const id = setInterval(() => {

    // カウントダウンする
    time--;
    count.textContent = time;

    // カウントが0になったらタイマーを停止する
    if(time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {

  // カウントダウンタイマーを開始する
  timer();

  // ランダムなテキストを表示する
  createText();

  // 「スタート」ボタンを非表示にする
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンを押してください';
