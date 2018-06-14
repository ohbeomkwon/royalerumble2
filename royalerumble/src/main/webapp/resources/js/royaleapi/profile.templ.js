var search = {
		searchWindow : `
			<div class="card-deck">
				<div class="card mb-4">
					<h4 class="card-title">플레이어 검색</h4>
					<div class="card-body">
						<input type="text" id="playerTag">
						<button class="btn btn-primary btn-sm" id="playerSearch">검색</button>
					</div>	
				</div>
				<div class="card mb-4">
					<h4 class="card-title">클랜 검색</h4>
					<div class="card-body">
						<input type="text" id="clanTag">
						<button class="btn btn-primary btn-sm" id="clanSearch">검색</button>
					</div>
				</div>
			</div>
			
			<div class="card mb-4" id="popularDecks">		
			</div>
		`
};

var profileTempl = {
		player : `
			<div class="player">
				<div class="playerProfile card mb-1"></div>
				<div class="playerChests card mb-1"></div>
				<div class="playerStats card mb-1"></div>
				<div class="playerGames card mb-1" ></div>
				<div class="playerCurrentDeck card mb-1"></div>
			</div>
			`,
		playerProfile : function(data) {
			var arenaLevel = data.arena.arena;
			var arena = arenaLevel.replace(/(\s*)/g,""); // 모든 공백 제거
			var clan="";
			var clanImg="";
			var clanTag="";
			if(data.clan !=null) {
				clan = data.clan.name;
				clanImg="/royalerumble/resources/img/badges/"+data.clan.badge.name+".png";
				clanTag = "#"+data.clan.tag;
			}
			else {
				clan = "Not in Clan";
				clanImg="/royalerumble/resources/img/etc/no_clan.png";
			}
			var obj = `
				<h4 class="card-title font-weight-bold">Profile</h4>
				<div class="card-body">
					<div class="row playerProfile card-text">
						<div class="col-3">
							<img src="/royalerumble/resources/img/arenas/${arena}.png" width="100px"/>
						</div>
						<div class="col-9">
							<div class="row mb-2">
								<div class = "name col">${data.name}</div>
								<div class = "tag col">#${data.tag}</div>
							</div>
							<div class="row mb-2">
								<div class="clanTag col" data-tag="${clanTag}">
									<img src="${clanImg}" width="25px"/>  
									${clan}
								</div>
								<div class="clanTag col" data-tag="${clanTag}">${clanTag}</div>
							</div>
							<div class="row">
								<div class="col">${data.arena.arena} : ${data.arena.name}</div>
								<div class="trophies col">
									<img src="/royalerumble/resources/img/etc/trophy.png" width="25px"/>
									${data.trophies} / ${data.stats.maxTrophies}  
								</div>
							</div>
						</div>
					</div>
				</div>
			`;
			return obj;
		},
		
		playerChests : function(data) {
			console.log(data);
			var chests = sortObject(data);
			var sum=`
				<h4 class="card-title">Chests</h4>
				<div class="card-body" >
			`;
			for(var i=0; i<chests.length; i++) {
//				<img src="/royalerumble/resources/img/chests/chest-${chests[i].value}.png" width="100px"/>
				var index = chests[i].key==0? "Next" : "+"+chests[i].key;
				var obj = `
				<div class="d-inline-block _chest">
					<div class="_${chests[i].value}">
						<p>${index}</p>
					</div>
				</div>
				`;
				sum += obj;
			}
			sum += "</div>";
			return sum;
		},
		
		playerGames : function(data) {
			var winsPercent = (data.games.winsPercent * 100).toFixed(2);
			var lossesPercent = (data.games.lossesPercent*100).toFixed(2);
			var drawsPercent = (data.games.drawsPercent*100).toFixed(2);
			var obj = `
				<h4 class="card-title">	Games</h4>
				<div class="card-body">
					<div class="row">
						<div class="col font-weight-bold">총 게임</div>
						<div class="col"></div>
						<div class="col">${data.games.total}</div>
						<div class="col"></div>
					</div>
					<div class="row">
						<div class="col font-weight-bold">승리</div>
						<div class="col"></div>
						<div class="col">${data.games.wins}</div>
						<div class="col">${winsPercent} %</div>
					</div>
					<div class="row">
						<div class="col"></div>
						<div class="col">(3크라운 승리 : ${data.stats.threeCrownWins})</div>
					</div>
					<div class="row">
						<div class="col font-weight-bold">패배</div>
						<div class="col"></div>
						<div class="col">${data.games.losses}</div>
						<div class="col">${lossesPercent} %</div>
					</div>
					<div class="row">
						<div class="col font-weight-bold">무승부</div>
						<div class="col"></div>
						<div class="col">${data.games.draws}</div>
						<div class="col">${drawsPercent} %</div>
					</div>
				<div>
			`;
			return obj;
		},
		
		playerCurrentDeck : function(data) {
			var sum=`
				<h4 class="card-title">CurrentDeck</h4>
				<div class="card-body" style="margin:auto">
			`;
			for(var i=0; i<data.currentDeck.length; i++) {
				var card = data.currentDeck[i];
				// var cardIcon = "/royalerumble/resources/img/cards-png8/"+data.currentDeck[i].key+".png";
				// ${card.icon}을 통해서 인터넷에서 불러오는 방법도 있음
				// <img src="${card.icon}" width="110em"/>
				// <img src="${cardIcon}" width="130px"/>
				var level = "Lv."+card.level;
				var obj=`
					<div class="d-inline-block _card">
						<div style="background-image:url('/royalerumble/resources/img/cards-png8/${card.key}.png')">
							<p>${level}</p>
						</div>
					</div>
				`;
				
				sum += obj;
			}
			sum += "</div>";
			return sum;
		},
		
		
		clan : `
			<div class="clan">
				<div class="clanProfile card"></div>
				<div class="clanDescription card"></div>
				<div class="card">
					<div class="card-body">
						<div class="card-text">
							<table class="table clanMembers">
							</table>
						</div>
					</div>
				</div>
			</div>
		`,
		clanProfile : function(data) {
			var obj = `
					<div class="row clanProfile card-body">
						<div class="badge col-2">
							<img src="/royalerumble/resources/img/badges/${data.badge.name}.png" width="100px"/>
						</div>
						<div class="col-10">
							<div class="card-text">
								<div class="name ">클랜명 : ${data.name}</div>
								<div class="tag ">태그 : ${data.tag}</div>
								<div class="type ">공개여부 : ${data.type}</div>
							</div>
						</div>
					</div>
			`;
			return obj;
		},
		clanDescription : function (data) { 
			var obj = `
					<div class="clanDescription card-body">
						<h5 class="card-text">${data.description}</h5>
					</div>
				`;
			return obj;
		},
		clanMemberTitle : `
					<thead>
				        <tr>
				            <th>#</th>
				            <th>플레이어</th>
				            <th>레벨</th>
				            <th>크라운</th>
				            <th>지원</th>
				            <th>트로피</th>
				        </tr>
				    </thead>
			`,
			/*
			`	<div class="clanMemberTitle card">
						<div class="card-body">
							<div class="card-text row">
								<div class="numberTitle col-1">#</div>
								<div class="playerNameTitle col-4">플레이어</div>
								<div class="levelTitle col-1">레벨</div>
								<div class="crownTitle col-2">크라운</div>
								<div class="donationsTitle col-2">지원</div>
								<div class="trophiesTitle col-2">트로피</div>
							</div>
						</div>
					</div>
			`,
			*/
		// member data가 for문을 돌면서 반복적으로 들어오게 하자
		clanMember : function (data) {
			var sum="<tbody>";
			for (var i=0; i<data.members.length; i++) {
				var member = data.members[i];
				var obj = `
				        <tr>
				            <th scope="row">${i+1}</th>
				            <td class="playerName" data-tag="${member.tag}">
				            	${member.name}
				            </td>
				            <td>${member.expLevel}</td>
				            <td>${member.clanChestCrowns}</td>
				            <td>${member.donations}</td>
				            <td>${member.trophies}</td>
				        </tr>
					`;
				
				/*
				var obj = `
				  <div class="clanMember card">
							<div class="card-body">
								<div class="card-text row">
									<div class="number col-1">${i+1}</div>
									<div class="playerName col-4" data-tag="${member.tag}" >${member.name}</div>
									<div class="level col-1">${member.expLevel}</div>
									<div class="crown col-2">${member.clanChestCrowns}</div>
									<div class="donations col-2">${member.donations}</div>
									<div class="trophies col-2">${member.trophies}</div>
								</div>
							</div>
						</div>
				`;
				*/
				sum += obj;
			};
			sum +="</tbody>";
			return sum;
		}
};

var decksTempl = {
		popularDecks : function(data) {
			var sum=`
				<h4 class="card-title">PopularDecks</h4>
				<div class="card-body">
			`;
			
			for(var i=0; i<3; i++) {		// 3가지 경우만 보여준다.
//				console.log(data[i].cards);	// console 출력은 정상적으로 일어남. 그런데 페이지에 붙지를 않음..
				sum += `<div class="card mb-2">
									<div class="card-body">
									<p class="information">Popularity : ${data[i].popularity}/10</p>
							`;
				var AverageElixir=0;
				for(var j=0; j<data[i].cards.length; j++) {
//					console.log(data[i].cards.length);
					var card = data[i].cards[j];
					var elixir = data[i].cards[j].elixir;
//					console.log(elixir);
					AverageElixir += elixir;
					console.log(card.key);
					var obj=`
						<div class="d-inline-block _card">
							<img src="/royalerumble/resources/img/cards-png8/${card.key}.png" width="120px" height="140px"/>
						</div>
					`;
					/*<div style="background-image:url('/royalerumble/resources/img/cards-png8/${card.key}.png')">
								<p>elixir:${elixir}</p>
						</div>
					*/
					/*<img src="/royalerumble/resources/img/cards-png8/${card.key}.png" width="130px" height="150px"/>*/
					sum += obj;
				}
				AverageElixir = (AverageElixir/8).toFixed(1); 
				sum+=`	<p class="information" style="text-align:right">Average Elixir : ${AverageElixir}</p>
								</div>
							</div>`;
			}
			sum += "</div>";	// for문이 끝나면 마지막 card-body 를 닫는다.
//			console.log(sum);
			return sum;
		}
};

function sortObject (data) {
	var sortData=[];
	for(var keys in data) {
		if(keys=="upcoming") {
			for(var i=0; i<data["upcoming"].length; i++) {
				sortData.push({key:i, 
										value:data["upcoming"][i] }); // data 안에 upcoming 키 안의 i번째 라는 뜻
			}
		}
		else {
			sortData.push({key: data[keys] , value: keys});
		}
	}
	
	sortData.sort(function(a,b) {
		return a.key < b.key ? -1 : a.key > b.key? 1:0; 
	});
	console.log(sortData);
	return sortData;
};