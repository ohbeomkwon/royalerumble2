<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<style>
    .card.royale-account {
        margin: 4em auto;
        width: 800px;
        height: 600px;
    }

    .card-header.royale-account {

    }
    .table{
        margin:auto;
        width: 600px;
    }

    .avatar {
        width: 200px;
    }
    .user-avatar {
        position: relative;
    }

    .avatar-button {
        position: relative;
        top :  -35px;
        left: 60px;
    }

</style>
<script>
    $(function(){
        var validation = {
            edit : false,
            name : '',
            nameDupl : false,
        };

        $('.check').click(e =>{
            $(':input').prop('disabled', false);
        });

        $('#checkName').click(e => {
            var userName = $('#userName').val();
            validation.name = userName;
            if (!userName.trim()) {
                alert("이름을 입력해주세요");
                return;
            }
            $.get('${root}check', {name: userName}, function (data) {
                if (data) {
                    alert("이름 중복입니다.");
                    validation.nameDupl = false;
                } else {
                    alert("사용 가능한 이름입니다.");
                    validation.nameDupl = true;
                }
            })
        });

        $(':submit').click(e => {
            var userName = $('#userName').val();

            if (validation.nameDupl == false) {
                alert("이름 중복체크를 해주세요.");
                e.preventDefault();
            }
            if (validation.name !== userName) {
                validation.nameDupl = false;
                alert("다시 검사해주세요.");
                e.preventDefault();
            }
        })
    });
</script>
<div class="card royale-account">
    <div class="card-header royale-account text-center">
        <p class="h2 font-weight-bold primary-lighter-hover">FUMBLER</p>
        <p class="h4 grey-darker-hover">Account Information</p>
        <p class="h5">${result}</p>
    </div>
    <div class="card-body royale-account">
        <form:form commandName="member">
        <div>
            <div class="user-avatar ">
                <image class="mx-auto d-block avatar" src="${root}resources/images/anonymous.png"
                       alt="placeholder"/>
            </div>
            <div class="avatar-button">
                <i class="fas fa-camera fa-2x mx-auto d-block"></i>
            </div>
        </div>
        <table class="table table-bordered mt-3">
            <tbody>
            <tr style="height: 60px;">
                <th scope="row" class="blue-grey lighten-5" style="width: 100px;text-align: center; vertical-align: middle">
                    <span class="h6">E-MAIL</span>
                </th>
                <td>
                    <span class="font-weight-bold grey-darker-hover">${USER.email}</span>
                </td>
            </tr>
            <tr style="vertical-align: middle">
                <th scope="row" class="blue-grey lighten-5" style="width: 100px;text-align: center; vertical-align: middle">
                    <span class="h6">NAME</span>
                </th>
                <td>
                    <div class="input-group">
                        <form:input path="userName" cssClass="form-control" placeholder="${USER.userName}" disabled="true"/>
                        <div class="input-group-append">
                            <button type="button" class="check input-group-text"><i class="fas fa-edit"></i></button>
                        </div>
                        <div class="input-group-append">
                            <button type="button" class="input-group-text" id="checkName">중복체크</button>
                        </div>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <div>
            <div class="text-center mt-3">
                <button type="submit" class="btn btn-primary btn-md">저장</button>
                <a href="javascript:history.back()" class="btn btn-primary btn-md">취소</a>
            </div>
        </div>
        </form:form>
    </div>
</div>