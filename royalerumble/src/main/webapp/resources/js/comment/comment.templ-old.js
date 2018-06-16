
var commentTmpl = {
    header: function (total) {
        var tmpl = `
			<div class="comments-header">
				<div class="d-flex justify-content-between border-bottom border-gray" style="padding:10px">
					<div class="p-1">
						<i class="fas fa-comment ml-1"></i>
						<span class="ml-1">전체 댓글</span>
						<strong class="ml-1 total"style="color:#f95534">${total}</strong>
					</div>
					<div class="p-1">
						<a class="like-sort ml-1 action" data-action="like#sort">좋아요순</a>
						<a class="hate-sort ml-1 action" data-action="hate#sort">싫어요순</a> 
						<a class="new-sort ml-1 action" data-action="new#sort">최신순</a>
						<a class="refresh ml-1 action" data-action="comments#refresh"><i class="fas fa-sync"></i></a>
					</div>
				</div>
				<div class="comment-write border-bottom border-gray" style="padding:10px"></div>		
			</div>`;
        return tmpl;
    },

    body: `
		<div class="comments-body">
			<ul class="comments-area list-group list-group-flush"></ul>
		</div>
	`,

    write: function (userName, mode) {
        var tmpl = ''
        if (userName === "") {
            tmpl = `
				<a href="/royalerumble/login">
					<textarea class="form-control" rows="5"
					placeholder="로그인이 필요한 서비스 입니다." disabled></textarea>
				</a>`;
        } else {
            tmpl = `
                <textarea class="form-control content" rows="5" 
                placeholder="300자 이내로 입력해주세요."></textarea>
                <div class="d-flex flex-row-reverse">
                    <button type="button" class="btn btn-primary btn-sm action" 
                    data-action="${mode}#add" style="font-size:12px">등록</button>
                </div>`;
        }
        return tmpl;
    },

    comment: function (comment) {
        var tmpl = `
			<li class="comment list-group-item">
				<div class="comment-area row">
					<div class="col-sm-1">
						<img class="float-left rounded" width="60" src="/butter/member/avata?userId=${comment.userName}">
					</div>
					<div class="col-sm-11">
                        <div class="comment-header row">
                            <div class="col-sm-4">
                                <span class="comment-writer font-weight-bold" style="font-size:14px">${comment.userName}</span>
                                <span class="comment-date" style="color:gray; margin-left:5px">
                                    ${parseTime(comment.regDate)}
                                </span>
                                    ${newBadge(comment.regDate)}
                            </div>
                            <div class="col-sm-8 text-right">
                                <span class="comment-report" style="color:gray; margin-right:5px">신고</span>
                            </div>
                        </div>
                        <div class="comment-body row">
                            <div class="col-sm-12">
                                <span class="comment-content">${comment.content}</span>
                            </div>
                        </div>
                        <div class="comment-footer row mt-2">
                            <div class="col-sm-6 text-left">
                                <button type="button" class="btn btn-primary btn-sm action" 
                                data-action="reply#list#off" data-id="${comment.id}"style="font-size:12px">${comment.commentCnt} 답글</button>
                            </div>
                            <div class="col-sm-6 text-right" style="position: relative; top:-15px">
                                <button type="button" class="btn btn-pink btn-sm action"  
                                data-action="like#add" style="font-size:13px; width: 90px">
                                    ${comment.likeCnt} <i class="fa fa-chevron-up"></i>
                                </button>
                                <button type="button" class="btn btn-indigo btn-sm action" 
                                data-action="hate#add" style="font-size:13px; width: 90px">
                                    ${comment.hateCnt} <i class="fa fa-chevron-down"></i>
                                </button>   
                            </div>
                        </div>
                    </div>
				</div>
				<div class="replies">
					<ul class="replies-area list-group list-group-flush""></ul>
					<div class="reply-write mx-auto mt-3" style="width: 95%;"></div>
				</div>
			</li>`;
        return tmpl;
    },

    reply: function (reply) {
        var tmpl = `
			<li class="reply list-group-item">
			    <div class="reply-area row">
                    <div class="col-sm-1">
                        <img class="float-left rounded" width="60" src="/royalerumble/profile/avatar/${reply.userName}">
                    </div>
                    <div class="col-sm-11">
                        <div class="reply-header row">
                            <div class="col-sm-4">
                                <span class="reply-writer font-weight-bold">${reply.userName}</span>
                                <span class="reply-date" style="color:gray; margin-left:5px">
                                    ${parseTime(reply.regDate)}
                                </span>
                                    ${newBadge(reply.regDate)}
                            </div>
                            <div class="col-sm-8 text-right">
                                <span class="reply-report" style="color:gray; margin-right:5px">신고</span>
                            </div>
                        </div>
                        <div class="reply-body row">
                            <div class="col-sm-12">
                                <span class="reply-content">${reply.content}</span>
                            </div>
                        </div>
                        <div class="reply-footer row">
                        </div>
                    </div>
				</div>
			</li>`;
        return tmpl;
    },

    footer: function () {
        var tmpl = `
			<div class="comments-footer">
				<button class="btn btn-primary btn-lg btn-block action" type="button" data-action="comments#next">
					더보기 <i class="fas fa-arrow-down"></i>
				</button>
			</div>
		`;
        return tmpl;
    }
};