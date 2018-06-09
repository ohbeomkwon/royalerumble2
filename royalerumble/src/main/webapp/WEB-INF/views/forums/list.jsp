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

    .comment-cnt {
        font-weight: bold;
        color: dodgerblue;
    }
    .forum-item-right {
        color: gray;
    }
</style>
<div class="card forum-list">
    <div class="card-header forum-list">
        <div class="row">
            <div class="col-auto mr-auto">
                <div class="btn-group">
                    <a class="btn btn-primary active">자유</a>
                    <a class="btn btn-primary">소식</a>
                    <a class="btn btn-primary">전략</a>
                </div>
            </div>
            <div class="col-auto">
                <label class=sr-only for="searchInput">검색어</label>
                <div class="input-group mt-1">
                    <select class="browser-default">
                        <option value="1">제목</option>
                        <option value="2">제목+내용</option>
                        <option value="3">닉네임</option>
                    </select>
                    <input type="text" class="form-control py-0" id="searchInput" placeholder="검색어">
                    <div class="input-group-append">
                        <a class="input-group-text" href="#">검색</a>
                    </div>
                </div>
            </div>
            <div class="col-auto">
                <a class="btn btn-primary btn-sm" href="${root}forums/writing">글쓰기</a>
            </div>
        </div>
    </div>
    <div class="card-body forum-list">
        <table class="table">
            <thead>
                <tr>
                    <th class="text-center" style="width: 30px">글번호</th>
                    <th class="text-center" style="width: 300px">제목</th>
                    <th class="text-center" style="width: 30px">유저이름</th>
                    <th class="text-center" style="width: 30px">날짜</th>
                    <th class="text-center" style="width: 30px">조회수</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="forum" items="${list}">
                <tr>
                    <td class="text-center">${forum.id}</td>
                    <td>
                        <a href="${root}forums/forum/${forum.id}"><span>${forum.subject}</span></a>
                        <a href="#"><span class="comment-cnt">[${forum.commentCnt}]</span></a>
                    </td>
                    <td class="text-center forum-item-right">
                        <a href="#"><span class="user-name">${forum.userName}</span></a>
                    </td>
                    <td class="text-center forum-item-right">
                        <fmt:formatDate value="${forum.regDate}" pattern="yyyy-MM-dd"/>
                    </td>
                    <td class="text-center forum-item-right" >${forum.hits}</td>
                </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
    <pagination:pagination pagination="${pagination}" link="list"/>
</div>

