<?php

class Device_Change_Uid_To_Uuid {

	/**
	 * Make changes to the database.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('devices', function($table)
		{
			$table->string('uuid')->unique;
			$table->drop_column('uid');
		});
	}

	/**
	 * Revert the changes to the database.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}