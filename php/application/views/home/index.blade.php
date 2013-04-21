@layout('layouts.admin')
@section('scripts')
@endsection

@section('styles')
@endsection
@section('content')

<div class="content app ng-scope">
	@if (count($devices) == 0 )
	<h1> There are no checkins <small> :-( </small></h1>
	<h2> Why don't you try to go to a devices a install the app? </h2>
	@else
		@foreach ($devices as $device)
        <hr/>
		      <h3> {{ $device->name }} </h3>
              <h4> {{ $device->platform }} {{ $device->version }} </h4>
              <h6> {{ $device->uuid }} </h6>
              <h6> {{ $device->created_at }} </h6>

		@endforeach
        <hr/>
	@endif
</div>

<script src="/js/app/main.js"></script>

@endsection
