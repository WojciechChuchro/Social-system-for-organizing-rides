package com.example.myapplication.data.repository

import kotlin.random.Random

class Repository {

    fun fetchData(): Int{//data from database
        //ODBIERAM DANE
        return Random.nextInt(0,100)
    }
}