@extends("layouts.backend")

@section("content")
<div class="animated fadeIn">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <strong class="card-title">Bulk Upload</strong>
                </div>
                <div class="card-body">
                    @include("partials.alerts")
                    <form class="col-md-8" method="post" action="{{route("bulkUploadTrade")}}" id="user-upload-form" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group">
                            <label for="file" class=" form-control-label">File(xlsx)</label>
                            <input type="file" name="file" id="file" class="form-control">
                        </div>
                        <button type="submit" class="btn btn-lg btn-info btn-block">
                                Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div><!-- .animated -->
@endsection

@section("scripts")
@endsection
