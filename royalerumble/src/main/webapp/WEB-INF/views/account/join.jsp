<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<style>
    .card.royale-join {
        margin: 8em auto;
        width: 450px;
        height: 600px;
    }

    .card-header.royale-join {

    }

    .error {
        color: red;
    }
</style>
<script>
    $(function () {
        var emailDupl = false;
        var nameDupl = false;
        $('#checkEmail').click(e => {
            var email = $('#email').val();
            if (!email.trim()) {
                alert("이메일을 입력해주세요");
                return;
            }
            $.get('check', {email: email}, function (data) {
                if (data) {
                    alert("이메일 중복입니다.");
                    emailDupl = false;
                } else {
                    alert("사용 가능한 이메일 입니다.");
                    emailDupl = true;
                }
            });
        });

        $('#checkName').click(e => {
            var userName = $('#userName').val();
            if (!userName.trim()) {
                alert("이름을 입력해주세요");
                return;
            }
            $.get('check', {name: userName}, function (data) {
                if (data) {
                    alert("이름 중복입니다.");
                    nameDupl = false;
                } else {
                    alert("사용 가능한 이름입니다.");
                    nameDupl = true;
                }
            })
        });

        $(':submit').click(e => {
            if (emailDupl == false) {
                alert("이메일 중복체크를 해주세요.");
                return;
            }
            if (nameDupl == false) {
                alert("이름 중복체크를 해주세요.");
                return;
            }
        })
    });
</script>
<div class="card royale-join">
    <div class="card-header royale-join text-center">
        <p class="h2 font-weight-bold primary-lighter-hover">FUMBLER</p>
        <p class="h4 grey-darker-hover">Sign up</p>
    </div>
    <div class="card-body royale-join">
        <form:form commandName="member">
            <div class="md-form">
                <div class="input-group">
                    <form:input path="email" cssClass="form-control" required="required"/>
                    <label for="email">E-MAIL</label>
                    <button type="button" class="btn btn-primary btn-sm" id="checkEmail">중복확인</button>
                </div>
                <div class="error">
                    <span>벨리데이션 테스트</span>
                </div>
            </div>
            <div class="md-form">
                <div class="input-group">
                    <form:input path="userName" cssClass="form-control" required="required"/>
                    <label for="userName">NAME</label>
                    <button type="button" class="btn btn-primary btn-sm" id="checkName">중복확인</button>
                </div>
                <div class="error">
                    <span>벨리데이션 테스트</span>
                </div>
            </div>
            <div class="md-form">
                <div class="input-group">
                    <form:password path="password" cssClass="form-control" required="required"/>
                    <label for="password">PASSWORD</label>
                </div>
                <div class="error">
                    <span>벨리데이션 테스트</span>
                </div>
            </div>
            <div class="row text-center">
                <div class="col-sm-6">
                    <button type="submit" class="btn btn-primary btn-block">가입</button>
                </div>
                <div class="col-sm-6">
                    <a class="btn btn-primary btn-block">취소</a>
                </div>
            </div>
        </form:form>
    </div>
    <div class="card-footer royale-join">
        <div class="text-center font-small">
            <span>FUMBLER 회원이신가요?</span><a class="ml-2"href="${root}login">로그인하기</a>
        </div>
    </div>
</div>