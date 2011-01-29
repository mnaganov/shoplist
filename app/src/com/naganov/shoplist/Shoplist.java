package com.naganov.shoplist;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MenuInflater;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class Shoplist extends Activity
{
  private Storage mStorage;
  
  /** Called when the activity is first created. */
  @Override
  public void onCreate(Bundle savedInstanceState)
  {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.main);
    WebView myWebView = (WebView) findViewById(R.id.webview);
    WebSettings webSettings = myWebView.getSettings();
    webSettings.setJavaScriptEnabled(true);
    myWebView.setWebChromeClient(new WebChromeClient() {
        public boolean onConsoleMessage(ConsoleMessage cm) {
          Log.d("Shoplist", cm.message() + " -- From line "
                + cm.lineNumber() + " of "
                + cm.sourceId());
          return true;
        }
      });
    mStorage = new Storage(this);
    myWebView.addJavascriptInterface(mStorage, "Storage");
    myWebView.clearCache(true);
    myWebView.loadUrl("http://192.168.1.103/~mnaganov/shoplist/shoplist.html");
  }

  @Override
  public boolean onCreateOptionsMenu(Menu menu) {
    MenuInflater inflater = getMenuInflater();
    inflater.inflate(R.menu.menu, menu);
    return true;
  }
  
  @Override
  public boolean onOptionsItemSelected(MenuItem item) {
    // Handle item selection
    switch (item.getItemId()) {
      case R.id.reset:
        mStorage.save("");
        // Fall through
      case R.id.reload:
        WebView myWebView = (WebView) findViewById(R.id.webview);
        myWebView.clearCache(true);
        myWebView.reload();
        return true;
      default:
        return super.onOptionsItemSelected(item);
    }
  }  
}
