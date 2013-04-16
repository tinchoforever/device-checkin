<?php

class TestCheckin extends PHPUnit_Framework_TestCase {

	/**
	 * Test that a given condition is met.
	 *
	 * @return void
	 */
	public function testSomethingIsTrue()
	{

        $parameters= array('uid' => "UUIDe0101010d38bde8e6740011221af335301010333",
            'who' => 'martinr'
            );
		$response = Controller::call('api.devices@checkin', $parameters);
        $this->assertNotNull($response);
	}

}