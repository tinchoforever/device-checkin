<?php

class Api_Locations_Controller extends Base_Controller {

  public $restful = true;
  public function get_all($office = 'Buenos Aires'){
    $office = urldecode($office);
    $users = User::distinct()
    ->where('region', "=", $office)
    ->order_by('office', 'asc')
    ->get(array('office'));
    $response = array();
    foreach ($users as $key => $value) {
     $response[] = $value->to_array();
   }
   return Response::json($response);
 }

}