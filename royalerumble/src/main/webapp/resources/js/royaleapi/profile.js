// 프로토타입 메서드를 통해서 player 와 clan 프로필을 로드한다.
$.fn.makeSearchWindow = function() {
	var templ = search.searchWindow;
	console.log(templ);
	$(".root.container").html(templ);

};

$.fn.makePlayerProfile = function(playerTag) {
	$(".root.container").html(profileTempl.player);
//	var self = this;
	api.getPlayer(playerTag, function(data){
		// success callback 함수를 만들어준다.
		$(".playerProfile").append(profileTempl.playerProfile(data));
		$(".playerGames").append(profileTempl.playerGames(data));
		$(".playerCurrentDeck").append(profileTempl.playerCurrentDeck(data));
		console.log(data);
	});
	
	api.getChests(playerTag, function(data){
		$(".playerChests").append(profileTempl.playerChests(data));
	});
}

$.fn.makeClanProfile = function(clanTag) {
	$(".root.container").html(profileTempl.clan);
//	var self = this;
	api.getClan(clanTag, function(data) {
		$(".clanProfile").append(profileTempl.clanProfile(data));
		$(".clanDescription").append(profileTempl.clanDescription(data));
		$(".clanMembers").append(profileTempl.clanMemberTitle);
		$(".clanMembers").append(profileTempl.clanMember(data));
		console.log(data);
	});
}

$.fn.makePopularDecks = function() {
    $("#popularDecks").append('<img src="resources/img/material-spinner2.gif" style="width: 300px; margin:auto"/>');
	api.getPopularDecks(function(data) {
        $("#popularDecks").empty();
		$("#popularDecks").append(decksTempl.popularDecks(data));
	});
}