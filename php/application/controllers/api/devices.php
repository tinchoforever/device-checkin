<?php

class Api_Devices_Controller extends Base_Controller {

   public $restful = true;
   public function get_checkin($uid,$from,$to){

    $checkin = new Checkin();
    //TODO:VALIDATE

    $checkin->device = Device::where('uid', '=', $uid)->first()->id;
    $checkin->from = User::where('username', '=', $from)->first()->id;
    $checkin->to = User::where('username', '=', $to)->first()->id;
    $checkin->save();
    $response =  array('success' => true ,
        'id'=>$checkin->id,
        'date' =>  $checkin->created_at);
    return Response::json($response);
}



}