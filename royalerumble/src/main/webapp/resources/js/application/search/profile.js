$.fn.playerSearch = function() {
    $('._search_app').remove();
    var current_ajax_num = opt.ajax_last_num;

	opt.api.getPlayer(opt.keyword, function(player){
	    if(current_ajax_num === opt.ajax_last_num - 1) {
            opt.api.getChests(opt.keyword, function(chest){
                $('._app').html(profileTempl.player(player)).hide().fadeIn(700);
                $('#chests').html(profileTempl.playerChests(chest));
                opt.api.getBattleLog(opt.keyword, function(data){
                    $('#battleList').html(battleLogTempl.battleLog(data)).hide().fadeIn(700);
                }, errorPage)
            })
        }
	},errorPage)
};

$.fn.clanSearch = function() {
    $('._search_app').remove();
    var current_ajax_num = opt.ajax_last_num ;

    opt.api.getClan(opt.keyword, function(data) {
        if(current_ajax_num === opt.ajax_last_num - 1) {
            $('._app').html(profileTempl.clan(data)).hide().fadeIn(700);
        }
    },errorPage);
};
