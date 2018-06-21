$.fn.playerSearch = function() {
    $('._search_app').remove();
    $('._app').html(`
	<div class="row">
		<img class="mx-auto" src="${opt.context}resources/image/etc/spin1.gif" style="width : 400px; margin: auto"/>
	</div>`);
	opt.api.getPlayer(opt.keyword, function(player){
		opt.api.getChests(opt.keyword, function(chest){
            $('._app').html(profileTempl.player(player)).hide().fadeIn(1000);
			$('#chests').html(profileTempl.playerChests(chest));
            opt.api.getBattleLog(opt.keyword, function(data){
                $('#battleList').html(battleLogTempl.battleLog(data));
            }, errorPage)
		})
	},errorPage)
};

$.fn.clanSearch = function() {
    $('._search_app').remove();
    $('._app').html(`
	<div class="row">
		<img class="mx-auto" src="${opt.context}resources/image/etc/spin1.gif" style="width : 400px; margin: auto"/>
	</div>`);
    opt.api.getClan(opt.keyword, function(data) {
        $('._app').html(profileTempl.clan(data)).hide().fadeIn(1000);;

    },errorPage);
};
