<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Models\Application;
use Illuminate\Http\Request;
use APP\Models\Job;
use App\Models\User;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json([
            'message' => 'This route is not implemented yet.',
        ], 200); // HTTP Status Code 501 Not Implemented
        // Fetch applications along with related job details
        // $applications = Application::with('job')->where('user_id', $user_id)->get();

        // // Return the applications with job details as JSON
        // return response()->json($applications);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'job_id' => 'required|numeric|exists:jobs,id',
            'user_id' => 'required|numeric|exists:users,id',
            'cover_letter' => 'required|string',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }


        // Check if the user has already applied for the job
        $existingApplication = Application::where([
            ['job_id', $request->job_id],
            ['user_id', $request->user_id],
        ])->exists();

        if ($existingApplication) {
            return response()->json([
                'message' => 'User has already applied for this job.',
            ], 409); // HTTP Status Code 409 Conflict
        }

        // Create a new application
        $application = Application::create($request->only(['job_id', 'user_id', 'cover_letter']));

        return response()->json([
            'message' => 'Application successfully submitted.',
            'application' => $application,
        ], 201); // HTTP Status Code 201 Created
    }


    /**
     * Display the specified resource.
     */
    public function show($user_id)
    {
        // Fetch applications along with related job details
        $id = (int)$user_id;
        $applications = Application::where('user_id', $id)
            ->with('job') // Eager load the 'job' relationship
            ->get();

        // Return the applications with job details as JSON
        return response()->json($applications);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Application $application)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Application $application)
    {
        //
    }
}
