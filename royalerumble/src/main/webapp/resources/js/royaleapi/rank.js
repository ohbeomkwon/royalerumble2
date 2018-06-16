$.fn.makePlayerRankList = function() {
	$(".root.container").html(rankTempl.playerRank);

    // rank 코드
    // nav에서 랭크를 눌렀을 경우

	api.getPlayerRank(function(data) {
		$(".playerRank").append(rankTempl.playerRankListTitle);
		$(".playerRank").append(rankTempl.playerRankList(data));
	});
};

$.fn.makeClanRankList = function() {
	$(".root.container").html(rankTempl.clanRank);
	api.getClanRank(function(data){
		$(".clanRank").append(rankTempl.clanRankListTitle);
		$(".clanRank").append(rankTempl.clanRankList(data));
	});
}