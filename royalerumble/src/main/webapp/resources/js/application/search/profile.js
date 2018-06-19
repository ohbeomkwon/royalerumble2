$.fn.playerSearch = function() {
    $('._search_app').remove();
    $('._app').empty();
    $('._app').append(`<div class="row"><img class="mx-auto" src="${opt.context}resources/image/etc/spin1.gif" style="width : 400px; margin: auto"/></div>`);
	opt.api.getPlayer(opt.keyword, function(player){
		opt.api.getChests(opt.keyword, function(chest){
            $('._app').html(profileTempl.player(player));
			$('#chests').html(profileTempl.playerChests(chest));
		})
	})
};

$.fn.clanSearch = function() {
    $('._search_app').remove();
    $('._app').empty();
    $('._app').append(`<div class="row"><img class="mx-auto" src="${opt.context}resources/image/etc/spin1.gif" style="width : 400px; margin: auto"/></div>`);
    opt.api.getClan(opt.keyword, function(data) {
        $('._app').html(profileTempl.clan(data));

    });
}


$.fn.makePlayerProfile = function(playerTag) {
	$("#clash").html(profileTempl.player);
//	var self = this;
	api.getPlayer(playerTag, function(data){
		// success callback 함수를 만들어준다.
		$(".playerProfile").append(profileTempl.playerProfile(data));
		$(".playerGames").append(profileTempl.playerGames(data));
		$(".playerCurrentDeck").append(profileTempl.playerCurrentDeck(data));
		
	});
	
	api.getChests(playerTag, function(data){
		$(".playerChests").append(profileTempl.playerChests(data));
	});
}

$.fn.makeClanProfile = function(clanTag) {
	$("#clash").html(profileTempl.clan);
//	var self = this;
	api.getClan(clanTag, function(data) {
		$(".clanProfile").append(profileTempl.clanProfile(data));
		$(".clanDescription").append(profileTempl.clanDescription(data));
		$(".clanMembers").append(profileTempl.clanMemberTitle);
		$(".clanmembers").append(profileTempl.clanMember(data));
		
	});
}

$.fn.makePopularDecks = function() {
	api.getPopularDecks(function(data) {
		$("#popularDecks").append(decksTempl.popularDecks(data));
	});
}