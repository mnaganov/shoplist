var Mode = {
  HOME: 1,
  SHOP: 2,
  current: 1
};

function documentClick(event)
{
  var element = event.target;
  if (!element || !element.hasStyleClass("item"))
    return;
  var clss = "chosen";
  if (Mode.current === Mode.HOME) {
    if (element.hasStyleClass(clss))
      element.removeStyleClass(clss);
    else
      element.addStyleClass(clss);
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
}
