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
    <title>RoyaleRumble</title>
    <link rel="stylesheet" href="${root}resources/node_modules/mdbootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="${root}resources/node_modules/mdbootstrap/css/mdb.min.css"/>
    <style>
        body{
            background-color : #DDDDDD;
        }
        .root.container {
            min-height: 500px;
        }
    </style>
    <script src="${root}resources/node_modules/mdbootstrap/js/jquery-3.3.1.min.js"></script>
    <script src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>
    <script>
        $(function () {

        });
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