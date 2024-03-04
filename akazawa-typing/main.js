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
    // 100ms��ɔw�i�F�����ɖ߂�
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  // ���^�C�v�̏ꍇ
  score++;
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // �e�L�X�g���Ȃ��Ȃ�����V�����e�L�X�g��\��
  if(untyped === '') {
    createText();
  }
  text.textContent = score;
};


const rankCheck = score => {
  let text = '';
  if(score < 30) {
    text = `���Ȃ��͂܂��ԑ򂳂�ɂȂ鎑�i������܂���B\n�ԑ򂳂���ۂ��l�܂ł���${30 - score}�����ł��B`;
  } else if(score < 50) {
    text = `���Ȃ��́s�ԑ򂳂���ۂ��l�t�ł��B\n�u�N���X�}�X�X�����Ԃ����ԑ򂳂�v�܂ł���${50 - score}�����ł��B`;    
  } else if(score < 70) {
    text = `���Ȃ��́s�N���X�}�X�X�����Ԃ����ԑ򂳂�t�ł��B\n�u�^���ԂȂ��@�̐ԑ򂳂�v�܂ł���${70 - score}�����ł��B`;    
  } else if(score < 90) {
    text = `���Ȃ��́s�^���ԂȂ��@�̐ԑ򂳂�t�ł��B\n�u�T���^�N���[�X���̐ԑ򂳂�v�܂ł���${90 - score}�����ł��B`;    
  } else if(score < 110) {
    text = `���Ȃ��́s�T���^�N���[�X���̐ԑ򂳂�t�ł��B\n�u���E�̐ԑ򂳂�v�܂ł���${110 - score}�����ł��B`;    
  } else if(score < 120) {
    text = `���Ȃ��́s���E�̐ԑ򂳂�t�ł��B\n�u���ʂȐԑ򂳂�v�܂ł���${130 - score}�����ł��B`;    
  }else if(score >= 130) {
    text = `���Ȃ��́s���ʂȐԑ򂳂�t�ł��B\n���߂łƂ��������܂�!�I�I`;    
  }
 
  return `${score}�����łĂ܂���!\n${text}\n�yOK�z���g���C / �y�L�����Z���z�I��`;
};

// �Q�[�����I��
const gameOver = id => {
  clearInterval(id);

  const result = confirm(rankCheck(score));

  // OK�{�^�����N���b�N���ꂽ�烊���[�h����
  if(result == true) {
    window.location.reload();
  }
};

// �J�E���g�_�E���^�C�}�[
const timer = () => {

  // �^�C�}�[������HTML�v�f�ip�v�f�j���擾����
  let time = count.textContent;

  const id = setInterval(() => {

    // �J�E���g�_�E������
    time--;
    count.textContent = time;

    // �J�E���g��0�ɂȂ�����^�C�}�[���~����
    if(time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// �Q�[���X�^�[�g���̏���
start.addEventListener('click', () => {

  // �J�E���g�_�E���^�C�}�[���J�n����
  timer();

  // �����_���ȃe�L�X�g��\������
  createText();

  // �u�X�^�[�g�v�{�^�����\���ɂ���
  start.style.display = 'none';

  // �L�[�{�[�h�̃C�x���g����
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = '�X�^�[�g�{�^���������Ă�������';
