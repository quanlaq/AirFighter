var Mine = cc.Sprite.extend({
    speed: 150,
    isActive: true,
    ctor: function(){
        this._super("#mine_1/mine_1_02.png");
        this.isActive = true;
        this.init();
    },
    init: function(){

        var aniFrames = [];

        for(var i=1; i<=9; i++){
            var str = "mine_1/mine_1_0" + i.toString() + ".png";
            var x = cc.spriteFrameCache.getSpriteFrame(str);
            aniFrames.push(x);
        }

        // cc.log(aniFrames);

        var animation = new cc.Animation(aniFrames, 0.05);
        this.runAction(cc.animate(animation).repeatForever());

        this.scheduleUpdate();

    },
    update: function(dt){

        this.y = this.y - this.speed*dt;
        if(this.y < 0) this.isActive = false;

    },

    destroy: function(){

        this.isActive = false;
        this.visible = false;

    }

});

Mine.getOrCreateMine= function(){
    var selChild = null;
    for(var j = 0; j<MW.CONTAINER.MINES.length; j++){
        selChild = MW.CONTAINER.MINES[j];
        if(selChild.isActive === false){
            selChild.isActive = true;
            selChild.visible = true;
            return selChild;
        }
    }
    selChild = Mine.create();
    return selChild;

};

Mine.create = function(){
    var mine = new Mine();
    MW.CONTAINER.MINES.push(mine);
    return mine;

};