let timerText = '00-03-00';
let autostart = false;
let direction = 'yoko';
let reverse = false;

let colArray = [];
colArray[0] = '#00ffaa';
let colBg = '#000050';

let linkText = '';
let interval = 0;
let colText = '';
let setting_on = false;
let timerTime = 180*100;
let restTime = timerTime;
let colDeg = '90deg';
let bgColDeg = '90deg';
let pause = false;

let paramArray;
let urlParam;

let restPct;
let firstPct = 0;
let maxPct = 100;


// ページが開かれたときの処理
window.onload = function(){
	firstAction();
}

function firstAction(){

	// 設定初期化
	settingReset();

	// 色表示反映
	setColor();

	if(autostart == true){
		click_button_1();
	}
}

// 設定ボタン押下後の処理
function click_button_setting(){
	if(setting_on == false){
		setting_on = true;
		document.getElementById('settings').style.visibility = 'visible';
		document.getElementById('button_setting').style.background = '#777777';
		document.getElementById('button_setting').style.color = '#dddddd';

	} else{
		setting_on = false;
		document.getElementById('settings').style.visibility = 'hidden';
		document.getElementById('button_setting').style.background = '#dddddd';
		document.getElementById('button_setting').style.color = '#333333';
	}
}

// スタート・一時停止ボタン押下後の処理
function click_button_1(){
	let button_1 = document.getElementById('button_1');
	if(button_1.textContent == 'Start'){
		button_1.textContent = 'Pause';
		button_1.className = 'pause';

		if(pause == false){
			interval = setInterval(countdown,10);
			restTime = timerTime;
		}else {
			// 途中から再開（時間をリセットせず再開）
			interval = setInterval(countdown,10);
			pause = false;
		}
	} else{
		button_1.textContent = 'Start';
		button_1.className = 'start';
		
		clearInterval(interval);
		pause = true;
	}
}

function click_button_reset(){
	if(interval>0){
		clearInterval(interval);
	}
	restTime = timerTime;
	setColor();

	let button_1 = document.getElementById('button_1');
	button_1.textContent = 'Start';
	button_1.className = 'start';
	pause = false;
}

// 設定初期化
function settingReset(){
	//Urlパラメータ取得
	urlParam = location.search.substring(1);
	console.log(urlParam);
	if(urlParam.length > 0) {
		paramArray = urlParam.split('&');	// 「&」が含まれている場合は「&」で分割
		console.log(paramArray);
		//配列にパラメータを格納
		for (i = 0; i < paramArray.length; i++) {
			let paramItem = paramArray[i].split('=');
			if(paramItem[0]=="time"){
				timerText = paramItem[1];
			}
			if(paramItem[0]=="autostart"){
				if(paramItem[1] == "true"){
					autostart = true;
				}
				else{
					autostart = false
				}
			}
			if(paramItem[0]=="direction"){
				direction = paramItem[1];
			}
			if(paramItem[0]=="reverse"){
				if(paramItem[1] == "true"){
					reverse = true;
				}
				else{
					reverse = false;
				}
			}
			if(paramItem[0].match(/^col\d{1,2}$/)){
				let tmpNo = Number(paramItem[0].replace(/col/,''));
				colArray[tmpNo-1] =  '#' + paramItem[1];
			}
			if(paramItem[0]=="colBg"){
				colBg = '#' + paramItem[1];
			}
		}
	}

	// 各設定項目に値反映

	if(urlParam.length>0 && timerText.length>0){
		console.log("timer")
		// timerText = hh-mm-ss
		timerText = timerText.replace(/\-/g,':');
		// timerText = hh:mm:ss
		console.log(timerText)
		document.getElementById('time').value = timerText;
	} else {
		document.getElementById('time').value = '00:03:00';
	}
	if(urlParam.length>0 && autostart == true){
		document.getElementById('autostart').checked = true;
	}
	else {
		document.getElementById('autostart').checked = false;
	}
	if(urlParam.length>0 && direction == 'tate'){
		document.getElementById('directionH').checked = false;
		document.getElementById('directionV').checked = true;
	}
	else {
		document.getElementById('directionV').checked = false;
		document.getElementById('directionH').checked = true;
	}
	if(urlParam.length>0 && reverse == true){
		document.getElementById('reverse').checked = true;
	}
	else {
		document.getElementById('reverse').checked = false;
	}

	if(urlParam.length>0){
		for(i=0;i<11;i++){
			if(colArray.length>i){
				if(colArray[i].length == 7){
					document.getElementById('col' + (i+1) + 'Valid').checked = true;
					document.getElementById('col' + (i+1)).value = colArray[i];
				}
				else if(i==0){
					document.getElementById('col' + (i+1) + 'Valid').checked = true;
					document.getElementById('col' + (i+1)).value = '#00ffaa';
				}
				else {
					document.getElementById('col' + (i+1) + 'Valid').checked = false;
					document.getElementById('col' + (i+1)).value = '#ffffff';
				}
			}
			else{
				break;
			}
		}
	}

	if(urlParam.length>0 && colBg.length == 7){
		document.getElementById('colBg').value = colBg;
	}
	else{
		document.getElementById('colBg').value = '#000050';
	}

	getLinkText();
}

// 背景色の処理
function setColor(){
	if(direction == 'tate'){
		colDeg = '0deg'
		if(reverse == true){
			bgColDeg = '180deg'
		}else{
			bgColDeg = '0deg';
		}
	} else{
		colDeg = '270deg'
		if(reverse == true){
			bgColDeg = '270deg'
		}else{
			bgColDeg = '90deg'
		}
	}

	console.log(colArray);
	console.log(colArray.length);

	if(colArray.length == 0){
		colText = '#00ffaa';
	} else if(colArray.length == 1 || colArray[1].length==0){
		colText = colArray[0];
	} else {
		colText = 'linear-gradient(' + colDeg;
		let tmpCount = 0;
		for(i=0;i<11;i++){
			if(colArray.length>i){
				if(colArray[i].length==7){
					tmpCount = tmpCount + 1;
				}else{
					break;
				}
			}
			else{
				break;
			}
		}
		let tmpIncrements = maxPct / tmpCount;	
		let tmpPct = firstPct;

		for(i=0;i<11;i++){
			if(colArray.length>i){
				if(colArray[i].length==7){
					colText = colText + ', ' + colArray[i] + ' ' + tmpPct + '%';
					if(i+1==tmpCount){
						colText = colText + ')';
						break;
					}
					else if(i+2==tmpCount){
						tmpPct = maxPct;
					}
					else{
						tmpPct = tmpPct + tmpIncrements;
					}
				}
			}
			else{
				break;
			}
		}
		console.log(colText);
	}

	restPct = maxPct-(1-(restTime/timerTime))*maxPct;
	document.body.style.background = 'linear-gradient(' + bgColDeg + ', rgba(255,255,255,0) ' + firstPct + '%, rgba(255,255,255,0) ' + restPct + '%, ' + colBg +' ' + restPct + '%, ' + colBg +' ' + maxPct + '%), ' + colText;

}

// 設定値取得
function getSetting(){
	for(i=0;i<11;i++){
		if(document.getElementById('col'+(i+1)+'Valid').checked == true){
			colArray[i] = document.getElementById('col'+(i+1)).value;
		}
		else{
			colArray[i] = '';
		}
	}
	colBg = document.getElementById('colBg').value;

	timerText = document.getElementById('time').value;
	let tmpTimeArray = timerText.split(':');
	
	timerTime = (Number(tmpTimeArray[0])*60*60 + Number(tmpTimeArray[1])*60 + Number(tmpTimeArray[2]))*100;

	autostart = document.getElementById('autostart').checked;
	if(document.getElementById('directionV').checked == true){
		direction = 'tate';
	}
	else{
		direction = 'yoko';
	}

	reverse = document.getElementById('reverse').checked;

	setColor();
}

function getLinkText(){
	linkText = location.href;
	linkText = linkText.replace(location.search,'');
	linkText = linkText.replace(location.hash,'');

	getSetting();

	console.log(linkText);

	linkText = linkText + '?';

	linkText = linkText + 'time=' + timerText.replace(/:/g,'-') + '&';

	if(autostart == true){
		linkText = linkText + 'autostart=true&';
	}
	if(direction == 'tate'){
		linkText = linkText + 'direction=tate&';
	}
	if(reverse == true){
		linkText = linkText + 'reverse=true&';
	}
	for(i=0;i<11;i++){
		if(colArray.length>=i+1){
			if(colArray[i].length==7){
				linkText = linkText + 'col'+(i+1)+'='+colArray[i].replace('#','')+'&'
			}
			else{
				break;
			}
		}
		else{
			break;
		}
	}
	linkText = linkText + 'colBg=' + colBg.replace('#','');
	console.log(linkText);

	document.getElementById('link_text').value = linkText;

}

function copyLink(){
	if(navigator.clipboard==false){
		console.log('非対応のブラウザです。');
	}
	else{
		navigator.clipboard.writeText(document.getElementById('link_text').value);
		document.getElementById('link_text').select();
	}
}


// カウントダウン処理
function countdown(){
	setColor();
	if(restTime > 0){
		restTime = restTime-1;
	} else {
		pause = false;
		clearInterval(interval);
		interval = 0;
	}
}