// <?php
// require_once('controller.base.unittest.php');

// class TestCheckin extends ControllerTestCase {



//     public $from = null;
//     public $to = null;
//     public $device = null;

// 	/**
// 	 * Test that a given condition is met.
// 	 *
// 	 * @return void
// 	 */
// 	public function test_must_execute_checkin()
// 	{
//         $this->before();
//         $parameters= array('uid' => $this->device->uid,
//             'from' => $this->from->username,
//             'to' =>  $this->to->username
//             );
//         $response = $this->post('api.devices@checkin', $parameters );

//         $response = json_decode($response);
//         $this->assertTrue($response->success);
//         $saved = Checkin::find($response->id);
//         $this->assertEquals($this->from->id, $saved->from);
//         $this->after();
//     }

//     public function before() {
//         $this->from = new User(
//             array(
//                 'fullname' => "Martin Rabaglia",
//                 'username'=>'martinr'.rand()));
//         $this->from ->save();
//         $this->to = new User(
//             array(
//                 'fullname' => "Bruno Lazzaro",
//                 'username'=>'brunol'.rand()));
//         $this->to->save();
//         $this->device = new Device(
//             array(
//                 'uid' => "UUIDe0101010d38bde8e6740011221af335301010333".rand()));
//         $this->device->save();
//     }

//     public function after()
//     {
//        $this->from->delete();
//        $this->to->delete();
//        $this->device->delete();
//    }

// }