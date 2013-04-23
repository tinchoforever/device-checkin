<?php

require_once('controller.base.unittest.php');

class TestDevice extends ControllerTestCase {



/**
	 * Test that a given condition is met.
	 *
	 * @return void
	 */
public function test_must_create_device()
{
    $jsondevice=json_encode(
        array(
            'uuid' => "UUIDe0101010d38bde8e6740011221af335301010333".rand(),
            "version" =>  "6",
            "name" =>  "iPhone 5",
            "model" =>  "undefined",
            ));

    $parameters= array('device' => $jsondevice);

    Request::$foundation->setMethod('POST');
    $response = Controller::call('api.devices@create', $parameters);
    $response = json_decode($response);

    $this->assertTrue($response->success);
    $saved = Device::find($response->id);
    $saved->delete();
    $this->assertNull(Device::find($response->id));
}
}
