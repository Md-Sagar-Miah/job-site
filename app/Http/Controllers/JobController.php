<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Js;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobs = Job::all();
        return response()->json($jobs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // Validate the request
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'salary' => 'required|numeric|min:0', // Ensure salary is a positive number or zero
            'company_name' => 'required|string|max:255',
        ]);


        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);  // HTTP Status Code 422 Unprocessable Entity
        }

        $user = User::where('email', $request->email)->first();
        $user_id = (int)$user->id;
        $formatedSalary = number_format((float)$request->salary, 2, '.', '');


        if ($user_id) {
            $job = Job::create([
                'title' => $request->title,
                'description' => $request->description,
                'location' => $request->location,
                'salary' => $formatedSalary,
                'company_name' => $request->company_name,
                'user_id' => $user_id, // Assuming the employer is authenticated
            ]);

            // Return the newly created job
            return response()->json([
                'message' => 'Job created successfully!',
                'job' => $job,
            ], 201);  // HTTP Status Code 201 Created
        } else {
            return response()->json([
                'message' => 'Not Athorized!',
            ], 401);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {

        $job = Job::find($id);

        return response()->json([
            $job
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $job = Job::where('id', $id)->first();

        // Check if the job exists
        if (!$job) {
            return response()->json([
                'message' => 'Job not found.'
            ], 404); // HTTP Status Code 404 Not Found
        }

        // Check if the authenticated user owns the job
        $user_id = request()->user_id;


        if ($job->user_id !== $user_id) {
            return response()->json([
                $id,
                $user_id,
                'message' => 'You are not authorized to update this job.'
            ], 403); // HTTP Status Code 403 Forbidden
        }

        // Validate the request
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'salary' => 'required|numeric|min:0', // Ensure salary is a positive number or zero
            'company_name' => 'required|string|max:255',
        ]);


        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422); // HTTP Status Code 422 Unprocessable Entity
        }

        // Update the job with validated data
        $job->update([
            'title' => $request->title,
            'description' => $request->description,
            'location' => $request->location,
            'salary' => number_format((float)$request->salary, 2, '.', ''),
            'company_name' => $request->company_name,
        ]);

        return response()->json([
            'message' => 'Job updated successfully!',
            'job' => $job,
        ], 200); // HTTP Status Code 200 OK

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id, Request $request)
    {

        $job = Job::where('id', $id)->first();

        // Check if the job exists
        if (!$job) {
            return response()->json([
                'message' => 'Job not found.'
            ], 404); // HTTP Status Code 404 Not Found
        }
        $user_id = $request->user_id;


        if ($job->user_id !== $user_id) {
            return response()->json([
                'message' => 'You are not authorized to delete this job.'
            ], 403); // HTTP Status Code 403 Forbidden
        }

        // Delete the job
        $job->delete();

        return response()->json([
            'message' => 'Job deleted successfully!'
        ], 200); // HTTP Status Code 200 OK


    }
}
