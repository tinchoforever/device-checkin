<?php
require_once('controller.base.unittest.php');

class TestCheckin extends ControllerTestCase {



    public $from = null;
    public $to = null;
    public $device = null;

	/**
	 * Test that a given condition is met.
	 *
	 * @return void
	 */
	public function test_must_execute_checkin_with_existent_device()
	{
        $this->before();
        $parameters= array('device' =>  array(
            'uid' => $this->device->attributes["uid"],
            "platform" =>  "iOS",
            "version" =>  "6",
            "name" =>  "iPhone 5",
            "model" =>  "undefined"),
        'from' => $this->from->attributes["username"],
        'to' =>  $this->to->attributes["username"],
        'location' => "1572.1.1"
        );
        Request::$foundation->setMethod('POST');
        $response = Controller::call('api.devices@checkin', $parameters );
        $response = json_decode($response);
        $this->assertTrue($response->success);
        $saved = Checkin::find($response->id);
        $this->assertEquals($this->from->id, $saved->from);
        $this->after();
    }
    /**
     * Test that a given condition is met.
     *
     * @return void
     */
    public function test_must_execute_checkin_with_new_device()
    {
       $this->from = new User(
        array(
            'fullname' => "Martin Rabaglia",
            'username'=>'martinr'.rand()));
       $this->from ->save();
       $this->to = new User(
        array(
            'fullname' => "Bruno Lazzaro",
            'username'=>'brunol'.rand()));
       $this->to->save();

       $parameters= array('device' =>  array(
        'uid' => "UUIDe0101010d38bde8e6740011221af335301010333".rand(),
        "platform" =>  "iOS",
        "version" =>  "6",
        "name" =>  "iPhone 5",
        "model" =>  "undefined",
        ),
       'from' => $this->from->username,
       'to' =>  $this->to->username,
       'location' => "1572"
       );

        Request::$foundation->setMethod('POST');
       $response = Controller::call('api.devices@checkin', $parameters );
       $response = json_decode($response);
       $this->assertTrue($response->success);
       $saved = Checkin::find($response->id);
       $this->assertEquals($this->from->id, $saved->from);
       $this->from->delete();
       $this->to->delete();

   }

   public function before() {
    $this->from = new User(
        array(
            'fullname' => "Martin Rabaglia",
            'username'=>'martinr'.rand()));
    $this->from ->save();
    $this->to = new User(
        array(
            'fullname' => "Bruno Lazzaro",
            'username'=>'brunol'.rand()));
    $this->to->save();
    $this->device = new Device(
        array(
            'uid' => "UUIDe0101010d38bde8e6740011221af335301010333".rand()));
    $this->device->save();
}

public function after()
{
 $this->from->delete();
 $this->to->delete();
 $this->device->delete();
}

}