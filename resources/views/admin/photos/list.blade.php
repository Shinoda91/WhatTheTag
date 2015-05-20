@extends('app')

@section('header_assets')
<link rel="stylesheet" href="//cdn.datatables.net/1.10.7/css/jquery.dataTables.min.css" />
<style type="text/css">
#photos-table > tbody > tr > td { 
    vertical-align: middle;
}

#myModal {
	background: rgba(0, 0, 0, 0.75);
}
</style>
@stop

@section('content')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default">
			<div class="panel-heading clearfix">
						
				<div class="pull-left"><h5>List Photos</h5></div>
				<div class="pull-right"><a class="btn btn-default" href="{{ url('/photo/new') }}">New Photo</a></div>
				
			</div>
				
				<div class="panel-body">
				
					@include('partials.messages')
					
					<table id="photos-table" class="table table-condensed">
						<thead>
							<tr>
								<th>Id</th>
								<th>Image</th>
								<th>Title</th>
								<th>User Name</th>
								<th>Created At</th>
								<th>Updated At</th>
								<th>Action</th>
							</tr>
						</thead>
					</table>
					
				</div>
			</div>
		</div>
	</div>
</div>


{{-- Modal --}}
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalTitle">Modal title</h4>
			</div>
			<div class="modal-body">
				<img src=""class="img-responsive">
			</div>
			<div class="modal-footer">
				<div class="row">
					<div class="col-md-8">
						<span id="modalTagWrapper" class="pull-left"></span>
					</div>
					
					<div class="col-md-4">
						<a id="modalDownloadBtn" role="button" href="" class="btn btn-default" target="_blank">Download</a>
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
{{-- /Modal --}}


@endsection

@section('footer_assets')
<script type="text/javascript" src="//cdn.datatables.net/1.10.7/js/jquery.dataTables.min.js"></script>
<script type="text/javascript">
$('#photos-table').DataTable({
	processing: true,
	serverSide: true,
	ajax: '{{ url('admin/photos/grid') }}',
	columns: [
		{data: 'id', name: 'id'},
		{data: 'image', name: 'image', orderable: false, searchable: false},
		{data: 'title', name: 'title'},
		{data: 'user_name', name: 'user_name'},
		{data: 'created_at', name: 'created_at'},
		{data: 'updated_at', name: 'updated_at'},
		{data: 'action', name: 'action', orderable: false, searchable: false}
	],
	fnInitComplete: function() {
		{{-- Fixes input and select box's styles according to bootstrap 3 --}}
		$('.dataTables_filter input').addClass('form-control').css({display:'inline-block', width:'152px'});
		$('.dataTables_length select').addClass('form-control').css({display:'inline-block', width:'60px'});
	}
});
$(document).on('click', '.delete-button', function(){
	return confirm('Are you sure you want to delete this photo?');
});


{{-- Modal-related --}}
$(document).on('click', 'a[data-toggle="modal"]', function() {
	$('#myModal #myModalTitle').text($(this).attr('data-img-title'));
	$('#myModal img').attr('src', $(this).attr('data-img-url'));
	$('#myModal #modalDownloadBtn').attr('href', $(this).attr('data-img-url'));
});
{{-- /Modal-related --}}

</script>
@endsection