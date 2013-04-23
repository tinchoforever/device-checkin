<?php

class Api_Devices_Controller extends Base_Controller {

    public $restful = true;
    public function post_checkin($device,$from,$to){

        $checkin = new Checkin();
        $currentDevice = Device::where('uid', '=', $device["uid"])->first();
        if (!$currentDevice)
        {
            //Create a new one :)
         $newdevice = new Device($device);
         $newdevice->save();
         $checkin->device = $newdevice->id;
        }
        else
        {
            $checkin->device = $currentDevice->id;
        }


     $checkin->from = User::where('username', '=', $from)->first()->id;
     $checkin->to = User::where('username', '=', $to)->first()->id;
     $checkin->save();
     $response =  array('success' => true ,
        'id'=>$checkin->id,
        'date' =>  $checkin->created_at);
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