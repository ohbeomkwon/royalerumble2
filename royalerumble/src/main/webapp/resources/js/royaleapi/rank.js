$.fn.makePlayerRankList = function() {
	$("#rank").html(rankTempl.playerRank);
	api.getPlayerRank(function(data) {
		$(".playerRank").append(rankTempl.playerRankListTitle);
		$(".playerRank").append(rankTempl.playerRankList(data));
	});
}

$.fn.makeClanRankList = function() {
	$("#rank").html(rankTempl.clanRank);
	api.getClanRank(function(data){
		
		$(".clanRank").append(rankTempl.clanRankList(data));
	});
}