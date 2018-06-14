<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script>

    $(document).ready(function() {
        $(".home").on("click", function() {
            $(this).closest(".nav-item").addClass('active');
            $(".rank").closest(".nav-item").removeClass('active');
            //rank 비운다.
            $("#rank").empty();
            $(this).makeSearchWindow();
            $(this).makePopularDecks();
        });
        // id=clash 태그 에 대한 코드
        // 검색창을 구성
        $(this).makeSearchWindow();
        // 인기있는 덱을 처음에 불러옴
        $(this).makePopularDecks();
        // 플레이어 검색버튼
        $("#playerSearch").on("click",function() {
            var playerTag = $("#playerTag").val().toUpperCase();
            $("#clash").makePlayerProfile(playerTag);
        });
        // 클랜 검색버튼
        $("#clanSearch").on("click", function() {
            var clanTag = $("#clanTag").val().toUpperCase();
            $("#clash").makeClanProfile(clanTag);
        });

        // playerName을 클릭하면 playerProfile로 이동
        $("#clash").on("click",".playerName",function() {
            var playerTag = $(this).data("tag");
            console.log(playerTag);
            $("#clash").makePlayerProfile(playerTag);
        });
        // clanName을 클릭하면 clanProfile로 이동
        $("#clash").on("click", ".clanTag", function(){
            var clanTag = $(this).data("tag");
            console.log(clanTag);
            if(clanTag=="") {	// 클랜이 없으면
                return;
            }
            else {	// 클랜이 있으면..
                // 앞에있는 #을 잘라준다.
                var subClanTag = clanTag.substring(1);
                $("#clash").makeClanProfile(subClanTag);
            }

        });
        // clash 코드

        // rank 코드
        // nav에서 랭크를 눌렀을 경우
        $(".rank").on("click", function() {
            $(this).closest(".nav-item").addClass('active');
            $(".home").closest(".nav-item").removeClass('active');
            //clash를 비운다.
            $("#clash").empty();
            $(this).makePlayerRankList();
        });

        // playerName을 클릭하면 playerProfile로 이동
        $("#rank").on("click",".playerName",function() {
            var playerTag = $(this).data("tag");
            console.log(playerTag);
            $("#rank").empty();
            $("#clash").makePlayerProfile(playerTag);
        });
        // clanName을 클릭하면 clanProfile로 이동
        $("#rank").on("click", ".clanTag", function(){
            var clanTag = $(this).data("tag");
            console.log(clanTag);
            if(clanTag=="") {	// 클랜이 없으면
                return;
            }
            else {	// 클랜이 있으면..
                $("#rank").empty();
                $("#clash").makeClanProfile(clanTag);
            }
        });

        $("#rank").on("click", ".topPlayers",function(){
            $(this).makePlayerRankList();
        });
        $("#rank").on("click", ".topClans", function() {
            $(this).makeClanRankList();
        });
        // rank 코드 끝

    });
</script>

<div id="clash" class="mb-4"></div>
<div id="rank"></div>