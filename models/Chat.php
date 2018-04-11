<?php

class Chat {
	
	const MODULE = "chat";

	//used in initJs.php for the modules definition
	public static function getConfig(){
		return array(
			"module"   		=> self::MODULE,
			"init"   		=> Yii::app()->getModule( self::MODULE )->assetsUrl."/js/init.js" ,
			"form"   		=> Yii::app()->getModule( self::MODULE )->assetsUrl."/js/dynForm.js" ,
            
		);
	}
}