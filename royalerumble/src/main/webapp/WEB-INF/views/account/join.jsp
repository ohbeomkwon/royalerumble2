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
        var emailDupl = false;
        var nameDupl = false;
        $('#checkEmail').click(e => {
            var email = $('#email').val();
            if(!email.trim()){
                alert("이메일을 입력해주세요");
                return;
            }
            $.get('check', {email : email, name : 'null'}, function(data){
                if(data){
                    alert("이메일 중복입니다.");
                    emailDupl = false;
                } else {
                    alert("사용 가능한 이메일 입니다.");
                    emailDupl = true;
                }
            });
        });

        $('#checkName').click(e =>{
            var userName = $('#userName').val();
            if(!userName.trim()){
                alert("이름을 입력해주세요");
                return;
            }
            $.get('check', {email : 'null', name : userName }, function(data){
                if(data){
                    alert("이름 중복입니다.");
                    anmeDupl = false;
                } else {
                    alert("사용 가능한 이름입니다.");
                    nameDupl = true;
                }
            })
        });

        $(':submit').click(e => {
            if(emailDupl == false) {
                alert("이메일 중복체크를 해주세요.");
                return;
            }
            if(nameDupl == false) {
                alert("이름 중복체크를 해주세요.");
                return;
            }
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
                    <button type="button" class="btn btn-primary btn-sm" id="checkEmail">중복확인</button>
                </div>
                <div>
                </div>
            </div>
            <div class="md-form">
                <div class="input-group">
                    <form:input path="userName" cssClass="form-control" required="required"/>
                    <label for="userName">유저네임</label>
                    <button type="button" class="btn btn-primary btn-sm" id="checkName">중복확인</button>
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
                <button type="submit" class="btn btn-primary">회원가입</button>
            </div>
        </form:form>
    </div>
</div>