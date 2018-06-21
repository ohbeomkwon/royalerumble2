$.fn.royaleServiceInit = function(opt) {
    $('head').append(`<script src="${opt.context}resources/js/application/home/home.js"><\/script>`);
    $('head').append(`<script src="${opt.context}resources/js/application/home/home.templ.js"><\/script>`);
    $('head').append(`<script src="${opt.context}resources/js/application/search/profile.js"><\/script>`);
    $('head').append(`<script src="${opt.context}resources/js/application/search/profile.templ.js"><\/script>`);
    $('head').append(`<script src="${opt.context}resources/js/application/search/battle.templ.js"><\/script>`);
    $('head').append(`<script src="${opt.context}resources/js/application/rank/rank.js"><\/script>`);
    $('head').append(`<script src="${opt.context}resources/js/application/rank/rank.templ.js"><\/script>`);

    var self = this;
    self.on('click', '._item_action', function(event){
    var action = $(this).data('action');

        switch (action) {
            case 'player-search' :
                var keyword = $('#playerSearch').val().toUpperCase();
                if(keyword.charAt(0) === '#') {
                    keyword = keyword.slice(1);
                }
                opt.keyword = keyword;
                self.playerSearch(opt);
                break;
            case 'clan-search' :
                var keyword = $('#clanSearch').val().toUpperCase();
                if(keyword.charAt(0) === '#') {
                    keyword = keyword.slice(1);
                }
                opt.keyword = keyword;
                self.clanSearch(opt);
                break;
            case 'player-click' :
                opt.keyword = $(this).data('tag');
                self.playerSearch(opt);
                break;
            case 'clan-click' :
                opt.keyword = $(this).data('tag');
                self.clanSearch(opt);
                break;
        }
    });
};



