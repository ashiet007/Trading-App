<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Imports\DealImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class DealsController extends Controller
{
    public function showDealsBulkUploadForm()
    {
        return view("admin.deals.bulk-upload");
    }

    public function bulkDealsImport(Request $request)
    {
        $file = $request->file;
        Excel::import(new DealImport, $file);
        return redirect()->back()->with('success', 'File imported successfully');
    }
}
