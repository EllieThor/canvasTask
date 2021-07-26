// class MyShooter {
//   constructor(parent, color, bulletColor) {
//     this.parent = parent;
//     this.color = color;
//     this.bulletColor = bulletColor;
//   }
// }

function Shooter(args) {
  let myCanvas = document.createElement("canvas");
  myCanvas.width = 400;
  myCanvas.height = 300;
  //   myCanvas.style.borderColor = "red";
  args.parent.appendChild(myCanvas);
  let ctx = myCanvas.getContext("2d");

  let isShooterExist = false;
  let currentShooterPosition = { posX: null, posY: null };

  myCanvas.addEventListener("click", (evt) => {
    drewShooter(myCanvas, evt);
  });

  //   myCanvas.addEventListener("onmousemove", function (evt) {
  //     drewShooter(myCanvas, evt);
  //   });

  //   myCanvas.addEventListener("click", (evt) => {
  //     const bullet = new Bullet(currentShooterPosition.posX, currentShooterPosition.posY, 5, args.bulletColor, { x: 1, y: 1 });
  //   });
  myCanvas.addEventListener("click", (evt) => {
    const angle = Math.atan2(evt.y - currentShooterPosition.posY, evt.x - currentShooterPosition.posX);
    console.log("angle :", angle);
  });

  class Bullet {
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
  function drewShooter(myCanvas, evt) {
    let pos = getMousePos(myCanvas, evt);
    console.log("pos x: ", pos.x, "  pos y: ", pos.y);
    let isDotInside = calculationVolume(pos.x, pos.y, currentShooterPosition.posX, currentShooterPosition.posY, 10);
    if (!isShooterExist) {
      isShooterExist = true;
      console.log("isShooterExist: ", isShooterExist);
      currentShooterPosition.posX = pos.x;
      currentShooterPosition.posY = pos.y;
      drew(pos.x, pos.y, 10, args.color);
    } else if (isShooterExist && isDotInside) {
      ctx.clearRect(currentShooterPosition.posX - 10, currentShooterPosition.posY - 10, currentShooterPosition.posX + 10, currentShooterPosition.posY + 10);
      isShooterExist = false;
      currentShooterPosition.posX = 0;
      currentShooterPosition.posY = 0;
      console.log("isShooterExist: ", isShooterExist);
    } else {
      console.log(`currentX=${currentShooterPosition.posX}, pos x=${pos.x}, currentY=${currentShooterPosition.posY}, pos y=${pos.y}`);
      //   let shooterXVsPosX = currentShooterPosition.posX > pos.x ? currentShooterPosition.posX - pos.x - 5 : currentShooterPosition.posX + pos.x + 5;
      //   let shooterYVsPosY = currentShooterPosition.posY > pos.y ? currentShooterPosition.posY - pos.x - 5 : currentShooterPosition.posY + pos.x + 5;
      //   drew(shooterXVsPosX, shooterYVsPosY, 5, args.bulletColor);

      //   drew(pos.x, pos.y, 5, args.bulletColor);
      //   drew(currentShooterPosition.posX, currentShooterPosition.posY, 5, args.bulletColor);
      //   const bullet = new Bullet(pos.x, pos.y, 5, args.bulletColor, { x: 1, y: 1 });
      //   const bullet = new Bullet(currentShooterPosition.posX, currentShooterPosition.posY, 5, args.bulletColor, { x: 1, y: 1 });
      const bullet = new Bullet(currentShooterPosition.posX, currentShooterPosition.posY, 5, args.bulletColor, null);
      bullet.drew();
      //   ctx.arc(currentShooterPosition.posX, currentShooterPosition.posY, 5, 0, 2 * Math.PI);
      //   ctx.fillStyle = args.bulletColor;
      //   ctx.fill();
      //   ctx.closePath();
      //   ctx.moveTo(currentShooterPosition.posX, currentShooterPosition.posY);
      //   ctx.lineTo(pos.x, pos.y);
      //   ctx.stroke();

      const angle = Math.atan2(pos.y - currentShooterPosition.posY, pos.x - currentShooterPosition.posX);
      console.log("angle :", angle);
    }
  }
  const drew = (posX, posY, r, color) => {
    ctx.beginPath();
    ctx.arc(posX, posY, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  };

  const getMousePos = (canvas, evt) => {
    let rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  };

  const calculationVolume = (newX, newY, shooterX, shooterY, radius) => {
    let dist_points = (newX - shooterX) * (newX - shooterX) + (newY - shooterY) * (newY - shooterY);
    radius *= radius;
    if (dist_points < radius) {
      return true;
    }
    return false;
  };
  // const calculateAngel = () => {};
  // const getAngle = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  //   const dot = x1 * x2 + y1 * y2;
  //   const det = x1 * y2 - y1 * x2;
  //   const angle = (Math.atan2(det, dot) / Math.PI) * 180;
  //   return (angle + 360) % 360;
  // };
  //   const angle = getAngle(
  //     {
  //       x: x1 - x3,
  //       y: y1 - y3,
  //     },
  //     {
  //       x: x2 - x3,
  //       y: y2 - y3,
  //     }
  //   );
  //   console.log(angle);
  ////////////////////////
  //   let isItSwinged = false;
  //   const swingingDV = () => {
  //     if (!isItSwinged) {
  //       document.getElementById("DV2").style.marginLeft = "100px";
  //       document.getElementById("DV2").style.animationDuration = "2s";

  //       isItSwinged = true;
  //     } else {
  //       document.getElementById("DV2").style.marginLeft = "0px";
  //       document.getElementById("DV2").style.animationDuration = "2s";

  //       isItSwinged = false;
  //     }
  //   };

  //   setInterval(function () {
  //     swingingDV();
  //   }, 2000);
  // /////////////////////
  //   class Bullet {
  //     constructor(x, y, radius, color, velocity) {
  //       this.x = x;
  //       this.y = y;
  //       this.radius = radius;
  //       this.color = color;
  //       this.velocity = velocity;
  //     }
  //     drew() {
  //       ctx.beginPath();
  //       ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  //       ctx.fillStyle = this.color;
  //       ctx.fill();
  //     }
  //     update() {
  //       this.x = this.x + this.velocity;
  //       this.y = this.y + this.velocity;
  //     }
  //   }
  //   const bullet = new Bullet(currentShooterPosition.posX, currentShooterPosition.posY, 5, args.bulletColor, { x: 1, y: 1 });
  //   // const bullet = new Bullet(myCanvas.width / 2, myCanvas.height / 2, 5, "red", { x: 1, y: 1 });
  //   bullet.drew();

  //   function animate() {
  //     requestAnimationFrame(animate);
  //     bullet.drew();
  //     bullet.update();
  //   }
  //   // animate();
}
