<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
</style>
<nav class="navbar navbar-expand-lg navbar-dark blue accent-3 sticky-top scrolling-navbar">
    <div class="container">
        <a class="navbar-brand" href="#">ROYALE</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarTogglerMenu" aria-controls="navbarTogglerMenu"
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerMenu">
            <ul class="navbar-nav mr-auto mt-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="#">홈<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">카드</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">랭킹</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${root}forums/list">포럼</a>
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