<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class TriviaController extends Controller
{
    //
    public function index(){
        if (View::exists('trivia')) {
            return View::make('trivia');
        }
        return 'Sorry';
    }
}
