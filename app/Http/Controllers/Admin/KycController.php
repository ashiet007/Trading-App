<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\KycsDataTable;
use App\Http\Controllers\Controller;
use App\Models\Kyc;
use Illuminate\Http\Request;
use Throwable;

class KycController extends Controller
{
    public function index(KycsDataTable $dataTable)
    {
        return $dataTable->render('admin.kycs.index');
    }

    public function show(Kyc $kyc)
    {
        return view("admin.kycs.view", compact('kyc'));
    }

    public function update(Request $request, $id)
    {
        try {
            $requestData = $request->only('status', 'remark');
            $kyc = Kyc::findOrFail($id);
            $kyc->update($requestData);
            return redirect()->back()->with('success', 'Data updated successfully');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', 'Something went wrong');
        }
    }
}
