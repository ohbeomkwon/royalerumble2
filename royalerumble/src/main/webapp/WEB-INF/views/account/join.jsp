<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<style>
    .royale-join {
        margin: 2em auto;
        width: 50%;
    }

    .error {
        color: red;
    }
</style>
<script>
    $(function(){
        $('#checkEamil').click(e => {
            // console.log(event);
            var email = $('#email').val();
            // $.get('checkemail', {email:email}, function(data){
            //     console.log(data);
            // })
            $.ajax({
                url : '${root}checkemail',
                type : 'post',
                contentType : 'application/json',
                data : email,
                success : function(data) {
                    if(data){
                        alert("이메일 중복입니다.");
                        $(':submit').prop('disabled', true);
                    } else {
                        alert("사용가능한 이메일 입니다.");
                        $(':submit').prop('disabled', false);
                    }
                }
            });
        })
    });
</script>
<div class="card royale-join">
    <span class="h4 font-weight-bold text-center">회원가입</span>
    <div class="card-body">
        <form:form commandName="member">
            <div class="md-form">
                <div class="input-group">
                    <form:input path="email" cssClass="form-control" required="required"/>
                    <label for="email">이메일</label>
                    <button type="button" class="btn btn-primary btn-sm" id="checkEamil">중복확인</button>
                </div>
                <div>
                </div>
            </div>
            <div class="md-form">
                <div class="input-group">
                    <form:input path="userName" cssClass="form-control" required="required"/>
                    <label for="userName">별명</label>
                </div>
                <div>

                </div>
            </div>
            <div class="md-form">
                <div class="input-group">
                    <form:password path="password" cssClass="form-control" required="required"/>
                    <label for="password">비밀번호</label>
                </div>
                <div>
                </div>
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-primary" disabled>회원가입</button>
            </div>
        </form:form>
    </div>
</div>