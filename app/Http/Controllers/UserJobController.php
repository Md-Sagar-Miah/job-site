<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Job;


class UserJobController extends Controller
{
    public function userJobs($email)
    {
        $user = User::where('email', $email)->first();
        $user_id = (int)$user->id;
        $jobs = Job::where('user_id', $user_id)->get();
        return response()->json($jobs);
    }

    public function userJobsDetails($user_id, $job_id)
    {
        $job = Job::where('user_id', $user_id)
            ->where('id', $job_id)
            ->with(['applications.user']) // Eager load applications
            ->first();

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        return response()->json($job);
    }
}
