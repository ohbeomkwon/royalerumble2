<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<style>
    .card.forum-write{
        width: 1000px;
        height: 100%;
        min-height: 600px;
        margin: 2em auto;
    }
</style>
<script src="${root}resources/node_modules/tinymce/tinymce.min.js"></script>
<script>
    $(function () {
        tinymce.init({
            selector: 'textarea',
            language: 'ko_KR',
            height: "300"
        });
    });
</script>
<div class="card forum-write">
    <div class="card-header">
        <h3>글쓰기</h3>
    </div>
    <div class="card-body forum-write">
        <%--<form:form commandName="forum" enctype="multipart/form-data">--%>
        <form:form commandName="forum">
            <div class="mb-3">
                <form:hidden path="userName" value="${USER.userName}"/>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <form:input path="subject" cssClass="form-control" placeholder="제목" required="required"/>
                </div>
            </div>
            <br>
            <div>
                <%--<input type="file" id="upload" name="files" multiple="multiple"/>--%>
            </div>
            <br>
            <form:textarea path="content"/>
            <div class="text-center mt-3">
                <button type="submit" class="btn btn-blue btn-md">확인</button>
                <a href="javascript:history.back()" class="btn btn-blue btn-md">돌아가기</a>
            </div>
        </form:form>
    </div>
</div>

