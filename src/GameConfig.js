var MW = MW || {};
MW.Player = null;
MW.KEYS = [];

MW.DIRECTION = {x: 0, y:0};
MW.SHIP_POS = {x:0, y:0};

MW.move_right=null;
MW.move_left=null;
MW.move_mid_from_r=null;
MW.move_mid_from_l=null;

MW.smove_left = null;
MW.smove_right = null;
MW.smove_mid_from_r = null;
MW.smove_mid_from_l = null;


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