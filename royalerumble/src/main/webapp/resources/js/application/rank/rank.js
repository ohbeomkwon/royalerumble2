$.fn.royalePlayerRank = function(opt) {
    $('._search_app').remove();
	$("._app").html(rankTempl.rank);
	$("#rankTable").html(`
	<div class="row">
		<img src="${opt.context}resources/image/etc/spin2.gif" style="width : 270px; margin:auto"/>
	</div>`);

	$('#playerRankPage').on('click', function(e){
		$('#clanRankPage').removeClass('active');
		$(this).addClass('active');
		$("#rankTable").html(`
		<div class="row">
			<img src="${opt.context}resources/image/etc/spin2.gif" style="width : 270px; margin:auto"/>
		</div>`);
		opt.api.getPlayerRank(function(data) {
			$("#rankTable").html(rankTempl.playerRank(data)).hide().fadeIn(1000);
			
		}, errorPage);
	});

	$('#clanRankPage').on('click', function(e){
		$('#playerRankPage').removeClass('active');
		$(this).addClass('active');
		$("#rankTable").html(`
		<div class="row">
			<img src="${opt.context}resources/image/etc/spin2.gif" style="width : 270px; margin:auto"/>
		</div>`);
		opt.api.getClanRank(function(data){
			$("#rankTable").html(rankTempl.clanRank(data)).hide().fadeIn(1000);;
		}, errorPage)
	});

	opt.api.getPlayerRank(function(data) {
		$("#rankTable").html(rankTempl.playerRank(data)).hide().fadeIn(1000);;
		
	}, errorPage);
};
