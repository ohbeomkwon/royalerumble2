<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
    .dropdown-menu a {
        color: #111111 !important;
    }

    .dropdown-menu a:hover {
        background: #2979ff !important;
        color: #f8f9fa !important;
        -webkit-transition: all 0.2s ease-in-out;
        -moz-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
    }
</style>
<nav class="navbar navbar-expand-lg navbar-dark blue accent-3 sticky-top scrolling-navbar">
    <a class="navbar-brand" href="${root}">ROYALERUMBLE</a>
    <div class="container">
        <button class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarTogglerMenu" aria-controls="navbarTogglerMenu"
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerMenu">
            <ul class="navbar-nav mr-auto mt-lg-0">
                <li class="nav-item <c:if test="${home == 'active'}">active</c:if>">
                    <a class="nav-link" href="${root}">홈</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">카드</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">랭킹</a>
                </li>
                <li class="nav-item dropdown <c:if test="${forum == 'active'}">active</c:if>">
                    <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">포럼</a>
                    <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="${root}forums/list">자유</a>
                        <a class="dropdown-item" href="${root}forums/list?type=info">정보</a>
                        <a class="dropdown-item" href="${root}forums/list?type=strategy">전략</a>
                    </div>
                </li>
            </ul>
            <ul class="navbar-nav mt-lg-0">
                <c:choose>
                    <c:when test="${empty USER}">
                        <li class="nav-item">
                            <a class="nav-link" href="${root}login">로그인</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="${root}join">회원가입</a>
                        </li>
                    </c:when>
                    <c:otherwise>
                        <li class="nav-item">
                            <a class="nav-link" href="#">회원정보</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="${root}logout">로그아웃</a>
                        </li>
                    </c:otherwise>
                </c:choose>
            </ul>
        </div>
    </div>
</nav>