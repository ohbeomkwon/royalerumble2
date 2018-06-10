<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<style>
    .royale-login{
        margin: 2em auto;
        width: 50%;
    }

    .error {
        color: red;
    }
</style>

<div class="card royale-login">
    <span class="h4 font-weight-bold text-center">로그인</span>
    <div class="card-body">
        <form:form commandName="authenticate">
            <div class="md-form">
                <form:input path="email" cssClass="form-control" required="required"/>
                <label for="email">이메일</label>
            </div>
            <div class="md-form">
                <form:password path="password" cssClass="form-control" required="required"/>
                <label for="password">비밀번호</label>
            </div>
            <div class="text-right">
                <button type="submit" class="btn btn-primary">로그인</button>
            </div>
            <div>
                <form:errors cssClass="error" element="p"/>
                <form:errors cssClass="error" path="email"/>
                <form:errors cssClass="error" path="password"/>
            </div>
        </form:form>
    </div>
</div>