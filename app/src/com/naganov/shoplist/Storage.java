package com.naganov.shoplist;

import android.content.Context;
import android.content.SharedPreferences;

public class Storage
{
  Context mContext;
  public static final String PREFS_NAME = "Shoplist";
  public static final String STATE_NAME = "State";

  Storage(Context c)
  {
    mContext = c;
  }
  
  public String load()
  {
    SharedPreferences settings = mContext.getSharedPreferences(PREFS_NAME, 0);
    return settings.getString(STATE_NAME, "");
  }

  public void save(String state)
  {
    SharedPreferences settings = mContext.getSharedPreferences(PREFS_NAME, 0);
    SharedPreferences.Editor editor = settings.edit();
    editor.putString(STATE_NAME, state);
    editor.commit();
  }
}
