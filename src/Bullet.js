var Bullet = cc.Sprite.extend({
    bulletSpeed: 900,
   ctor: function(){

       this._super("#plasma/plasma_1.png");
        this.scheduleUpdate();
   },

   init: function(){


   },

   update: function(dt){

        var x = this.x, y = this.y;


        this.y = y + this.bulletSpeed * dt;

        if(this.y > cc.winSize.height + 100) this.y = 70;

   }
});