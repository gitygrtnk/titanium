// ===============================================
// ローカルDB処理共通ファイル
// ===============================================

// ===============================================
// 設定オブジェクト
// ===============================================
if (Ti.App.MYLIB && !Ti.App.MYLIB.ConfigDAO) {
	Ti.App.MYLIB.ConfigDAO = function(genre, food, keyword, lat, lng){
		this.key = null;
		this.genre = genre;
		this.food = food;
		this.keyword = keyword;
		this.lat = lat;
		this.lng = lng;
	};
}

// ===============================================
// DBオブジェクト
// ===============================================
if (Ti.App.MYLIB && !Ti.App.MYLIB.configDb) {
	var ConfigDb = function() {
		// ===============================================
		// DB情報
		// ===============================================
	    this.dbName = 'configdb';
	    this.tableName = 'config';
	    this.tableKey = '001';
	    
		// ===============================================
		// DBオープン
		// ===============================================
	    this.open = function () {
	        this.db = Ti.Database.open(this.dbName);
	    };
	
		// ===============================================
		// DBクローズ
		// ===============================================
	    this.close = function () {
	        this.db.close();
	    };
	
		// ===============================================
		// 初期化
		// ===============================================
	    this.init = function () {
		    this.open();
		    // テーブル作成
		    this.db.execute('CREATE TABLE IF NOT EXISTS ' + this.tableName + ' (key TEXT, genre TEXT, food TEXT, keyword TEXT, lat TEXT, lng TEXT)');
		    this.close();
	    };
		
		// ===============================================
		// 設定取得(select) ※内部用(DBオープン・クローズ無し)
		// ===============================================
		this.p_getConfig = function() {
		    var config = null;
		    //this.open();
		    var rows = this.db.execute(
		    	'SELECT * FROM ' + this.tableName + ' WHERE key = ?',
		    	this.tableKey
		    );
		    if (rows.getRowCount() > 0) {
		    	var res = [];
		        while (rows.isValidRow()) {
		            var config = new Ti.App.MYLIB.ConfigDAO();
		            config.key = rows.fieldByName('key');
		            config.genre = rows.fieldByName('genre');
		            config.keyword = rows.fieldByName('keyword');
		            config.food = rows.fieldByName('food');
		            config.lat = rows.fieldByName('lat');
		            config.lng = rows.fieldByName('lng');
		            res.push(config);
		            rows.next();
		        }
		        config = res[0];
		    }
		    rows.close();
		    //this.close();
		    return config;
		};
	
		// ===============================================
		// 設定保存(insert) ※内部用(DBオープン・クローズ無し)
		// ===============================================
	    this.p_insertConfig = function (config) {
	        //this.open();
	        config.key = this.tableKey;
	        var res = this.db.execute(
	            'INSERT INTO ' + this.tableName + ' (key,genre,keyword,food,lat,lng) VALUES(?,?,?,?,?,?)',
	            config.key,
	            config.genre,
	            config.keyword,
	            config.food,
	            config.lat,
	            config.lng
	        );
	    	//this.close();
	        return res;
	    };
		
		// ===============================================
		// 設定保存(update) ※内部用(DBオープン・クローズ無し)
		// ===============================================
		this.p_updateConfig = function (config) {
		    //this.open();
	        config.key = this.tableKey;
		    var res = this.db.execute(
		        'UPDATE ' + this.tableName + ' SET genre = ?, keyword = ?, food = ?, lat = ?, lng = ? WHERE key = ?',
		        config.genre,
		        config.keyword,
		        config.food,
		        config.lat,
		        config.lng,
		        config.key
		    );
		    //this.close();
		    return res;
		};
		
		// ===============================================
		// 設定取得
		// ===============================================
		this.getConfig = function() {
			this.open();
			var res = this.p_getConfig();
			this.close();
		    return res;
		};
		
		// ===============================================
		// 設定保存
		// ===============================================
		this.setConfig = function (config) {
		    this.open();
		    var currentConfig = this.p_getConfig();
		    var res;
		    if (!currentConfig) {
		    	res = this.p_insertConfig(config);
		    }
		    else {
		    	res = this.p_updateConfig(config);
		    }
		    this.close();
		    return res;
		};
		
		this.init();
	};
	
	Ti.App.MYLIB.configDb = new ConfigDb();
}
