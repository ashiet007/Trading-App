<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\DealController;
use App\Http\Controllers\API\HomeController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\PolygonController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [AuthController::class, 'login'])->name('api.login');
Route::post('register', [AuthController::class, 'register'])->name('api.register');

/**
 * Home page routes
 */
Route::get('order-books', [HomeController::class, 'orderBooks'])->name("api.orderBooks");
Route::get('trade-history', [HomeController::class, 'tradeHistory'])->name("api.tradeHistory");
Route::get('symbol-informations', [HomeController::class, 'symbolInformation']);
Route::get('ticker-data', [HomeController::class, 'tickerData']);
Route::get('tickers', [HomeController::class, 'tickers']);

//Polygon routes
Route::get('polygon-stocks', [PolygonController::class, 'getAllStocks']);
Route::get('polygon-forex', [PolygonController::class, 'getAllForexes']);
Route::get('cryptocurrencies', [PolygonController::class, 'getAllCryptocurrencies']);
Route::get('market-status', [PolygonController::class, 'marketStatus']);
Route::get('last-quotes', [PolygonController::class, 'lastQuotes']);
Route::get('last-forex-quotes', [PolygonController::class, 'lastForexQuotes']);

Route::middleware('auth:api')->group(function () {
    Route::post('check-authentication', function () {

        if (auth()->check()) {
            return response()->json([
                'message' => 'Authenticated',
                'user' => auth()->user()
            ], 200);
        } else {
            return response()->json([
                'message' => 'Unauthenticated',
                'user' => auth()->user()
            ], 401);
        }
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [UserController::class, 'profile']);
    Route::get('/wallet', [UserController::class, 'wallet']);
    Route::post('/kyc-verification', [UserController::class, 'submitKyc']);
    Route::get('/backdated-reports', [UserController::class, 'backdatedReports']);
    Route::get('download-report', [UserController::class, 'downloadReport']);

    //Order Routes
    Route::get('/get-currency-price', [OrderController::class, 'getCurrencyPrice']);
    Route::post('/create-order', [OrderController::class, 'createOrder']);
    Route::get('get-orders', [OrderController::class, 'getOrders']);

    //Deal Routes
    Route::get('all-deals', [DealController::class, 'getAllDeals']);
    Route::post('open-deal', [DealController::class, 'saveDeal']);
    Route::post('close-deal', [DealController::class, 'closeDeal']);
});
