<?php

class TestCheckin extends PHPUnit_Framework_TestCase {



    public $from = null;
    public $to = null;
    public $device = null;

	/**
	 * Test that a given condition is met.
	 *
	 * @return void
	 */
	public function test_must_execute_checkin()
	{

        $this->before();
        $parameters= array('uid' => "UUIDe0101010d38bde8e6740011221af335301010333",
            'from' => $this->from->fullname,
            'to' =>  $this->to->username
            );
		$response = Controller::call('api.devices@checkin', $parameters);
        $this->assertEquals("aaaaaa",$response->content);
        $this->after();
	}

   public function before() {
        $this->from = new User(
            array(
                'fullname' => "Martin Rabaglia",
                'username'=>'martinr'));
        $this->from ->save();
        $this->to = new User(
            array(
                'fullname' => "Bruno Lazzaro",
                'username'=>'brunol'));
        $this->to->save();
        $this->device = new Device(
            array(
                'uid' => "UUIDe0101010d38bde8e6740011221af335301010333"));
        $this->device->save();
    }

    public function after()
    {
         $this->from->delete();
         $this->to->delete();
         $this->device->delete();
    }

}