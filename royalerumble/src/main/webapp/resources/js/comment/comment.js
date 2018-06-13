$.fn.makeComments = function(opt) {
    var self = $(this);
    var params = `?page=1&sort=${opt.sort}`;
    opt.api.list(params, response => {
        console.log(response);
        var list = response.list;
        opt.pagination = response.pagination;
        self.commentsPanel(opt, list);
    });
};

$.fn.commentsPanel = function (opt, list) {
    var $panel = {
        header : $(commentTmpl.header(opt.pagination.totalCount)),
        body : $(commentTmpl.body),
        footer : $(commentTmpl.footer()),
    };

    $(this).append($panel.header);
    $(this).append($panel.body);
    $(this).append($panel.footer);

    $panel.header.find('.comment-write').append(commentTmpl.write(opt.userName, 'comment'));
    $panel.body.find('.comments-area').commentList(list, 'make');

    if (opt.pagination.totalCount < opt.pagination.PER_PAGE+1) {
        $panel.footer.find('.action').hide();
    }

    $(this).on('click', '.action', function() {
        var actionType = $(this).data('action');
        switch (actionType) {
            case 'comments#next' :
                pagination(opt, $panel, 'make');
                break;

            case 'comments#end' :
                scrollTop();
                break;

            case 'comments#refresh' :
                refresh(opt, $panel, 'refresh');
                break;

            case 'comment#add' :
                $panel.header.commentAdd(opt, $panel);
                break;

            case 'reply#list#off' :
                var $reply = $(this).closest('.comment').find('.replies');
                var commentRef = $(this).data('id');
                $(this).data('action', 'reply#list#on');
                $(this).makeReplies(opt, $reply, commentRef, 'replyMake');
                break;

            case 'reply#list#on' :
                var $reply = $(this).closest('.comment').find('.replies');
                var commentRef = $(this).data('id');
                $(this).data('action', 'reply#list#off');
                $(this).makeReplies(opt, $reply, commentRef, 'replyClean');
                break;

            case 'reply#add' :
                var $reply = $(this).closest('.comment').find('.replies');
                var commentRef = $(this).closest('.comment').find('.action').data('id');
                $reply.replyAdd(opt, $reply, commentRef);
                break;
        }
    });
};

function refresh(opt, $panel, mode) {
    var params = `?page=1&sort=${opt.sort}`;
    opt.api.list(params, response => {
        var list = response.list;
        opt.pagination = response.pagination;
        $panel.header.find('.total').text(opt.pagination.totalCount);
        $panel.body.find('.comments-area').commentList(list, mode);
        if (opt.pagination.totalCount >= opt.pagination.PER_PAGE+1) {
            $panel.footer.find('.action').show();
        }
        $panel.footer.children('.action').data('action', 'comments#next');
        $panel.footer.children('.action').html('더보기<i class="fas fa-arrow-down"></i>');
    });
}

function pagination(opt, $panel, mode) {
    var params = `?page=${++opt.pagination.page}&sort=${opt.sort}`;
    opt.api.list(params, response => {
        var list = response.list;
        opt.pagination = response.pagination;
        $panel.body.find('.comments-area').commentList(list, mode);
        if (opt.pagination.page >= opt.pagination.totalPage) {
            $panel.footer.children('.action').data('action', 'comments#end');
            $panel.footer.children('.action').html('처음으로<i class="fas fa-arrow-up"></i>');
        }
    });
}

function scrollTop() {
    var offset = $('.comments').offset();
    offset.top -= 70;
    $('html').animate({scrollTop: offset.top}, 700);
}

$.fn.commentList = function (list, mode) {
    var template = '';
    list.forEach(comment=> {
        template += commentTmpl.comment(comment);
    });
    switch (mode){
        case 'make' :
            $(this).append(template);
            break;

        case 'refresh' :
            $(this).html(template);
            break;

        case 'add' :
            $(this).html(template);
            $('.comments-area li').eq(0).hide().fadeIn(1000);
            break;
    }
};

$.fn.commentAdd = function (opt, panel) {
    var $content = $(this).find('.content');
    if ($content.val() == '') {
        alert('내용을 입력해주세요');
        return;
    }

    var data = {
        forumId: opt.forumId,
        userName: opt.userName,
        content: $content.val(),
        commentRef: 0,
        commentLevel: 0
    };
    opt.api.create(data, result => {
        $content.val('');
        refresh(opt, panel, 'add');
    });
};

$.fn.makeReplies = function (opt, $reply, commentRef, mode) {;
    switch (mode){
        case 'replyMake' :
            $reply.show();
            replies(opt, $reply, commentRef, 'make');
            $reply.children('.reply-write').append(commentTmpl.write(opt.writer, 'reply'));
            break;

        case 'replyClean' :
            $reply.hide();
            $reply.children('.replies-area').empty();
            $reply.children('.reply-write').empty();
            break;
    }
};

function replies(opt, $reply, commentRef, mode) {
    var params = `/reply?ref=405`; //${commentRef}
    opt.api.list(params, response => {
        $reply.replyList(response, mode);
    });
}

$.fn.replyList = function (list, mode) {
    var $repliesArea = $(this).children('.replies-area');
    var template = '';
    list.forEach(reply => {
        template += commentTmpl.reply(reply);
    });
    switch (mode){
        case 'make' :
            $repliesArea.append(template);
            break;

        case 'add' :
            $repliesArea.html(template);
            $repliesArea.children('li').eq(0).hide().fadeIn(1000);
            break;
    }
};

$.fn.replyAdd = function (opt, $reply, commentRef) {
    var $content = $(this).find('.content');
    if ($content.val() == '') {
        alert('내용을 입력해주세요');
        return;
    }

    var data = {
        forumId: opt.forumId,
        userName: opt.userName,
        content: $content.val(),
        commentRef: commentRef,
        commentLevel: 1
    };
    console.log(data);
    $content.val('');
    replies(opt, $reply, commentRef, 'add');
    // opt.api.create(data, result => {
    //     $content.val('');
    //     replies(opt, $reply, commentId, 'add');
    // });
};

