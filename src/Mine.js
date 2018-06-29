var Mine = cc.Sprite.extend({
    speed: 100,
    ctor: function(){
        this._super("#mine_1/mine_1_02.png");
        this.init();
    },

    init: function(){

        var aniFrames = [];

        for(var i=1; i<=9; i++){
            var str = "mine_1/mine_1_0" + i.toString() + ".png";
            var x = cc.spriteFrameCache.getSpriteFrame(str);
            aniFrames.push(x);
        }

        cc.log(aniFrames);

        var animation = new cc.Animation(aniFrames, 0.1);
        this.runAction(cc.animate(animation).repeatForever());

        this.scheduleUpdate();

    },

    update: function(dt){

        this.y = this.y - this.speed*dt;

        if(this.y < 0) this.y = cc.winSize.height;

    }

});