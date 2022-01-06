<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\BackdatedReport;
use App\Models\Deal;
use App\Models\Kyc;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Throwable;
use PDF;

class UserController extends Controller
{
    public function profile()
    {
        $user = auth()->user();
        if ($user) {
            return response()->json([
                'user' => $user
            ], 200);
        } else {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }
    }

    public function submitKyc(Request $request)
    {
        $this->validate($request, [
            'kyc_type' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'birth_date' => 'required',
            'address' => 'required',
            'country_name' => 'required',
            'state' => 'required',
            'city' => 'required',
            'zip_code' => 'required',
            'pan_number' => 'required|confirmed',
            'pan_file' => 'required',
            'document_type' => 'required',
            'document_number' => 'required|confirmed',
            'front_image' => 'required',
            'back_image' => 'required',
            'selfie_image' => 'required',
        ], [
            'kyc_type' => 'KYC Type is required',
            'first_name' => 'First name is required',
            'last_name' => 'Last name is required',
            'birth_date' => 'Date of birth is required',
            'address' => 'Address is required',
            'country_name' => 'Country name is required',
            'state' => 'State is required',
            'city' => 'City name is required',
            'zip_code' => 'Zip code is required',
            'pan_number' => [
                'required' => 'PAN number is required',
                'confirmed' => 'PAN number confirmation is did not match'
            ],
            'pan_file' => 'PAN image is required',
            'document_type' => 'Document Type is required',
            'document_number' => [
                'required' => 'Document number is required',
                'confirmed' => 'ocument number confirmation is did not match'
            ],
            'front_image' => 'Documnet front image is required',
            'back_image' => 'Documnet back image is required',
            'selfie_image' => 'Selfie image with document is required',
        ]);
        try {
            $pan_image = $this->storeImage($request, 'pan_file');
            $front_image = $this->storeImage($request, 'front_image');
            $back_image = $this->storeImage($request, 'back_image');
            $selfie_image = $this->storeImage($request, 'selfie_image');
            $requestData = $request->except('pan_number_confirmation', 'document_number_confirmation');
            $requestData['pan_file'] = $pan_image;
            $requestData['front_image'] = $front_image;
            $requestData['back_image'] = $back_image;
            $requestData['selfie_image'] = $selfie_image;
            $requestData['user_id'] = auth()->user()->id;
            $kyc = Kyc::create($requestData);
            return response()->json([
                'kyc' => $request->all()
            ], 201);
        } catch (Throwable $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function storeImage($request, $name)
    {
        $image = $request->input($name); // your base64 encoded
        $imageType = $this->getImageType($image);
        $image = str_replace('data:image/' . $imageType . ';base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = Str::random(10) . '.' . $imageType;
        $imagePath = 'public/kyc-images/' . $imageName;
        Storage::put($imagePath, base64_decode($image));
        return $imageName;
    }

    public function getImageType($image)
    {
        $pos  = strpos($image, ';');
        $imageType = explode(':', substr($image, 0, $pos))[1];
        $type = explode('/', $imageType);
        return $type[1];
    }

    public function wallet()
    {
        $walletTotal = auth('api')->user()->wallet;
        return response()->json([
            'amount' => $walletTotal
        ], 200);
    }

    public function backdatedReports()
    {
        $reports = Deal::with('stock')->where('user_id', 0)->orderBy('created_at', 'desc')->get();
        return response()->json([
            'reports' => $reports
        ], 200);
    }

    public function downloadReport(Request $request)
    {
        try {
            $startDate = Carbon::parse($request->start_date)->format('Y-m-d');
            $endDate = Carbon::parse($request->end_date)->format('Y-m-d');
            $reports = Deal::where('user_id', 0)
                ->whereDate('created_at', '>=', $startDate)
                ->whereDate('created_at', '<=', $endDate)
                ->orderBy('created_at', 'desc')
                ->get();
            $pdfName = 'Report' . time() . '.pdf';
            $kyc = Kyc::where('user_id', auth()->user()->id)->first();
            $data = [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'reports' => $reports,
                'kyc' => $kyc,
                'startDate' => $startDate,
                'endDate' => $endDate
            ];
            if ($request->report_type == 'trade') {
                $pdf = PDF::loadView('report', $data);
            } else {
                $pdf = PDF::loadView('pnl-report', $data);
            }
            $pdf->save('reports/' . $pdfName);
            return response()->json([
                'file_url' => url('/') . '/reports/' . $pdfName
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
