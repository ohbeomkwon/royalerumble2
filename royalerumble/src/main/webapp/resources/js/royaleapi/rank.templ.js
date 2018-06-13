var rankTempl = {
		playerRank : `
			<div class="card">
				<h4 class="card-title">Top Players</h4>
				<div class="card-body">
					<table class="playerRank" style="margin:auto" width="95%" ></table>
				</div>
			</div>
		`,
		clanRank : `
			<div class="card">
				<h4 class="card-text">Top Clans</h4>
				<div class="card-body">
					<table class="clanRank"></table>
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
					console.log(`${badgesImg}`);
					console.log(`${data[i].clan.badge.name}`);
					clanBadge=`${badgesImg}${data[i].clan.badge.name}`;
				}
				else {
					clanName = "Not in Clan";
					clanBadge=`${root}resources/img/etc/no_clan`;
				}
				var delta=0;
				var deltaValue = data[i].rank-data[i].previousRank;
				if(deltaValue<0) {	// 랭크가 오름
					delta = "↑"+Math.abs(deltaValue);
				}
				else if(deltaValue>0) { // 랭크가 내림
					delta="↓"+Math.abs(deltaValue);
				}
				var obj=`
						<tr>
							<th scope="row">${data[i].rank}</th>
							<td>
								<img src="${clanBadge}.png" width="50px"/>
							</td>
							<td class="playerName" data-ptag="${data[i].tag}">${data[i].name}</td>
							<td class="clanTag" data-tag="${clanTag}">${clanName}</td>
							<td>${delta}</td>
							<td>${data[i].expLevel}</td>
							<td>${data[i].trophies}</td>
							<td>
								<img src="${arenasImg}${arena}.png" width="50px" />
								${data[i].arena.name} : ${data[i].arena.arena}
							</td>
						</tr>
					</tbody>
				`;
				sum += obj;
			}
			sum +="</tbody>";
			return sum;
		},
		
		clanRankListTitle:``,
		clanRankList : function(data) {
			
		}
};