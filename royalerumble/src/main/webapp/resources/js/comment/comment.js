$.fn.makeComments = function(opt) {
    var self = $(this);
    var params = `?page=1&sort=${opt.sort}`;
    opt.api.list(params, response => {
        console.log(response);
        var list = response.list;
        opt.total = response.total;
        opt.pagination = response.pagination;
        self.commentsPanel(opt, list);
    });
};

$.fn.commentsPanel = function (opt, list) {
    var $commentPanel = {
        header : $(commentTmpl.header(opt.total)),
        body : $(commentTmpl.body),
        footer : $(commentTmpl.footer()),
    };

    $(this).append($commentPanel.header);
    $(this).append($commentPanel.body);
    $(this).append($commentPanel.footer);

    $commentPanel.header.find('.comment-write').append(commentTmpl.write(opt.userName, 'comment'));
    $commentPanel.body.find('.comments-area').commentList(list, 'make');

    if (opt.pagination.totalCount < opt.pagination.PER_PAGE+1) {
        $commentPanel.footer.find('.action').hide();
    }

    $(this).on('click', '.action', function() {
        var actionType = $(this).data('action');
        switch (actionType) {
            case 'comments#next' :
                commentPagination(opt, $commentPanel, 'make');
                break;

            case 'comments#end' :
                scrollTop();
                break;

            case 'comments#refresh' :
                refresh(opt, $commentPanel, 'refresh');
                break;

            case 'comment#add' :
                $commentPanel.header.commentAdd(opt, $commentPanel);
                break;

            case 'reply#list#off' :
                $(this).makeReplies(opt, 'replyMake');
                break;

            case 'reply#list#on' :
                $(this).makeReplies(opt, 'replyClean');
                break;

            case 'reply#add' :
                $(this).replyAdd(opt);
                break;

        }
    });
};

function refresh(opt, $commentPanel, mode) {
    var params = `?page=1&sort=${opt.sort}`;
    opt.api.list(params, response => {
        var list = response.list;
        opt.total = response.total;
        opt.pagination = response.pagination;
        $('.total').text(opt.total);
        $commentPanel.body.find('.comments-area').commentList(list, mode);
        if (opt.pagination.totalCount >= opt.pagination.PER_PAGE+1) {
            $commentPanel.footer.find('.action').show();
        }
        $commentPanel.footer.children('.action').data('action', 'comments#next');
        $commentPanel.footer.children('.action').html('더보기 <i class="fas fa-arrow-down"></i>');
    });
}

function commentPagination(opt, $commentPanel, mode) {
    var params = `?page=${++opt.pagination.page}&sort=${opt.sort}`;
    opt.api.list(params, response => {
        var list = response.list;
        opt.pagination = response.pagination;
        $('.total').text(response.total);
        $commentPanel.body.find('.comments-area').commentList(list, mode);
        if (opt.pagination.page >= opt.pagination.totalPage) {
            $commentPanel.footer.children('.action').data('action', 'comments#end');
            $commentPanel.footer.children('.action').html('처음으로 <i class="fas fa-arrow-up"></i>');
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
        ref: 0,
        commentLevel: 0
    };
    opt.api.create(data, result => {
        $content.val('');
        refresh(opt, panel, 'add');
    });
};

$.fn.makeReplies = function (opt, mode) {
    var self = $(this);
    var $replies = {
        reply : self.closest('.comment').find('.replies'),
        button : self,
    };
    var ref = $(this).data('id');

    switch (mode){
        case 'replyMake' :
            $(this).data('action', 'reply#list#on');
            replies(opt, $replies, ref, 'make');
            break;

        case 'replyClean' :
            $(this).data('action', 'reply#list#off');
            $replies.reply.children('.replies-area').empty();
            $replies.reply.children('.reply-write').empty();
            break;
    }
};

function replies(opt, $replies, ref, mode) {
    var params = `?page=1&ref=${ref}`; //${commentRef}
    opt.api.list(params, response => {
        var list = response.list;
        opt.replyPagination = response.pagination;
        $('.total').text(response.total);
        $replies.reply.replyList(opt, list, mode);
        $replies.button.html(opt.replyPagination.totalCount + ' 답글');
        $replies.reply.children('.reply-write').append(commentTmpl.write(opt.userName, 'reply'));
    });
}

function replyPagination(opt, $replies, ref, mode) {
    var params = `?page=1&ref=${ref}`;
    opt.api.list(params, response => {
        var list = response.list;
        opt.replyPagination = response.pagination;
        $('.total').text(response.total);
        $replies.reply.replyList(opt, list, mode);
        $replies.button.html(opt.replyPagination.totalCount + ' 답글');
        $replies.reply.children('.reply-write').empty();
        $replies.reply.children('.reply-write').append(commentTmpl.write(opt.userName, 'reply'));
    });
}

$.fn.replyList = function (opt, list, mode) {
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
            $repliesArea.children('li').eq(opt.replyPagination.totalCount - 1).hide().fadeIn(1000);
            break;
    }
};

$.fn.replyAdd = function (opt) {
    var $replies = {
        reply : $(this).closest('.comment').find('.replies'),
        button : $(this).closest('.comment').find('.action').eq(0),
        content : $(this).closest('.comment').find('.content')
    };

    var ref = $replies.button.data('id');
    console.log(ref);
    if ($replies.content.val() == '') {
        alert('내용을 입력해주세요');
        return;
    }

    var data = {
        forumId: opt.forumId,
        userName: opt.userName,
        content: $replies.content.val(),
        commentRef: ref,
        commentLevel: 1
    };

    opt.api.create(data, result => {
        $replies.content.val();
        replyPagination(opt, $replies, ref, 'add');
    });
};

