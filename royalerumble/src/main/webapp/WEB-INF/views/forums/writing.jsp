<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<style>
    .card.forum-write {
        width: 1000px;
        height: 100%;
        min-height: 600px;
        margin: 2em auto;
    }

    .card-header.forum-write {
        background: #2979ff;
        color: #fff;
    }
</style>
<script src="${root}resources/node_modules/tinymce/tinymce.min.js"></script>
<script>
    $(function () {
        tinymce.init({
            selector: 'textarea',
            language: 'ko_KR',
            height: "300",
        });
        //검사 ...대충하자...
        $(':submit').click(e =>{
            var subject = $('#subject').val();
            var content = tinyMCE.activeEditor.getContent({
                format : 'text'
            });
            if(subject.trim().length < 5){
                alert("제목은 5글자 이상입니다.");
                e.preventDefault();
                return;
            }
            if(content.trim().length < 10){
                alert("본문은 10글자 이상입니다.");
                e.preventDefault();
                return;
            }
        });
    });
</script>
<div class="card forum-write">
    <div class="card-header forum-write">
        <c:if test="${type == 'free'}"><h3 class="my-2">자유</h3></c:if>
        <c:if test="${type == 'info'}"><h3 class="my-2">정보</h3></c:if>
        <c:if test="${type == 'strategy'}"><h3 class="my-2">전략</h3></c:if>
    </div>
    <div class="card-body forum-write">
        <%--<form:form commandName="forum" enctype="multipart/form-data">--%>
        <form:form commandName="forum">
            <div class="mb-3">
                <form:hidden path="userName" value="${USER.userName}"/>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <form:input path="subject" cssClass="form-control" placeholder="제목을 입력해 주세요." required="required"/>
                </div>
            </div>
            <br>
            <div>
                    <%--<input type="file" id="upload" name="files" multiple="multiple"/>--%>
            </div>
            <br>
            <form:textarea path="content"/>
            <form:hidden path="insertType" value="${type}"/>
            <div class="text-center mt-3">
                <button type="submit" class="btn btn-blue btn-md">쓰기</button>
                <a href="javascript:history.back()" class="btn btn-blue btn-md">취소</a>
            </div>
        </form:form>
    </div>
</div>

