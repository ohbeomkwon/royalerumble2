$.fn.royaleHome = function(){
    $('._search_app').remove();
    $(`${opt.prevElement}`).after('<div class="_search_app"></div>')
    $('._search_app').append(homeTempl.top(opt));
    $('._app').html(homeTempl.bottom(opt));
    $('html,body,._search_app,.view').css({
        'height' : '100%'
    });

    opt.api.getPopularDecks(function(data){
        $('#popularDecks').html(homeTempl.popularDeckFactory(data)).hide().fadeIn(700);
    });
    opt.api.getPlayerRankTop5(function(data){
        $('#top5Player').html(homeTempl.playerRank(data)).hide().fadeIn(700);
    });
    opt.api.getClanRankTop5(function(data){
        $('#top5Clan').html(homeTempl.clanRank(data)).hide().fadeIn(700);
    });
};