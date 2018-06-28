var Shadow = cc.Sprite.extend({

   ctor: function(){
       this._super("#player_shadow/player_shadow_m.png");
       this.init();
   },

    init: function(){
        this.scheduleUpdate();
    },
    update: function(dt) {
       this.x = MW.SHIP_POS.x - 30;
       this.y = MW.SHIP_POS.y - 50;
    }

});