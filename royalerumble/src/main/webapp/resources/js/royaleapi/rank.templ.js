var rankTempl = {
		playerRank : `
			<div class="card">
				<div class="card-title">
					<h4 class="d-inline-block topPlayers">Top Players</h4> / <h6 class="d-inline-block topClans">Top Clans</h6>
				</div>
				<div class="card-body">
					<table class="playerRank" style="margin:auto" width="95%" ></table>
				</div>
			</div>
		`,
		clanRank : `
			<div class="card">
				<div class="card-text">
					<h4 class="d-inline-block topClans">Top Clans</h4> / <h6 class="d-inline-block topPlayers">Top Players</h6>
				</div>
				<div class="card-body">
					<table class="clanRank" style="margin:auto" width="95%"></table>
				</div>
			</div>
		`,
		
		playerRankListTitle : `
						<thead>
							<tr>
								<th>Rank</th>
								<th></th>
								<th>Name</th>
								<th>Clan</th>
								<th>Delta</th>
								<th>Level</th>
								<th>Trophies</th>
								<th>Arena</th>
							</tr>
						</thead>
						`,
		playerRankList : function(data) {
			var sum = "<tbody>";
			for(var i=0; i<data.length; i++) {
				var arena = (data[i].arena.arena).replace(/(\s*)/g,""); // 글자 내에 모든 공백 제거
				var clanName="";
				var clanTag="";
				var clanBadge="";
				if(data[i].clan != null) {
					clanName = data[i].clan.name;
					clanTag = data[i].clan.tag;
//					console.log(`${badgesImg}`);
//					console.log(`${data[i].clan.badge.name}`);
					clanBadge=`${badgesImg}${data[i].clan.badge.name}`;
				}
				else {
					clanName = "Not in Clan";
					clanBadge=`${root}resources/img/etc/no_clan`;
				}
				var delta=0;
				var deltaValue = data[i].rank-data[i].previousRank;
				if(deltaValue<0) {	// 랭크가 오름
					delta = "↑ "+Math.abs(deltaValue);
				}
				else if(deltaValue>0) { // 랭크가 내림
					delta="↓ "+Math.abs(deltaValue);
				}
				var obj=`
						<tr>
							<th scope="row">${data[i].rank}</th>
							<td>
								<img src="${clanBadge}.png" width="50px"/>
							</td>
							<td class="playerName" data-tag="${data[i].tag}">${data[i].name}</td>
							<td class="clanTag" data-tag="${clanTag}">${clanName}</td>
							<td>${delta}</td>
							<td>${data[i].expLevel}</td>
							<td>${data[i].trophies}</td>
							<td>
								<img src="${arenasImg}${arena}.png" width="50px" />
								${data[i].arena.name} : ${data[i].arena.arena}
							</td>
						</tr>
				`;
				sum += obj;
			}
			sum +="</tbody>";
			return sum;
		},
		
		clanRankListTitle:`
						<thead>
							<tr>
								<th>Rank</th>
								<th>Badge</th>
								<th>Name</th>
								<th>Location</th>
								<th>Members</th>
								<th>Delta</th>
								<th>Trophies</th>
							</tr>
						</thead>
		`,
		clanRankList : function(data) {
			var sum="<tbody>";
			for(var i=0; i<data.length; i++) {
				var badge = `${badgesImg}${data[i].badge.name}.png`;
				var delta=0;
				var deltaValue = data[i].rank-data[i].previousRank;
				if(deltaValue<0) {	// 랭크가 오름
					delta = "↑ "+Math.abs(deltaValue);
				}
				else if(deltaValue>0) { // 랭크가 내림
					delta="↓ "+Math.abs(deltaValue);
				}
//				console.log(badge);
				var obj = `
					<tr>
						<th scope="row">${data[i].rank}</th>
						<td>
							<img src="${badge}" width="50px"/>
						</td>
						<td>
							<span class="d-block clanTag" data-tag="${data[i].tag}">${data[i].name}</span>
							<span class="clanTag" data-tag="${data[i].tag}">${data[i].tag}</span>
						</td>
						<td>${data[i].location.name}</td>
						<td>${data[i].memberCount}</td>
						<td>${delta}</td>
						<td>${data[i].score}</td>
					</tr>
					`;
				sum += obj;
			}
			sum += "</tbody>"
			return sum;
		}
};