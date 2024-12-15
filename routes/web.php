<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/job/create', function () {
    return Inertia::render('CreateJob');
})->middleware(['auth', 'verified'])->name('create-job');

Route::get('/job/my/application', function () {
    return Inertia::render('AppliedJobsList');
})->middleware(['auth', 'verified'])->name('application');

Route::get('/job/my/posts', function () {
    return Inertia::render('MyJobs');
})->middleware(['auth', 'verified'])->name('my-job');

Route::get('/job/my/posts/details', function () {
    return Inertia::render('JobApplications');
})->middleware(['auth', 'verified'])->name('jobapplications');

Route::get('/job/update/{id}', function () {
    return Inertia::render('UpdateJob');
})->middleware(['auth', 'verified'])->name('update-job');


require __DIR__ . '/auth.php';
