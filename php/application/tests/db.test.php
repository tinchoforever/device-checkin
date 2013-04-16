// <?php

// class TestModels extends PHPUnit_Framework_TestCase {

// 	/**
// 	 * Test that a given condition is met.
// 	 *
// 	 * @return void
// 	 */
// 	public function test_save_device()
// 	{
//         $device = new Device(
//             array(
//                 'uid' => "UUIDe0101010d38bde8e6740011221af335301010333"));
//         $this->assertNotNull($device);
//         $device->save();
//         $this->assertNotNull($device->id);
//         $device->delete();
//         $saved = Device::find($device->id);
//         $this->assertNull($saved);
//         $device->delete();
//     }

//     public function test_save_user()
//     {
//         $user = new User(
//             array(
//                 'fullname' => "Martin Rabaglia",
//                 'username'=>'martinr'));
//         $this->assertNotNull($user);
//         $user->save();
//         $this->assertNotNull($user->id);
//         $user->delete();
//         $saved = User::find($user->id);
//         $this->assertNull($saved);
//         $user->delete();
//     }


//     public function test_checkin_user()
//     {
//         $from = new User(
//             array(
//                 'fullname' => "Martin Rabaglia",
//                 'username'=>'martinr'));
//         $from->save();

//         $to = new User(
//             array(
//                 'fullname' => "Bruno Lazzaro",
//                 'username'=>'brunol'));
//         $to->save();
//         $device = new Device(
//             array(
//                 'uid' => "UUIDe0101010d38bde8e6740011221af335301010333"));
//         $device->save();


//         $checkin = new Checkin( array(
//             'to' => $to->id,
//             'from'=> $from->id));
//         $checkin->device = $device->id;
//         $checkin->save();
//         $saved = Checkin::find($checkin->id);

//         $this->assertNotNull($saved);
//         $from->delete();
//         $to->delete();
//         $device->delete();
//     }


// }