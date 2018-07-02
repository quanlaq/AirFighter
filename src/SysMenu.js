var g_sharedGameLayer;

var SysMenu = cc.Layer.extend({
    _ship:null,
    _shadow:null,
    bgSpeed:20,
    ctor: function(){
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.player_plist);
        cc.spriteFrameCache.addSpriteFrames(res.fx_plist);
        cc.spriteFrameCache.addSpriteFrames(res.shadows_plist);
        cc.spriteFrameCache.addSpriteFrames(res.enemy_plist);
        cc.spriteFrameCache.addSpriteFrames(res.explosion_plist);
        cc.audioEngine.preloadMusic(res.backgroundmusic_mp3);
        cc.audioEngine.playMusic(res.backgroundmusic_mp3, true);
        // cc.audioEngine.preloadEffect(res.bulletsound_mp3);
        this.init();
    },
    init:function(){
        this.initBackground();
        this.initAnimation();
        this.schedule(this.getMine, 1);
        this.scheduleUpdate();
        this._ship = new Ship();
        this._shadow = new Shadow();
        g_sharedGameLayer = this;
        this.addChild(this._ship);
        this.addChild(this._shadow, 20);
        this.addKeyboardListener();
    },
    update: function(dt){

        var rect1 = this._ship.getBoundingBox();
        for(var j=0; j<MW.CONTAINER.MINES.length; j++){

            var mine = MW.CONTAINER.MINES[j];

            var rect2 = mine.getBoundingBox();
            if( this._ship.isAlive === true && mine.isActive === true) {
                if(cc.rectIntersectsRect(rect1, rect2)) {
                    this.runExplosionAnimation();
                    this._ship.destroy();
                    this._shadow.destroy();
                    mine.destroy();
                    this.Gameover();
                }
            }
        }

        this.updateBackgroundPosition(dt);

    },

    updateBackgroundPosition: function(dt){

        this.bg.y += dt*this.bgSpeed;
        this.bg_2.y += dt*this.bgSpeed;

        if(this.bg.y >= cc.winSize.height + this.bg.height/2) this.bg.y = this.bg_2.y - this.bg.height + 20;
        if(this.bg_2.y >= cc.winSize.height + this.bg.height/2) this.bg_2.y = this.bg.y - this.bg.height + 20;

    },
    initAnimation: function(){


        // this.screenRect = cc.rect(0, 0, winSize.width, winSize.height + 10);
        var l1 = cc.spriteFrameCache.getSpriteFrame("player_1/player_b_l1.png");
        var l2 = cc.spriteFrameCache.getSpriteFrame("player_1/player_b_l2.png");
        var mid = cc.spriteFrameCache.getSpriteFrame("player_1/player_b_m.png");
        var r1 = cc.spriteFrameCache.getSpriteFrame("player_1/player_b_r1.png");
        var r2 = cc.spriteFrameCache.getSpriteFrame("player_1/player_b_r2.png");

        MW.move_left = new cc.Animation([mid, l2, l1], 0.1);
        MW.move_right = new cc.Animation([mid, r1, r2], 0.1);
        MW.move_mid_from_r = new cc.Animation([l1, l2, mid], 0.1);
        MW.move_mid_from_l = new cc.Animation([r2, r1, mid], 0.1);
        MW.move_left.retain();
        MW.move_right.retain();
        MW.move_mid_from_l.retain();
        MW.move_mid_from_r.retain();

        l1 = cc.spriteFrameCache.getSpriteFrame("player_shadow/player_shadow_l1.png");
        l2 = cc.spriteFrameCache.getSpriteFrame("player_shadow/player_shadow_l2.png");
        mid = cc.spriteFrameCache.getSpriteFrame("player_shadow/player_shadow_m.png");
        r1 = cc.spriteFrameCache.getSpriteFrame("player_shadow/player_shadow_r1.png");
        r2 = cc.spriteFrameCache.getSpriteFrame("player_shadow/player_shadow_r2.png");


        MW.smove_left = new cc.Animation([mid, l2, l1], 0.1);
        MW.smove_right = new cc.Animation([mid, r1, r2], 0.1);
        MW.smove_mid_from_r = new cc.Animation([l1, l2, mid], 0.1);
        MW.smove_mid_from_l = new cc.Animation([r2, r1, mid], 0.1);
        MW.smove_left.retain();
        MW.smove_right.retain();
        MW.smove_mid_from_l.retain();
        MW.smove_mid_from_r.retain();

        var player_explosion_animation_frames = [];
        for(var i = 1; i<=9; i++ ) {
            var str = "explosion_3/explosion_3_0" + i.toString() + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            player_explosion_animation_frames.push(frame);
        }


        MW.player_explosion_animation = new cc.Animation(player_explosion_animation_frames, 0.05);
        MW.player_explosion_animation.retain();

    },
    initBackground:function(){
        var winSize = cc.director.getWinSize();
        this.bg = new cc.Sprite(res.background);
        this.bg_2 = new cc.Sprite(res.background);
        // cc.log(bg.size);
        this.bg.x = winSize.width/2;
        this.bg.y = winSize.height/2;

        this.bg_2.x = winSize.width/2;
        this.bg_2.y = this.bg.y - this.bg.height + 20;
        // var scale = new cc.ScaleTo(0, winSize.width/bg.width, winSize.height/bg.height);
        // bg.action(scale);

        this.bg.setScale(winSize.width/this.bg.width, winSize.height/this.bg.height);
        this.bg_2.setScale(winSize.width/this.bg.width, winSize.height/this.bg.height);
        this.addChild(this.bg, 0, 0);
        this.addChild(this.bg_2, 0, 0);

    },
    addKeyboardListener:function() {
        var self = this;
        if(cc.sys.capabilities.hasOwnProperty('keyboard')){
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event) {
                    if(key === cc.KEY.w || key === cc.KEY.up) {
                        MW.KEYS[key]= true;
                        MW.KEYS[cc.KEY.s]= false;
                        MW.KEYS[cc.KEY.down]= false;
                        MW.DIRECTION.y = 1;
                    }
                    if(key === cc.KEY.s || key === cc.KEY.down) {
                        MW.KEYS[key] = true;
                        MW.KEYS[cc.KEY.up]= false;
                        MW.KEYS[cc.KEY.w]= false;
                        MW.DIRECTION.y = -1;
                    }
                    if(key === cc.KEY.a || key === cc.KEY.left) {
                        MW.KEYS[key] = true;
                        MW.KEYS[cc.KEY.d]= false;
                        MW.KEYS[cc.KEY.right]= false;
                        MW.DIRECTION.x = -1;
                        self._ship.runAction(cc.animate(MW.move_left));
                        self._shadow.runAction(cc.animate(MW.smove_left));
                    }
                    if(key === cc.KEY.d || key === cc.KEY.right) {
                        MW.KEYS[key] = true;
                        MW.KEYS[cc.KEY.left]= false;
                        MW.KEYS[cc.KEY.a]= false;
                        MW.DIRECTION.x = +1;
                        self._ship.runAction(cc.animate(MW.move_right));
                        self._shadow.runAction(cc.animate(MW.smove_right));
                    }

                },
                onKeyReleased: function(key, event) {
                    if((key === cc.KEY.w || key === cc.KEY.up) && MW.KEYS[key]) {
                        MW.KEYS[key] = false;
                        MW.DIRECTION.y = 0;
                    }
                    if((key === cc.KEY.s || key === cc.KEY.down) && MW.KEYS[key] ) {
                        MW.KEYS[key] = false;
                        MW.DIRECTION.y = 0;
                    }
                    if((key === cc.KEY.a || key === cc.KEY.left) && MW.KEYS[key]) {
                        MW.KEYS[key] = false;
                        MW.DIRECTION.x = 0;
                        self._ship.runAction(cc.animate(MW.move_mid_from_l));
                        self._shadow.runAction(cc.animate(MW.smove_mid_from_l));
                    }
                    if((key === cc.KEY.d || key === cc.KEY.right) && MW.KEYS[key])  {
                        MW.KEYS[key] = false;
                        MW.DIRECTION.x = 0;
                        self._ship.runAction(cc.animate(MW.move_mid_from_r));
                        self._shadow.runAction(cc.animate(MW.smove_mid_from_r));
                    }
                }
            }, this);
        }
    },
    getMine: function(){

        if(MW.isGameOver === false) {
            var x = Math.floor(Math.random()*2);

            if( x===1 ) {
                var mine = Mine.getOrCreateMine();
                mine.x = Math.floor(Math.random()*cc.winSize.width);
                mine.y = cc.winSize.height+100;
                if(mine.getParent() === null) this.addChild(mine);
            }
        }
    },
    runExplosionAnimation: function () {
        var explosion = new cc.Sprite("#explosion_3/explosion_3_01.png");
        this.addChild(explosion);
        explosion.x = this._ship.x;
        explosion.y = this._ship.y;
        var fadeOut = cc.FadeOut.create(0.1);
        explosion.runAction(cc.Sequence(cc.animate(MW.player_explosion_animation), fadeOut));
    },
    Gameover: function(){
        MW.isGameOver = true;
        var gameOver = new cc.LabelTTF("Game Over!", "Arial", 38);
        this.addChild(gameOver);
        gameOver.x = cc.winSize.width/2;
        gameOver.y = cc.winSize.height/2;
        gameOver.setOpacity(0);
        var fadeIn = cc.FadeIn.create(0.3);
        gameOver.runAction(fadeIn);
    }
});


SysMenu.scene = function() {
    var scene = new cc.Scene();
    var layer = new SysMenu();
    scene.addChild(layer);
    return scene;
};