package com.qrscannerjsd;

import android.os.Bundle;
import android.content.Intent;

import androidx.appcompat.app.AppCompatActivity;

import com.qrscannerjsd.MainActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstatnceState){
        super.onCreate(savedInstatnceState);

        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}
