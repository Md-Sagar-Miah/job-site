<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\UserJobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/jobs', JobController::class);
Route::apiResource('/aplication', ApplicationController::class);
Route::get('/jobs/user/{user_id}', [UserJobController::class, 'userJobs']);
Route::get('/jobs/user/{user_id}/{job_id}', [UserJobController::class, 'userJobsDetails']);
