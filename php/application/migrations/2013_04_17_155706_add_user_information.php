<?php

class Add_User_Information {

	/**
	 * Make changes to the database.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('users', function($table)
		{
			$table->string('phone');
			$table->string('region');
			$table->string('office');
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