<?php

class Api_Devices_Controller extends Base_Controller {

  public $restful = true;
  public function post_checkin(){
   $checkin = Input::json();


   $newcheckin = new Checkin();
   $currentDevice = Device::where('uuid', '=', $checkin->device->uuid)->first();
   if (!$currentDevice)
   {
            //Create a new one :)
     $newdevice = new Device($checkin->device);
     $newdevice->save();
     $newcheckin->device = $newdevice->id;
   }
   else
   {
    $newcheckin->device = $currentDevice->id;
  }

  if (isset($checkin->from)){
   $newcheckin->from = User::where('username', '=', $checkin->from->username)->first()->id;
 }
  $newcheckin->to = User::where('username', '=', $checkin->to->username)->first()->id;
 $newcheckin->location = $checkin->location->office;
 $newcheckin->save();
 $response =  array('success' => true ,
  'id'=>$newcheckin->id,
  'date' =>  $newcheckin->created_at);
 return Response::json($response);
}

public function post_create($device)
{
  if (!$device) {
    $input = file_get_contents("php://input");
    $input =json_decode($input,true);
  }
  else {
   $input = array();
   $input['device'] =json_decode($device,true);
 }
 $newdevice = new Device($input["device"]);
 $newdevice->save();

 $response =  array('success' => true, 'id' =>$newdevice->id);
 return Response::json($response);
}



}