$.fn.royalePlayerRank = function() {
    $('._search_app').remove();
	$("._app").html(rankTempl.rank);

	$('#playerRankPage').on('click', function(e){
		$('#clanRankPage').removeClass('active');
		$(this).addClass('active');

        var current_ajax_num = opt.ajax_last_num;
		opt.api.getPlayerRank(function(data) {
            if(current_ajax_num === opt.ajax_last_num - 1) {
				$("#rankTable").html(rankTempl.playerRank(data)).hide().fadeIn(700);
            }
		}, errorPage);
	});

	$('#clanRankPage').on('click', function(e){
		$('#playerRankPage').removeClass('active');
		$(this).addClass('active');

        var current_ajax_num = opt.ajax_last_num;
		opt.api.getClanRank(function(data){
            if(current_ajax_num === opt.ajax_last_num - 1) {
                $("#rankTable").html(rankTempl.clanRank(data)).hide().fadeIn(700);
            }
		}, errorPage)
	});

    var current_ajax_num = opt.ajax_last_num;
	opt.api.getPlayerRank(function(data) {
        if(current_ajax_num === opt.ajax_last_num - 1) {
			$("#rankTable").html(rankTempl.playerRank(data)).hide().fadeIn(700);
        }
	}, errorPage);
};
