var Mode = {
  HOME: 1,
  SHOP: 2,
  current: 1
};

var kClassChosen = "chosen";
var kClassBought = "bought";
var kClassGrayed = "grayed";
var kClassItem = "item";
var kClassOptionSelected = "option-selected";

function documentClick(event)
{
  var element = event.target;
  if (!element)
    return;
  if (element.hasStyleClass(kClassItem))
    itemClicked(element);
  if (element.constructor === HTMLInputElement)
    radioClicked(element);
  if (element.previousSibling.constructor === HTMLInputElement) {
    element.previousSibling.checked = true;
    radioClicked(element.previousSibling);
  }
}

function itemClicked(element)
{
  if (Mode.current === Mode.HOME) {
    if (element.hasStyleClass(kClassChosen))
      element.removeStyleClass(kClassChosen);
    else
      element.addStyleClass(kClassChosen);
  } else {
    if (element.hasStyleClass(kClassGrayed))
      return;
    if (element.hasStyleClass(kClassBought))
      element.removeStyleClass(kClassBought);
    else
      element.addStyleClass(kClassBought);
  }
  saveState(document.getElementById("list"));
}

function radioClicked(element)
{
  var newMode = document.getElementById("home-switch").checked ? Mode.HOME : Mode.SHOP;
  if (Mode.current !== newMode) {
    var list = document.getElementById("list");
    if (newMode === Mode.HOME)
      switchToHomeMode(list);
    else
      switchToShopMode(list);
    saveState(list);
  }
}

function loadItems(items)
{
  var result = document.createDocumentFragment();
  for (var i = 0, l = items.length; i < l; ++i) {
    if (items[i]) {
      var item = document.createElement("div");
      item.textContent = items[i];
      item.className = kClassItem;
      result.appendChild(item);
    } else {
      var separator = document.createElement("hr");
      result.appendChild(separator);
    }
  }
  return result;
}

function displayItemsFragmentInList(list, fragment)
{
  list.appendChild(fragment.cloneNode(true));
}

function loadState(list)
{
  if (!("Storage" in this))
    return false;
  var state = String.prototype.split.call(Storage.load(), ":");
  if (state[0] == Mode.HOME) {
    document.getElementById("home-switch").checked = true;
    switchToHomeMode(list);
  } else if (state[0] == Mode.SHOP) {
    document.getElementById("shop-switch").checked = true;
    switchToShopMode(list);
  } else
    return false;
  for (var node = list.firstChild, i = 1, l = state.length; node && (i < l); node = node.nextSibling) {    
    if (node.hasStyleClass(kClassItem)) {
      node.className = state[i++];
    }
  }
  return true;
}

function onLoad()
{
  displayItemsFragmentInList(
    document.getElementById("list"),
    loadItems(items));
  document.onclick = documentClick;
  if (!loadState(document.getElementById("list"))) {
    document.getElementById("home-switch").checked = true;
    document.getElementById("home-label").addStyleClass(kClassOptionSelected);
  }
}

function saveState(list)
{
  if (!("Storage" in this))
    return;
  var state = [];
  state.push(Mode.current);
  for (var node = list.firstChild; node; node = node.nextSibling) {    
    if (node.hasStyleClass(kClassItem))
      state.push(node.className);
  }
  Storage.save(state.join(":"));
}

function switchToShopMode(list)
{
  Mode.current = Mode.SHOP;
  document.getElementById("home-label").removeStyleClass(kClassOptionSelected);
  document.getElementById("shop-label").addStyleClass(kClassOptionSelected);
  for (var node = list.firstChild; node; node = node.nextSibling) {
    if (node.hasStyleClass(kClassChosen))
      node.removeStyleClass(kClassChosen);
    else
      node.addStyleClass(kClassGrayed);
  }
}

function switchToHomeMode(list)
{
  Mode.current = Mode.HOME;
  document.getElementById("home-label").addStyleClass(kClassOptionSelected);
  document.getElementById("shop-label").removeStyleClass(kClassOptionSelected);
  for (var node = list.firstChild; node; node = node.nextSibling) {
    if (node.hasStyleClass(kClassGrayed))
      node.removeStyleClass(kClassGrayed);
    else
      node.addStyleClass(kClassChosen);
  }
}

