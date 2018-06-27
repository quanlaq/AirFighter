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
   }

});

Bullet.getOrCreateBullet = function(){

    var selChild = null;
    for(var j = 0; j<MW.CONTAINER.PLAYER_BULLETS.length; j++){
        selChild = MW.CONTAINER.PLAYER_BULLETS[j];
    }
    selChild = new Bullet();
    return selChild;
    // selChild.retain();
};