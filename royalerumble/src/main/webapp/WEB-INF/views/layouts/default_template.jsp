<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<c:set value="${pageContext.request.contextPath}/" var="root" scope="request"/>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Fumbler</title>
    <link rel="stylesheet" href="${root}resources/node_modules/mdbootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="${root}resources/node_modules/mdbootstrap/css/mdb.min.css"/>
    <style>
        body{
            background-color : #DDDDDD;
        }
        .root.container {
            min-height: 800px;
        }
        .primary-lighter-hover {
            color: #4285F4;
            -webkit-transition: .4s;
            transition: .4s;
        }
        .primary-lighter-hover:hover {
            -webkit-transition: .4s;
            transition: .4s;
            color: #8ab4f8;
        }

        .grey-darker-hover {
            color: #616161;
            -webkit-transition: .4s;
            transition: .4s; }
        .grey-darker-hover:hover {
            -webkit-transition: .4s;
            transition: .4s;
            color: #3b3b3b; }

    </style>
    <script src="${root}resources/node_modules/mdbootstrap/js/jquery-3.3.1.min.js"></script>
    <script src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>
    <script src="${root}resources/js/common.js"></script>


    <script src="${root}resources/js/royaleapi/royale.api.js"></script>
    <script src="${root}resources/js/royaleapi/profile.js"></script>
    <script src="${root}resources/js/royaleapi/profile.templ.js"></script>
    <script src="${root}resources/js/royaleapi/rank.js"></script>
    <script src="${root}resources/js/royaleapi/rank.templ.js"></script>

    <link href="${root}resources/css/font_setting.css" rel="stylesheet" />
    <link href="${root}resources/css/chests.css" rel="stylesheet" />
    <link href="${root}resources/css/cards.css" rel="stylesheet" />
    <link href="${root}resources/css/profile.css" rel="stylesheet" />
    <link href="${root}resources/css/rank.css" rel="stylesheet" />

    <c:url value="/resources/img/arenas/" var="arenasImg"/>
    <c:url value="/resources/img/badges/" var="badgesImg"/>
    <c:url value="/resources/img/cards-png8/" var="cardsImg"/>
    <c:url value="/resources/img/chests/" var="chestsImg"/>
    <c:url value="/resources/img/etc/" var="etcImg" />
    <script>
        var root="${root}";
        var badgesImg="${badgesImg}";
        var arenasImg="${arenasImg}";
        var cardsImg="${cardsImg}";
        var chestsImg = "${chestsImg}";
        var etcImg="${etcImg}";

        var projectName = "ROYALERUMPLE";
        var api = new RoyaleApi();
    </script>
</head>
<body>
<tiles:insertAttribute name="menu" />
<div class="root container">
<tiles:insertAttribute name="body" />
</div>
<tiles:insertAttribute name="footer" />
<%--<tiles:insertAttribute name="footer" />--%>
<script src="${root}resources/node_modules/mdbootstrap/js/popper.min.js"></script>
<script src="${root}resources/node_modules/mdbootstrap/js/bootstrap.min.js"></script>
<script src="${root}resources/node_modules/mdbootstrap/js/mdb.min.js"></script>
</body>
</html>