function Shooter(params) {
  let myCanvas = document.createElement("canvas");
  myCanvas.width = 400;
  myCanvas.height = 300;
  params.parent.appendChild(myCanvas);
  let ctx = myCanvas.getContext("2d");

  let isShooterExist = false;
  let isMousePress = false;
  let isAnimate = false;
  let currentShooterPosition = { shootX: null, shootY: null };

  //   myCanvas.addEventListener("click", (evt) => {
  //     drewShooter(myCanvas, evt);
  //   });

  myCanvas.addEventListener("mousedown", (evt) => {
    isAnimate = true;
    isMousePress = true;
    drewShooter(evt);
  });

  myCanvas.addEventListener("mousemove", (evt) => {
    let pos = getMousePos(myCanvas, evt);
    if (isShooterExist && isMousePress) {
      shootBullets(pos.x, pos.y);
    }
  });

  myCanvas.addEventListener("mouseup", (evt) => {
    isMousePress = false;
    isAnimate = false;
    // cancelAnimationFrame(animateId);
  });
  myCanvas.addEventListener("mouseout", () => (isMousePress = false));

  function drewShooter(evt) {
    let pos = getMousePos(myCanvas, evt);
    let isDotInside = calculationVolume(pos.x, pos.y, currentShooterPosition.shootX, currentShooterPosition.shootY, 10);
    if (!isShooterExist) {
      isShooterExist = true;
      currentShooterPosition = { shootX: pos.x, shootY: pos.y };
      drew(pos.x, pos.y, 10, params.color);
    } else if (isShooterExist && isDotInside) {
      ctx.clearRect(currentShooterPosition.shootX - 10, currentShooterPosition.shootY - 10, currentShooterPosition.shootX + 10, currentShooterPosition.shootY + 10);
      isShooterExist = false;
      currentShooterPosition = { shootX: null, shootY: null };
    }
  }
  class Bullet {
    constructor(position, radius, color, velocity) {
      this.bullX = position.x;
      this.bullY = position.y;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity;
    }
    drew() {
      ctx.beginPath();
      ctx.arc(this.bullX, this.bullY, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    update() {
      this.drew();
      this.bullX = this.bullX + this.velocity.x;
      this.bullY = this.bullY + this.velocity.y;
    }
  }
  let bulletsArr = [];
  let animateId;
  function animate() {
    // if (isAnimate) {
    // animateId = requestAnimationFrame(animate);
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    drew(currentShooterPosition.shootX, currentShooterPosition.shootY, 10, params.color);
    bulletsArr.forEach((bullet, i) => {
      bullet.update();
      //   if (bullet.x > myCanvas.width || bullet.y > myCanvas.height) bulletsArr.splice(i, 1);
      //   if (bullet.x > myCanvas.width || bullet.y > myCanvas.height) {
      //   setTimeout(() => {
      //     bulletsArr.splice(i, 1);
      //   }, 0);
      //   }
      //   console.log("aaaaa: bulletsArr,", bulletsArr);
    });
    // }
  }

  const shootBullets = (dotX, totY) => {
    const angle = Math.atan2(totY - currentShooterPosition.shootY, dotX - currentShooterPosition.shootX);
    const velocity = { x: Math.cos(angle) * 2, y: Math.sin(angle) * 2 };
    const position = { x: currentShooterPosition.shootX, y: currentShooterPosition.shootY };
    bulletsArr.push(new Bullet(position, 5, params.bulletColor, velocity));
    reduceBullets(position, velocity);
    // console.log("bulletsArr: ", bulletsArr);

    animate();
  };

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

  const reduceBullets = (position, velocity) => {
    setInterval(function () {
      if (bulletsArr.length > 0) {
        bulletsArr.shift();
      }
      //   else bulletsArr.push(new Bullet(position, 5, params.bulletColor, velocity));
    }, 1000);
    // setTimeout(() => {
    //   if (bulletsArr.length > 0) {
    //     bulletsArr.shift();
    //   } else if (position.x > myCanvas.width || position.y > myCanvas.height) bulletsArr.splice(i, 1);
    //   //   else bulletsArr.push(new Bullet(position, 5, params.bulletColor, velocity));
    // }, 1000);
  };

  const calculationVolume = (newX, newY, shooterX, shooterY, radius) => {
    let dist_points = (newX - shooterX) * (newX - shooterX) + (newY - shooterY) * (newY - shooterY);
    radius *= radius;
    if (dist_points < radius) {
      return true;
    }
    return false;
  };

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
}
