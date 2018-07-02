var Ship = cc.Sprite.extend({
    speed: 220,
    isAlive: true,
    //player:null,
    ctor: function(){
        this._super("#player_1/player_b_m.png");
        this.init();
    },
    init: function(){
        var appearPosition = cc.p(cc.winSize.width/2, -200);
        this.attr({
            x : appearPosition.x,
            y : appearPosition.y
        });

        var MoveToStart = cc.MoveTo(1, cc.p(this.x, 50));
        this.runAction(MoveToStart);
        //this.addChild(bullet, 30);
        this.schedule(this.shoot, 1/6);
        // this.runAction(MW.move_left);
        this.scheduleUpdate();

    },
    update: function(dt){
        // this._runAnimation();
        MW.SHIP_POS.x = this.x;
        MW.SHIP_POS.y = this.y;
        this.updateMove(dt);

    },
    destroy: function(){
        // this.runAction(MW.player_explosion_animation);
        this.isAlive = false;
        this.visible = false;
    },
    updateMove:function(dt) {
        var self = this;
        // cc.log(MW.CurrentState+ " " + MW.PreviousState);
        switch (MW.DIRECTION.x) {
            case 1:
                if (this.x <= cc.winSize.width) this.x += dt * this.speed;
                break;
            case -1:
                if (this.x >= 0) this.x -= dt * this.speed;
                break;
            case 0:
                break;
        }

        switch (MW.DIRECTION.y) {
            case 1:
                if (this.y <= cc.winSize.height) this.y += dt * this.speed;
                break;
            case -1:
                if (this.y >= 0) this.y -= dt * this.speed;
                break;
            case 0:
                break;
        }
    },
    shoot: function(){

        var bullet = new Bullet.getOrCreateBullet();
        this.addChild(bullet);
        bullet.x = this.width/2;
        bullet.y = 70;

    }
});


