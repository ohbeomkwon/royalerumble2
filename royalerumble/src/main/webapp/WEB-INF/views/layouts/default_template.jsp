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
    <style>
        @font-face {
            font-family: 'Supercell-magic';
            src: url(${root}/resources/font/Supercell-magic-webfont.otf) format('opentype');
        }
        body, table, div, p {font-family:'Nanum Gothic';}
        body {
            overflow-x: hidden;
        }
    </style>
    <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic" rel="stylesheet">
    <link rel="stylesheet" href="${root}resources/node_modules/mdbootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="${root}resources/node_modules/mdbootstrap/css/mdb.min.css"/>
    <link rel="stylesheet" href="${root}resources/css/main.css"/>

    <script src="${root}resources/node_modules/mdbootstrap/js/jquery-3.3.1.min.js"></script>
    <script src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>
    <script src="${root}resources/js/common.js"></script>
    <script src="${root}resources/js/application/royale.api.js"></script>
    <script src="${root}resources/js/application/main.js"></script>
    <script>
        var opt = {
            api: new RoyaleApi(),
            context : '${root}',
            prevElement: '.navbar',
        };
        $(function () {
            $(document).royaleServiceInit(opt);
        })

        function errorPage() {
            var _appClass = document.getElementsByClassName("_app");
            var error = `
                <div>
                    <h3 class="font-weight-bold"> API 서버에 접속할 수 없습니다. <h3>
                    <h5> 잠시후에 다시 이용해주세요.</h5>
                </div>
                `;
            _appClass.innerHTML = error;
        };
    </script>
</head>
<body>
<tiles:insertAttribute name="menu"/>
<div class="_app">
    <tiles:insertAttribute name="body"/>
</div>
<tiles:insertAttribute name="footer"/>
<%--<tiles:insertAttribute name="footer" />--%>
<script src="${root}resources/node_modules/mdbootstrap/js/popper.min.js"></script>
<script src="${root}resources/node_modules/mdbootstrap/js/bootstrap.min.js"></script>
<script src="${root}resources/node_modules/mdbootstrap/js/mdb.min.js"></script>
<script>
</script>
</body>
</html>