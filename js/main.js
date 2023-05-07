/**
 * オプションの情報を取得関数
 * @returns {array} optionArray
 */
function getOption() {
  // フォームの値を取得
  var text = document.getElementById("text").value;
  var color = document.getElementById("color").value;
  var size = document.getElementById("size").value;
  var link = document.getElementById("link").value;
  var target = document.getElementById("target").value;
  var border = document.getElementById("border").value;
  var shadow = document.getElementById("shadow").value;
  var radius = document.getElementById("radius").value;
  var bold = document.getElementById("bold").value;

  // sizeの値によってボタンのサイズを変更
  if (size === "small") {
    var width = 100;
    var height = 30;
  } else if (size === "medium") {
    var width = 150;
    var height = 40;
  } else if (size === "large") {
    var width = 200;
    var height = 50;
  }else {
    var width = 150;
    var height = 40;
  }

  // 配列に格納
  var optionArray = [];
  optionArray.text = text;
  optionArray.color = color;
  optionArray.width = width;
  optionArray.height = height;
  optionArray.link = link;
  optionArray.target = target;
  optionArray.border = border;
  optionArray.shadow = shadow;
  optionArray.radius = radius;
  optionArray.bold = bold;

  return optionArray;
}

// ボタン生成の関数
function createButton() {
  var button = document.createElement("button");

  // すでにボタンが生成されている場合は削除
  var buttonArea = document.getElementById("button_area");
  buttonArea.textContent = "";

  var option = getOption();

  // 既存のスタイルを削除
  button.removeAttribute("style");
  button.removeAttribute("class");

  // optionArrayの中身をボタンに反映
  button.textContent = option.text;
  // textがからの場合
  if (option.text === "") {
    button.textContent = "ボタン";
  }
  button.style.color = option.color;
  button.style.width = option.width + "px";
  button.style.height = option.height + "px";
  button.style.border = option.border;
  button.style.boxShadow = option.shadow;
  button.style.borderRadius = option.radius + "px";
  button.style.fontWeight = option.bold;

  // 複数のクラスを追加
  button.classList.add("button");
  button.addEventListener("click", function () {
    alert("ボタンが押されました！");
  });
  // ボタン表示エリアにボタンを追加
  var buttonArea = document.getElementById("button_area");
  buttonArea.appendChild(button);

  // 生成されたボタンのCSSコードを取得
  getButtonCSS();
}

// 生成されたボタンのCSSコードを取得する関数
function getButtonCSS() {
  var button = document.querySelector("#button_area button");
  var cssCode = window.getComputedStyle(button);
  var cssCodeArray = [];
  cssCodeArray.width = cssCode.width;
  cssCodeArray.height = cssCode.height;
  cssCodeArray.margin = cssCode.margin;
  cssCodeArray.padding = cssCode.padding;
  cssCodeArray.border = cssCode.border;
  cssCodeArray.backgroundColor = cssCode.backgroundColor;
  cssCodeArray.color = cssCode.color;
  cssCodeArray.fontSize = cssCode.fontSize;
  cssCodeArray.fontWeight = cssCode.fontWeight;
  cssCodeArray.borderRadius = cssCode.borderRadius;
  cssCodeArray.boxShadow = cssCode.boxShadow;

  // コード表示エリアにCSSコードを表示
  var codeArea = document.getElementById("code_area");

  // cssCodeArrayの中身をコード表示エリアに表示
  codeArea.textContent = "";
  for (var key in cssCodeArray) {
    // keyとvalueをpタグで表示
    var p = document.createElement("p");
    p.classList.add("mb-0");
    p.textContent = toKebabCase(key) + ": " + cssCodeArray[key] + ";";
    codeArea.appendChild(p);
  }
}

/**
 * ケバブケースに変換する関数
 * @param {string} str
 * @returns {string}
 */
function toKebabCase(str) {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}

/**
 *codeAreaの中身をコピーする関数
 */
function copyCode() {
  var codeArea = document.getElementById("code_area");
  var range = document.createRange();
  range.selectNodeContents(codeArea);
  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
  selection.removeAllRanges();

  alert("コピーしました！");
}
