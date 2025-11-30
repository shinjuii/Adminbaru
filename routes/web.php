<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| 1. LOGIN PAGE DEFAULT
|--------------------------------------------------------------------------
*/

// Ketika buka localhost, arahkan ke halaman React login
Route::get('/', function () {
    return redirect('/LoginBaru');
});

// Halaman login (masuk ke React)
Route::get('/LoginBaru', function () {
    return view('react-main');
})->name('LoginBaru');


/*
|--------------------------------------------------------------------------
| 2. REACT FRONTEND ROUTES (SPA)
|--------------------------------------------------------------------------
*/

// Semua route selain /LoginBaru dilempar ke React
Route::get('/{any}', function () {
    return view('react-main');
})->where('any', '.*');


/*
|--------------------------------------------------------------------------
| 3. API ROUTES (BACKEND ONLY)
|--------------------------------------------------------------------------
| Taruh API REST di route/api.php, tidak di sini
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| 4. OPTIONAL: TOKEN / UTILITAS KECIL
|--------------------------------------------------------------------------
*/

// Untuk ambil CSRF token dari frontend
Route::get('/csrf-token', fn() => response()->json([
    'csrf_token' => csrf_token()
]));
