// Index
  // 1: JS for landing page
  // 2: Navigation Bar Functions
  // 3: Canvas operations for Triangle at bottom and next market date

// 1:________________________________________
class TextScramble {
  constructor(el){
    this.el = el;
    this.chars = '@#$%^&*()_+[}":<>>/<"]';
    this.update = this.update.bind(this);
  }

  setText(newText){
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length,newText.length);
    const promise = new Promise((resolve)=>this.resolve = resolve);

    this.queue = [];
    for(let i = 0;i<length;i++){
      const from = oldText[i] || '';
      const to  = newText[i] || '';
      const start = Math.floor(Math.random()*40);
      const end = Math.floor(Math.random()*40) + start;
      this.queue.push({from,to,start,end});
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update(){
    let output = '';
    let complete = 0;
    for(let i=0,n=this.queue.length;i<n;i++){
      let {from,to,start,end,char} = this.queue[i];

      if(this.frame >= end){
        complete++;
        output += to;
      }else if(this.frame >= start){
        if(!char || Math.random() < 0.28){char = this.randomChar();this.queue[i].char = char;}
        output += `<span class='dud'>${char}</span>`;
      }else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if(complete === this.queue.length){this.resolve();}else{
      this.frameRequest = requestAnimationFrame(this.update);this.frame++;}
  }

  randomChar(){
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

const phrases = [
  'Authentic',
  'Authentic Unique',
  'Authentic Unique Original'
]

const el = document.querySelector('.text');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(()=>{
    setTimeout(next,2000)
  })
  counter = (counter+1) % phrases.length
}

next()

// 2:________________________________________
function openNav() { //opens navigation bar
  document.getElementById("navigation").style.width = "20%";
}

function closeNav() { //closes nav bar
  document.getElementById("navigation").style.width = "0";
}

// 3:________________________________________
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.fillStyle = 'rgba(77, 202, 203, 1)';
  ctx.shadowBlur = 20;
  ctx.shadowColor = "rgba(77, 202, 203, 1)";
  ctx.moveTo(0, canvas.width);
  ctx.lineTo(canvas.width,2*canvas.height/3)
  ctx.lineTo(canvas.width,canvas.height);
  ctx.closePath();
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = 'rgba(77, 202, 203, 1)';
  ctx.stroke();
}

draw();
