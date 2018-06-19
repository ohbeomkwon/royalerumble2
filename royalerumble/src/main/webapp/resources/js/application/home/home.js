$.fn.royaleHome = function(){
    $('._search_app').remove();
    $('._app').empty();
    $(`${opt.prevElement}`).after('<div class="_search_app"></div>')
    $('._search_app').append(homeTempl.top(opt));
    $('._app').append(homeTempl.bottom(opt));
    $('html,body,._search_app,.view').css({
        'height' : '100%'
    });

    opt.api.getPopularDecks(function(data){
        $('#popularDecks').html(homeTempl.popularDeckFactory(data));
    });
    opt.api.getPlayerRankTop5(function(data){
        $('#top5Player').html(homeTempl.playerRank(data));
    });
    opt.api.getClanRankTop5(function(data){
        $('#top5Clan').html(homeTempl.clanRank(data));
    });
};