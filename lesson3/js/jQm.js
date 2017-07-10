/**
 * 
 */
window.addEventListener('tizenhwkey', function onTizenHwKey(e) {
	if (e.keyName === 'back') {
		history.back();
	}
});

// Vibration

function singleVibration() {
	/* Vibrate for 2 seconds */
	navigator.vibrate(2000);
}

function patternVibration() {
	/* Vibrate in a given pattern: 1 sec on, 1 sec off, 2 sec on, 2 sec off */
	navigator.vibrate([ 1000, 1000, 2000, 2000, 1000 ]);
}

function stopVibration() {
	navigator.vibrate(0);
}

// bluetooth
var adapter = null;
var CHECK_INTERVAL = 500;

(function checkBT() {
	function init(){
	try {
		if (tizen.bluetooth === undefined) {
			throw new ReferenceError('tizen.bluetooth is not available');
		}
		adapter = tizen.bluetooth.getDefaultAdapter();
		window.setInterval(sliderBT, CHECK_INTERVAL);
	} catch (error) {

		var message = 'Problem with Bluetooth. '
				+ 'Application can\'t work properly: ' + error.message;
		window.alert(message);
		tizen.application.getCurrentApplication().exit();
	}
	};
	
	function sliderBT() {
		if (adapter.powered) {
			$("#BluetoothSlider").val("on").slider('refresh');
		} else {
			$("#BluetoothSlider").val("off").slider('refresh');
		}
		};
		
		init();
	
}());

function BTpowerOn() {
    if (!adapter.powered) {
        try {
            operationInProgress = true;
            adapter.setPowered(true,
                function onAdapterPowerOnSuccess() {

                         },
                function onAdapterPowerOnError() {

                }
            );
        } catch (error) {
alert(error);

        }
    } else {
    	alert("adapter powered");
    }
};


function BTpowerOff() {
    if (adapter.powered) {
        operationInProgress = true;
        adapter.setPowered(
            false,
            function onAdapterPowerOffSuccess() {

            },
            function onAdapterPowerOffError() {

            }
        );
    } else {

    }
};


function App_exit() {
    try {
        tizen.application.getCurrentApplication().exit();
    } catch (error) {
        console.error(error);
    }
};


function onOffBT() {
        	if ($("#BluetoothSlider").val() == "on") {
        		BTpowerOn();
    			
    		} else {
    			BTpowerOff();
    			
    		};
        };
        


