package com.example.myapplication.ui.screens.mainScreen

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.runtime.*
import com.example.myapplication.ui.screens.login.LoginScreen
import com.example.myapplication.ui.screens.login.LoginViewModel
import com.example.myapplication.ui.screens.navigation.AppNavGraph
val loginModel = LoginViewModel()

class MainActivity : ComponentActivity() {
        val mainVm by viewModels<MainViewModel>()
        @SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
        @OptIn(ExperimentalMaterial3Api::class)
        override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            var isLoggedIn by remember { mutableStateOf(false) }

            if (isLoggedIn) {
                AppNavGraph()
            } else {
               LoginScreen { username, password ->
                loginModel.LoginAttempt(username,password, onLoginSuccess = { isLoggedIn = true})
                }
            }


            }
        }
}

