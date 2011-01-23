var Mode = {
  HOME: 1,
  SHOP: 2,
  current: 1
};

var kClassChosen = "chosen";
var kClassBuy = "buy";
var kClassGrayed = "grayed";

function documentClick(event)
{
  var element = event.target;
  if (!element)
    return;
  if (element.hasStyleClass("item"))
    itemClicked(element);
  if (element.constructor === HTMLInputElement)
    radioClicked(element);
}

function itemClicked(element)
{
  if (Mode.current === Mode.HOME) {
    if (element.hasStyleClass(kClassChosen))
      element.removeStyleClass(kClassChosen);
    else
      element.addStyleClass(kClassChosen);
  }
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
  }
}

function loadItems(items)
{
  var result = document.createDocumentFragment();
  for (var i = 0, l = items.length; i < l; ++i) {
    var item = document.createElement("div");
    item.textContent = items[i];
    item.className = "item";
    result.appendChild(item);
  }
  return result;
}

function displayItemsFragmentInList(list, fragment)
{
  list.appendChild(fragment.cloneNode(true));
}

function onLoad()
{
  displayItemsFragmentInList(
    document.getElementById("list"),
    loadItems(items));
  document.onclick = documentClick;
  document.getElementById("home-switch").checked = true;
}

function switchToShopMode(list)
{
  Mode.current = Mode.SHOP;
  for (var node = list.firstChild; node; node = node.nextSibling) {
    if (node.hasStyleClass(kClassChosen)) {
      node.removeStyleClass(kClassChosen);
      node.addStyleClass(kClassBuy);
    } else
      node.addStyleClass(kClassGrayed);
  }
}
