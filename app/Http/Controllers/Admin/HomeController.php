<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Show Dashboard
     */
    public function dashboard()
    {
        return view("admin.dasboard");
    }
}
