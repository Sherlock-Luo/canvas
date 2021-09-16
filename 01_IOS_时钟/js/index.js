(function () {
  const ctx = document.getElementById("clock").getContext("2d");
  const [cWidth, cHeight] = [ctx.canvas.width, ctx.canvas.height];
  const hours = [ 3,4, 5, 6, 7, 8, 9, 10, 11, 12,1, 2,];
  let timer=null
  class Clock {
    constructor() {
      this.r = cWidth / 2;
    }

    init() {
      timer=setInterval(this.draw.bind(this),1000);

    }

    draw() {
     
      const {hours,minutes,second}=getTime()
      ctx.clearRect(0,0,cWidth,cHeight)
      ctx.save()
      ctx.beginPath();
      ctx.translate(this.r, this.r);
      this.drawPanle();//背景
      this.drawHours();//小时
      this.drawHourLine(hours,minutes)//时针
      this.drawMinuteLine(minutes)//分针
      this.drawSecondLine(second)//秒针
      this.drawCenterRound()//中心圆心
      ctx.restore()
    }
    /** 背景 */
    drawPanle() {
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.arc(0, 0, this.r - 20, 0, 2 * Math.PI, false);
      ctx.fill();
    }
    /** 小时 */
    drawHours() {
      let [radius, x, y] = [0, 0, 0];
      /**字体水平居中 */
      ctx.font = "40px sans-serif";
      ctx.fillStyle = "#000";
      ctx.textAlign='center';
      ctx.textBaseline='middle'
      hours.forEach((item, index) => {
        radius = ((2 * Math.PI) / 12) * index; //每一个小时的半径角度
        x = (this.r - 60) * Math.cos(radius);
        y = (this.r - 60) * Math.sin(radius);
        ctx.beginPath();
        ctx.fillText(item, x, y);
      });
    }
    /** 中心圆心 */
    drawCenterRound(){
      ctx.beginPath()
      ctx.fillStyle='#333'
      ctx.arc(0,0,13,0,2*Math.PI,false)
      ctx.fill()
      ctx.beginPath()
      ctx.fillStyle='#666'
      ctx.arc(0,0,6,0,2*Math.PI,false)
      ctx.fill()
    }
   /** 时针 */
   drawHourLine(hours,minutes){
     const radius=2*Math.PI/12*hours
     const mHours=2*Math.PI/12/60*minutes
     ctx.save()
     ctx.beginPath()
     ctx.lineWidth=5
     ctx.lineCap='round'
     ctx.rotate(radius+mHours)
     ctx.moveTo(0,0)//起点
     ctx.lineTo(0,-this.r/2)//终点
     ctx.stroke()
     ctx.restore()
   }
   /** 分钟 */
   drawMinuteLine(minutes){
    const radius=2*Math.PI/60*minutes
    ctx.save()
    ctx.beginPath()
    ctx.lineWidth=5
    ctx.lineCap='round'
    ctx.rotate(radius)
    ctx.moveTo(0,0)//起点
    ctx.lineTo(0,-this.r/1.6)//终点
    ctx.stroke()
    ctx.restore()
   }
   /**秒钟 */
   drawSecondLine(second){
    const radius=2*Math.PI/60*second
    ctx.save()
    ctx.beginPath()
    ctx.lineWidth=5
    ctx.strokeStyle='orange'
    ctx.lineCap='round'
    ctx.rotate(radius)
    ctx.moveTo(0,0)//起点
    ctx.lineTo(0,-this.r/1.3)//终点
    ctx.stroke()
    ctx.restore()
   }
  }
  /** 当前时间 */
  function getTime(){
    const date=new Date()
    return {
       hours:date.getHours(),
       minutes:date.getMinutes(),
       second:date.getSeconds()
    }
  }
  window.Clock = Clock;
})();
