function loadItems(items)
{
  var result = document.createDocumentFragment();
  for (var i = 0, l = items.length; i < l; ++i) {
    var item = document.createElement("div");
    item.textContent = items[i];
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
}
