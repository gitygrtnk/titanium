// ===============================================
// 設定画面 ページオブジェクト
// ===============================================
var pageObjects = {
	// ===============================================
	// ビュー(ページ全体)
	// ===============================================
	view : function() {
		return Ti.UI.createView({
			top    : 5,
			layout : 'vertical',
		});
	},
	// ===============================================
	// ラベル
	// ===============================================
	label : function(text) {
		return Ti.UI.createLabel({
			top    : 5,
			left   : 15,
			width  : 120,
			height : 60,
			color  : '#000000',
			font   : { fontSize : 20 },
			text   : text
		});
	},
	// ===============================================
	// リストボックスの行オブジェクト
	// ===============================================
	pickerRow : function(title, custom_item) {
		return Ti.UI.createPickerRow({
			title       : title,
			custom_item : custom_item,
			font        : { fontSize : 20 }
		});
	},
	// ===============================================
	// リストボックス
	// items = [{ keyName : 値, keyItem : 値}, … ]形式
	// ===============================================
	picker : function() {
		var picker = Ti.UI.createPicker({
			top    : -60,
			left   : 160,
			width  : 300,
			height : 60,
			font   : { fontSize : 20 }
		});
		// 関数追加(リスト項目の設定)
		picker.setListItems = function(items, keyName, keyItem) {
			// 列オブジェクトの生成
			var column = Ti.UI.createPickerColumn();
			// 列オブジェクトに行オブジェクトを追加
			column.addRow(pageObjects.pickerRow('指定しない', ''));
			for (var i = 0; i < items.length; i++) {
				column.addRow(pageObjects.pickerRow(items[i][keyName], items[i][keyItem]));
			}
			// リストボックスに列オブジェクトを追加
			picker.add(column);
		};
		// 関数追加(指定した項目を選択)
		picker.selectRowValue = function(custom_item) {
			var rows = picker.columns[0].rows;
			for (var i = 0; i < rows.length; i++) {
				if (rows[i].custom_item === custom_item) {
					picker.setSelectedRow(0, i);
					return i;
				}
			}
		};
		return picker;
	},
	// ===============================================
	// 入力ボックス
	// ===============================================
	textField : function() {
		return Ti.UI.createTextField({
			top    : -60,
			left   : 160,
			width  : 300,
			height : 60,
			font   : { fontSize : 20 }
		});
	},
	// ===============================================
	// ボタン
	// ===============================================
	button : function(title, clickEvent) {
		var button = Ti.UI.createButton({
			top    : 10,
			left   : 140,
			width  : 200,
			height : 60,
			font   : { fontSize : 20 },
			title  : title
		});
		if (clickEvent) {
			button.addEventListener('click', clickEvent);
		}
		return button;
	}
}
