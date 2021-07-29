function Shooter(args) {
  let canvas = document.createElement("canvas");
  canvas.height = 300;
  canvas.width = 400;
  args.parent.appendChild(canvas);
  let ctx = canvas.getContext("2d");
  let mousePosition = { x: null, y: null };
  let shooter = null;
  let bullets = [];
  let isTimeToShoot = false;

  canvas.addEventListener("mousedown", (evt) => mouseDownEvt(evt));
  canvas.addEventListener("mousemove", (evt) => (mousePosition = getMousePos(evt)));
  canvas.addEventListener("mouseup", () => (isTimeToShoot = false));
  canvas.addEventListener("mouseout", () => (isTimeToShoot = false));

  class CurrentShooter {
    constructor(color, position) {
      this.radius = 10;
      this.x = position.x;
      this.y = position.y;

      this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      };

      this.calcIfDotInsideShooter = (mousePosition) => {
        let dist_points = (mousePosition.x - this.x) * (mousePosition.x - this.x) + (mousePosition.y - this.y) * (mousePosition.y - this.y);
        let shooterRadius = 10;
        shooterRadius *= shooterRadius;
        return dist_points < shooterRadius ? true : false;
      };
    }
  }

  class Bullet {
    constructor() {
      this.radius = 5;
      this.speed = 10;
      this.bulletX = shooter.x;
      this.bulletY = shooter.y;

      const getAngle = () => {
        return (Math.atan2(mousePosition.y - this.bulletY, mousePosition.x - this.bulletX) * 180) / Math.PI;
      };

      let angle = getAngle();

      this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.bulletX, this.bulletY, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = args.bulletColor;
        ctx.fill();
      };

      this.updatePosition = () => {
        let angleRad = angle * (Math.PI / 180);
        this.bulletX = this.bulletX + this.speed * Math.cos(angleRad);
        this.bulletY = this.bulletY + this.speed * Math.sin(angleRad);
      };

      this.isBulletOutside = () => {
        return this.bulletX + this.radius < 0 || this.bulletY + this.radius < 0 || this.bulletX - this.radius > canvas.width || this.bulletY - this.radius > canvas.height;
      };
    }
  }

  const mouseDownEvt = (evt) => {
    let mousePosition = getMousePos(evt);
    shooter ? (shooter.calcIfDotInsideShooter(mousePosition) ? (shooter = null) : (isTimeToShoot = true)) : (shooter = new CurrentShooter(args.color, mousePosition));
  };

  const getMousePos = (evt) => {
    let rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  };

  const createBullet = () => {
    for (let i = 0; i < bullets.length; i++) {
      if (bullets.length > 300) {
        bullets.shift();
      }
      bullets[i].draw();
      bullets[i].updatePosition();
      if (bullets[i].isBulletOutside()) bullets.splice(i, 1);
    }
  };

  setInterval(() => {
    isTimeToShoot ? bullets.push(new Bullet()) : null;
  }, 40);

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createBullet();
    shooter ? shooter.draw() : null;
  }, 15);
}
