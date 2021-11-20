<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\UsersDataTable;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use JsValidator;
use Illuminate\Support\Facades\Validator;
use Throwable;

class UserController extends Controller
{
    public function index(UsersDataTable $dataTable)
    {
        return $dataTable->render('admin.users.index');
    }

    public function show(User $user)
    {
        return view("admin.users.view", compact('user'));
    }

    public function create()
    {
        $validator = JsValidator::make([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed',
        ]);
        return view("admin.users.create", compact('validator'));
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed',
        ]);

        if ($validation->fails()) {
            return redirect()->back()->withErrors($validation->errors());
        }
        try {
            $requestData = $request->only('name', 'email', 'password');
            $requestData['password'] = Hash::make($requestData['password']);
            User::create($requestData);
            return redirect()->route("users.index")->with('success', 'Data added successfully');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', 'Something went wrong');
        }
    }

    public function edit(User $user)
    {
        $validator = JsValidator::make([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,'  . $user->id,
        ]);
        return view("admin.users.edit", compact('validator', 'user'));
    }

    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);

        if ($validation->fails()) {
            return redirect()->back()->withErrors($validation->errors());
        }
        try {
            $requestData = $request->only('name', 'email');
            if (!is_null($request->password)) {
                $requestData['password'] = Hash::make($requestData['password']);
            }
            $user = User::findOrFail($id);
            $user->update($requestData);
            return redirect()->route("users.index")->with('success', 'Data updated successfully');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', 'Something went wrong');
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return redirect()->route("users.index")->with('success', 'Data deleted successfully');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', 'Something went wrong');
        }
    }
	/* public function planHistory()
    {
         $plan_history = UserPlan::where('id',1)->first();
		  return view("admin.users.plan", compact('plan_history'));
		// echo "<pre>";print_r($plan_history->user);die('222');
		 
    } */
}
