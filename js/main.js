/**
 * オプションの情報を取得関数
 * @returns {array} optionArray
 */
function getOption() {
  // フォームの値を取得
  var text = document.getElementById("text").value;
  var backgroundColor = document.getElementById("background_color").value;
  var color = document.getElementById("color").value;
  var size = document.getElementById("size").value;
  var borderWidth = document.getElementById("border_width").value;
  var borderType = document.getElementById("border_type").value;
  var borderColor = document.getElementById("border_color").value;
  var shadow = document.getElementById("shadow").checked;
  var radius = document.getElementById("radius").checked;
  var bold = document.getElementById("bold").checked;
  var italic = document.getElementById("italic").checked;

  // sizeの値によってボタンのサイズを変更
  var sizeOption = setSize(size);

  // 配列に格納
  var optionArray = [];
  optionArray.text = text;
  optionArray.backgroundColor = backgroundColor;
  optionArray.color = color;
  optionArray.width = sizeOption.width;
  optionArray.height = sizeOption.height;
  optionArray.borderWidth = borderWidth;
  optionArray.borderType = borderType;
  optionArray.borderColor = borderColor;
  optionArray.shadow = setShadow(shadow);
  optionArray.radius = setRadius(radius);
  optionArray.bold = setBold(bold);
  optionArray.italic = setItalic(italic);

  return optionArray;
}

/**
 * 横幅と高さの値を設定する関数
 * @returns {array} sizeArray
 */
function setSize(size) {
  var sizeArray = [];
  if (size === "small") {
    sizeArray.width = 100;
    sizeArray.height = 30;
  } else if (size === "medium") {
    sizeArray.width = 150;
    sizeArray.height = 40;
  } else if (size === "large") {
    sizeArray.width = 200;
    sizeArray.height = 50;
  } else {
    sizeArray.width = 150;
    sizeArray.height = 40;
  }
  return sizeArray;
}

/**
 * 影を設定する関数
 * @param {boolean} shadow
 * @returns {string} shadowValue
 */
function setShadow(shadow) {
  var shadowValue = "";
  if (shadow === true) {
    shadowValue = "3px 4px 4px rgba(0, 0, 0, 0.3)";
  } else {
    shadowValue = "none";
  }
  return shadowValue;
}

/**
 * border-radiusを設定する関数
 * @param {boolean} radius
 * @returns {string} radiusValue
 * */
function setRadius(radius) {
  var radiusValue = "";
  if (radius === true) {
    radiusValue = "5px";
  } else {
    radiusValue = "0px";
  }
  return radiusValue;
}

/**
 * ふと文字を設定する関数
 * @param {boolean} bold
 * @returns {string} boldValue
 * */
function setBold(bold) {
  var boldValue = "";
  if (bold === true) {
    boldValue = "bold";
  } else {
    boldValue = "normal";
  }
  return boldValue;
}

/**
 * font-styleを設定する関数
 * @param {boolean} italic
 * @returns {string} italicValue
 * */
function setItalic(italic) {
  var italicValue = "";
  if (italic === true) {
    italicValue = "italic";
  } else {
    italicValue = "normal";
  }
  return italicValue;
}

/**
 * ボタン生成の関数
 */
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

  console.log(option.radius);
  button.style.backgroundColor = option.backgroundColor;
  button.style.color = option.color;
  button.style.width = option.width + "px";
  button.style.height = option.height + "px";
  button.style.border =
    option.borderWidth + "px " + option.borderType + " " + option.borderColor;
  button.style.boxShadow = option.shadow;
  button.style.borderRadius = option.radius;
  button.style.fontWeight = option.bold;
  button.style.fontStyle = option.italic;

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
  cssCodeArray.fontStyle = cssCode.fontStyle;

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
