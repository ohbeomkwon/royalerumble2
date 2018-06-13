<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="${root}resources/js/royaleapi/royaleapi.js"></script>
<script src="${root}resources/js/royaleapi/profile.js"></script>
<script src="${root}resources/js/royaleapi/profile.templ.js"></script>
<script src="${root}resources/js/royaleapi/rank.js"></</script>
<script src="${root}resources/js/royaleapi/rank.templ.js"></</script>

<link href="${root}resources/css/font_setting.css" rel="stylesheet" />
<link href="${root}resources/css/chests.css" rel="stylesheet" />
<link href="${root}resources/css/cards.css" rel="stylesheet" />
<link href="${root}resources/css/profile.css" rel="stylesheet" />

<script>
    var projectName = "ROYALERUMPLE";
    var api = new RoyaleApi();

    $(document).ready(function() {
        var self = this;
        home();



        function home() {
            $('#royaleInit').append(mainTempl.init);
            // 인기있는 덱을 처음에 불러옴
            $(self).makePopularDecks();

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
        }

        function rank() {
            $(self).makePlayerRankList();
        }
    });
</script>

<div id="royaleInit">

</div>
