var MW = MW || {};
MW.Player = null;
MW.KEYS = [];

MW.DIRECTION = {x: 0, y:0};

MW.move_right=null;
MW.move_left=null;
MW.idle_right=null;
MW.idle_left=null;
MW.idle_mid=null;
MW.move_mid_from_r=null;
MW.move_mid_from_l=null;


MW.CONTAINER = {
    ENEMIES:[],
    ENEMY_BULLETS:[],
    PLAYER_BULLETS:[],
    EXPLOSIONS:[],
    SPARKS:[],
    HITS:[],
    BACKSKYS:[],
    BACKTILEMAPS:[]
};