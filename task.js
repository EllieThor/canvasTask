function Shooter(args) {
  let myCanvas = document.createElement("canvas");
  myCanvas.width = 500;
  myCanvas.height = 500;
  //   myCanvas.style.borderColor = "red";
  args.parent.appendChild(myCanvas);
  let ctx = myCanvas.getContext("2d");

  let isShooterExist = false;
  let currentShooterPosition = { posX: 0, posY: 0 };

  myCanvas.addEventListener("click", (evt) => {
    drewShooter(myCanvas, evt);
  });

  myCanvas.addEventListener("onmousemove", function (evt) {
    drewShooter(myCanvas, evt);
  });

  //   myCanvas.addEventListener("click", (evt) => {
  //     projectile;
  //   });

  function drewShooter(myCanvas, evt) {
    var pos = getMousePos(myCanvas, evt);
    console.log("pos x: ", pos.x, "  pos y: ", pos.y);
    if (!isShooterExist) {
      currentShooterPosition.posX = pos.x;
      currentShooterPosition.posY = pos.y;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = args.bulletColor;
      ctx.fill();
      ctx.closePath();
      isShooterExist = true;
      console.log("isShooterExist: ", isShooterExist);
    } else if (isShooterExist && pos.x === currentShooterPosition.posX && pos.y === currentShooterPosition.posY) {
      ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
      isShooterExist = false;
      currentShooterPosition.posX = 0;
      currentShooterPosition.posY = 0;
      console.log("isShooterExist: ", isShooterExist);
    } else {
      console.log("else");
      let x = "";
      x = `currentX=${currentShooterPosition.posX}, pos x=${pos.x}, currentY=${currentShooterPosition.posY}, pos y=${pos.y}`;
      DV.innerHTML = x;
      //   const projectile = new Projectile(pos.x, pos.y, 5, args.color, { x: 1, y: 1 });
      //   projectile.drew();
      //   let angle = aten2(pos.x, pos.y);
      //   console.log("angle: ", angle);
    }
  }
  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }
  class Projectile {
    constructor(x, y, radius, color, velocity) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity;
    }
    drew() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    update() {
      this.x = this.x + this.velocity;
      this.y = this.y + this.velocity;
    }
  }
  //   const projectile = new Projectile(currentShooterPosition.posX, currentShooterPosition.posY, 5, args.color, { x: 1, y: 1 });
  const projectile = new Projectile(myCanvas.width / 2, myCanvas.height / 2, 5, args.color, { x: 1, y: 1 });
  projectile.drew();

  function animate() {
    requestAnimationFrame(animate);
    projectile.drew();
    projectile.update();
  }
  //   animate();
}
