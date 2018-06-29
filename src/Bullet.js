var Bullet = cc.Sprite.extend({
    bulletSpeed: 900,
    active: true,
   ctor: function(){

       this._super("#plasma/plasma_1.png");

        this.scheduleUpdate();
   },

   update: function(dt){
        var x = this.x, y = this.y;
        this.y = y + this.bulletSpeed * dt;
        this.active = false;
   }

});

Bullet.getOrCreateBullet = function(){
    var selChild = null;
    for(var j = 0; j<MW.CONTAINER.PLAYER_BULLETS.length; j++){
        selChild = MW.CONTAINER.PLAYER_BULLETS[j];
        if(selChild.active = false){
            selChild.active = true;
            return selChild;
        }
    }
    selChild = Bullet.create();
    return selChild;
    // selChild.retain();
};

Bullet.create = function() {
    var bullet = new Bullet();

    MW.CONTAINER.PLAYER_BULLETS.push(bullet);
    return bullet;
};