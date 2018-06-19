class RoyaleApi {
	constructor() {
		this.url = "https://api.royaleapi.com/";
		this.apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUxLCJpZGVuIjoiNDUxMjExODc0NTc1NDUwMTE0IiwibWQiOnt9LCJ0cyI6MTUyNzY0ODE3MjM5Mn0.OSfIRCUlyqEBUe2cXAwCtYPqOMlHoKMmufwoAvjwQcY";
		this.dataType = "json";
	}
	
	// callback함수를 입력받아 사용한다. 리턴없음
	getPlayer(tag, callback) {
		var param = {
				type : "get",
				url : this.url+"player/"+tag,
				headers : {
					auth: this.apiKey
				},
				dataType : this.dataType,
				success : callback
		};
		$.ajax(param);
	}
	
	// 상자를 가져오는 ajax 함수
	getChests(tag, callback) {
		var param={
				type : "get",
				url : this.url+"player/"+tag+"/chests",
				headers : {
					auth : this.apiKey
				},
				dataType : this.dataType,
				success : callback
		};
		$.ajax(param);
	}
	
	
	// jsp 페이지에서 ajax를 통해서 callback 함수를 정의한다.
	getClan(tag, callback) {
		var param={
			type : "get",
			url : this.url+"clan/"+tag,
			headers : {
				auth : this.apiKey
			},
			dataType : this.dataType,
			success : callback
		};
		$.ajax(param);
	}

	// 첫 페이지에서 popular Deck을 가져오기
	getPopularDecks(callback) {
		var param = {
				type : "get",
				url : this.url+"popular/decks?max=3",
				headers : {
					auth: this.apiKey
				},
				dataType : this.dataType,
				success : callback
		};
		$.ajax(param);
	}
	
	// 플레이어 랭크 불러오기
	getPlayerRank(callback) {
		var param = {
				type : "get",
				url: this.url+"top/players",
				headers: {
					auth : this.apiKey
				},
				dataType : this.dataType,
				success : callback
		};
		$.ajax(param);
	}
	
	// clan 랭크 불러오기
	getClanRank(callback) {
		var param = {
				type: "get",
				url : this.url+"top/clans",
				headers : {
					auth : this.apiKey
				},
				dataType : this.dataType,
				success : callback
		};
		$.ajax(param);
	}

	getPlayerRankTop5(callback) {
		var param = {
				type : "get",
				url: this.url+"top/players?max=5",
				headers: {
					auth : this.apiKey
				},
				dataType : this.dataType,
				success : callback
		};
		$.ajax(param);
	}

	getClanRankTop5(callback) {
		var param = {
				type: "get",
				url : this.url+"top/clans?max=5",
				headers : {
					auth : this.apiKey
				},
				dataType : this.dataType,
				success : callback
		};
		$.ajax(param);
	}
	
}