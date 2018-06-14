<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<style>
    .card.forum-view {
        width: 1000px;
        height: 100%;
        min-height: 600px;
        margin: 2em auto;
    }

    .card-header.forum-view{
        background: #448aff;
        color: #fff;
    }

    .forum-content {
        min-height: 300px;
    }

    .comments {
        /*background: #e3f2fd;*/
        font-size: 14px;
        height: auto;
        width: 90%;
        margin: auto;
    }

    .comments-header {
        margin-left: 10px;
        margin-bottom: 10px;
        margin-right: 10px;
        padding: 10px;
        font-size: 15px;
    }

    .comments-footer {
        padding: 20px;
    }

    .reply.list-group-item {
        background-color: #eeeeee;
    }

</style>
<script src="${root}resources/js/comment/comment.templ.js"></script>
<script src="${root}resources/js/comment/comment.js"></script>
<script src="${root}resources/js/rest.api.js"></script>
<script>
    <c:url value="/api/comment/${forum.id}" var="url"/>
    $(function () {
        //기본 옵션
        var api = new RestApi('${url}');
        var opt = {
            api : api,
            userName: '${USER.userName}',
            forumId:${forum.id},
            sort:'default',
            url:${root}
        };
        $('.comments').makeComments(opt);

        var created = $('.parse-time').text();
        $('.parse-time').text(parseTime(new Date(created)));

        $('#deleteConfirm').click(e =>{
            if(confirm("삭제하시겠습니까?") == false){
                e.preventDefault(); //???
                return; //???
            }
        });
    });
</script>
<div class="card forum-view">
    <div class="card-header forum-view">
        <h4><c:if test="${forum.modified == 1}">[포럼수정]</c:if> ${forum.subject}</h4>
        <span>${forum.userName}</span>
        <span class="parse-time"><fmt:formatDate value="${forum.regDate}" pattern="yyyy-MM-dd hh:mm:ss"/></span>
        <div class="row">
            <div class="col-sm text-right">
            </div>
        </div>
    </div>
    <div class="card-body forum-view">
        <div class="forum-content">
            ${forum.content}
        </div>
        <div class="comments z-depth-2">
        </div>
    </div>
    <div class="card-footer forum-view">
        <div class="row">
            <div class="col-sm-12 text-right">
                <c:if test="${USER.userName == forum.userName}">
                    <a href="${root}forums/edit/${forum.id}" class="mr-4">
                        <i class="fa fa-edit mr-2"></i> 수정
                    </a>
                    <a href="${root}forums/delete/${forum.id}" class="mr-4" id="deleteConfirm">
                        <i class="fa fa-trash mr-2"></i> 삭제
                    </a>
                </c:if>
                <a href="javascript:history.back()">
                    <i class="fa fa-undo mr-2"></i> 목록
                </a>
            </div>
        </div>
    </div>
</div>


