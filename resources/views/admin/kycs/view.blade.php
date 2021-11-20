@extends("layouts.backend")

@section("content")
<div class="animated fadeIn">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <strong class="card-title">Kyc Detail #{{$kyc->id}}</strong>
                </div>
                <div class="card-body">
                    @include("partials.alerts")
                    <table id="bootstrap-data-table" class="table table-striped table-bordered">
                        <tr>
                            <th>Name</th>
                            <td>{{$kyc->first_name." ".$kyc->middle_name." ".$kyc->last_name}}</td>
                        </tr>
                        <tr>
                            <th>Date of Birth</th>
                            <td>{{\Carbon\Carbon::parse($kyc->birth_date)->format('d/m/Y')}}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>{{$kyc->address}}</td>
                        </tr>
                        <tr>
                            <th>City</th>
                            <td>{{$kyc->city}}</td>
                        </tr>
                        <tr>
                            <th>State</th>
                            <td>{{$kyc->state}}</td>
                        </tr>
                        <tr>
                            <th>Country</th>
                            <td>{{$kyc->country_name}}</td>
                        </tr>
                        <tr>
                            <th>KYC Type</th>
                            <td>{{$kyc->kyc_type}}</td>
                        </tr>
                        <tr>
                            <th>PAN Number</th>
                            <td>{{$kyc->pan_number}}</td>
                        </tr>
                        <tr>
                            <th>PAN Image</th>
                            <td><img src="{{url('/').'/storage/kyc-images/'.$kyc->pan_file}}" width="100"/></td>
                        </tr>
                        <tr>
                            <th>Document Type</th>
                            <td>{{$kyc->document_type}}</td>
                        </tr>
                        <tr>
                            <th>Document Number</th>
                            <td>{{$kyc->document_number}}</td>
                        </tr>
                        <tr>
                            <th>Document Front Image</th>
                            <td><img src="{{url('/').'/storage/kyc-images/'.$kyc->front_image}}" width="100"/></td>
                        </tr>
                        <tr>
                            <th>Document Back Image</th>
                            <td><img src="{{url('/').'/storage/kyc-images/'.$kyc->back_image}}" width="100"/></td>
                        </tr>
                        <tr>
                            <th>Document Selfie Image</th>
                            <td><img src="{{url('/').'/storage/kyc-images/'.$kyc->selfie_image}}" width="100"/></td>
                        </tr>

                        <tr>
                            <th>Submitted At</th>
                            <td>{{$kyc->created_at->format('D, d M Y')}}</td>
                        </tr>
                    </table>

                    <form class="col-md-8" method="post" action="{{route("kycs.update",$kyc->id)}}" id="user-form">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label for="status" class=" form-control-label">Status</label>
                           <select name="status" class="form-control">
                            <option value="PENDING" {{$kyc->status == "PENDING"?"selected":""}}>PENDING</option>
                            <option value="APPROVED" {{$kyc->status == "APPROVED"?"selected":""}}>APPROVED</option>
                            <option value="DECLINED" {{$kyc->status == "DECLINED"?"selected":""}}>DECLINED</option>
                           </select>
                        </div>
                        <div class="form-group">
                            <label for="remark" class=" form-control-label">Remark</label>
                            <textarea name="remark" class="form-control" id="" cols="30" rows="10"></textarea>
                        </div>
                        <button type="submit" class="btn btn-success">Update</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div><!-- .animated -->
@endsection

@section("scripts")
@endsection
