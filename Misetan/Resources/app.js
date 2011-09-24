// ===============================================
// Tiアプリの実行開始ファイル
// ===============================================
Ti.include('lib/common.js');
Ti.include('lib/configdb.js');

// ===============================================
// タブグループ
// ===============================================
Ti.UI.setBackgroundColor('#ffffff');
var tabGroup = Ti.UI.createTabGroup();

// ===============================================
// 検索タブ
// ===============================================
var winSearch = Ti.UI.createWindow({  
    url : 'view/search.js',
    backgroundColor : '#f0f0f0'
});
var tabSearch = Ti.UI.createTab({
    title  : '検索',
    window : winSearch
});

// ===============================================
// 設定タブ
// ===============================================
var winConfig = Ti.UI.createWindow({  
    url : 'view/config.js',
    backgroundColor : '#f0f0f0'
});
var tabConfig = Ti.UI.createTab({
    title  : '設定',
    window : winConfig
}); 

// ===============================================
// タブオープン
// ===============================================
tabGroup.addTab(tabSearch);
tabGroup.addTab(tabConfig);
tabGroup.open();
