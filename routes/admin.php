<?php

use App\Http\Controllers\Admin\AdminController as AdminAdminController;
use App\Http\Controllers\Admin\DealsController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\KycController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::get('login', [LoginController::class, 'getLogin'])->name('adminLogin');
Route::post('login', [LoginController::class, 'postLogin'])->name('adminLoginPost');

Route::group(['middleware' => 'adminauth'], function () {

    Route::get('logout', [LoginController::class, 'logout'])->name('adminLogout');

    // Admin Dashboard
    Route::get('dashboard', [HomeController::class, 'dashboard'])->name('dashboard');

    /**
     * Users routes
     */
    Route::resource('users', UserController::class);

    /**
     * Kyc routes
     */
    Route::resource('kycs', KycController::class);

    /**
     * Users routes
     */
    Route::resource('orders', OrderController::class);

    Route::get('bulk-users-upload', [UserController::class, 'showBulkUploadForm'])->name('userBulkUploadForm');
    Route::post('bulk-users-upload', [UserController::class, 'bulkImport'])->name('bulkUpload');

    Route::get('deals/bulk-trade-upload', [DealsController::class, 'showDealsBulkUploadForm'])->name('tradeBulkUploadForm');
    Route::post('deals/bulk-trade-upload', [DealsController::class, 'bulkDealsImport'])->name('bulkUploadTrade');
});
