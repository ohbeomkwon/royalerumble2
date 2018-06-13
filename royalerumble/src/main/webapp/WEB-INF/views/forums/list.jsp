<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib tagdir="/WEB-INF/tags/util" prefix="pagination" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<style>
    .card.forum-list {
        margin: 2em auto;
        width: 1000px;
    }

    .forum-item-right {
        color: #90a4ae;
    }

    .comment-cnt {
        color: #448aff;
    }
</style>
<script>
    $(function () {
        $('.parse-time').each(function (index, element) {
            var now = new Date();
            var created = $(element).text();
            $(element).text(parseTime(created));
            $(element).closest('tr').find('td').eq(1).append(newBadge(created));
        });

        $(':submit').click(e => {
            var keyword = $('#keyword').val();
            if (!keyword.trim()) {
                alert("검색어를 입력해주세요");
                e.preventDefault();
                return;
            }
            if (keyword.trim().length < 2) {
                alert("검색은 2글자 이상입니다.");
                e.preventDefault();
                return;
            }
        });
    })
</script>
<div class="card forum-list">
    <div class="card-header forum-list">
        <div class="row">
            <div class="col-auto mr-auto">
                <div class="btn-group">
                    <a class="btn btn-primary <c:if test="${pagination.type == 'free'}">active</c:if>"
                       href="${root}forums/list">고블린광장</a>
                    <a class="btn btn-primary <c:if test="${pagination.type == 'info'}">active</c:if>"
                       href="${root}forums/list?type=info">정보/소식</a>
                    <a class="btn btn-primary <c:if test="${pagination.type == 'strategy'}">active</c:if>"
                       href="${root}forums/list?type=strategy">전략오두막</a>
                </div>
            </div>
            <div class="col-auto">
                <form method="get">
                    <div class="input-group mt-1">
                        <input type="hidden" id="type" name="type" value="${pagination.type}"/>
                        <select type="select" id="select" name="select" class="browser-default">
                            <c:choose>
                                <c:when test="${pagination.select == 1 || pagination.select == 0}">
                                    <option value="1" selected="true">제목</option>
                                    <option value="2">제목+내용</option>
                                    <option value="3">유저네임</option>
                                </c:when>
                                <c:when test="${pagination.select == 2}">
                                    <option value="1">제목</option>
                                    <option value="2" selected="true">제목+내용</option>
                                    <option value="3">유저네임</option>
                                </c:when>
                                <c:when test="${pagination.select == 3}">
                                    <option value="1">제목</option>
                                    <option value="2">제목+내용</option>
                                    <option value="3" selected="true">유저네임</option>
                                </c:when>
                            </c:choose>
                        </select>
                        <input type="text" id="keyword" name="keyword" class="form-control py-0" placeholder="검색어"
                               value="${pagination.keyword}"/>
                        <div class="input-group-append">
                            <button type="submit" class="input-group-text">검색</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-auto">
                <a class="btn btn-primary btn-sm" href="${root}forums/writing?type=${pagination.type}">글쓰기</a>
            </div>
        </div>
    </div>
    <div class="card-body forum-list">
        <table class="table">
            <thead>
            <tr>
                <th class="text-center" style="width: 50px">글번호</th>
                <th class="text-center" style="width: 400px">제목</th>
                <th class="text-center" style="width: 80px">유저네임</th>
                <th class="text-center" style="width: 50px">날짜</th>
                <th class="text-center" style="width: 50px">조회수</th>
            </tr>
            </thead>
            <tbody>
            <c:choose>
                <c:when test="${not empty list}">
                    <c:forEach var="forum" items="${list}">
                        <tr>
                            <td class="text-center">${forum.id}</td>
                            <td>
                                <a href="${root}forums/forum/${forum.id}">
                                    <span>
                                        <c:if test="${forum.modified == 1}">
                                            [포럼수정]
                                        </c:if>
                                             ${forum.subject}
                                    </span>
                                </a>
                                <c:if test="${forum.commentCnt >0}">
                                    <a href="#">
                                        <span class="comment-cnt font-weight-bold">
                                                [${forum.commentCnt}]
                                        </span>
                                    </a>
                                </c:if>
                            </td>
                            <td class="text-center forum-item-right">
                                <a href="#"><span class="user-name">${forum.userName}</span></a>
                            </td>
                            <td class="text-center forum-item-right parse-time">
                                <fmt:formatDate value="${forum.regDate}" pattern="yyyy-MM-dd hh:mm:ss"/>
                            </td>
                            <td class="text-center forum-item-right">${forum.hits}</td>
                        </tr>
                    </c:forEach>
                </c:when>
                <c:otherwise>
                    <tr>
                        <td colspan="5">게시글이 없습니다.</td>
                    </tr>
                </c:otherwise>
            </c:choose>
            </tbody>
        </table>
    </div>
    <c:choose>
        <c:when test="${pagination.keyword != ''}">
            <pagination:pagination pagination="${pagination}" link="${root}forums/list"
                                   params="&type=${pagination.type}&select=${pagination.select}&keyword=${pagination.keyword}"/>
        </c:when>
        <c:otherwise>
            <pagination:pagination pagination="${pagination}" link="${root}forums/list"
                                   params="&type=${pagination.type}"/>
        </c:otherwise>
    </c:choose>
</div>

