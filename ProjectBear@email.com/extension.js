const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Gio = imports.gi.Gio;
const Lang = imports.lang;
const Util = imports.misc.util;
const GLib = imports.gi.GLib;
const Me = imports.misc.extensionUtils.getCurrentExtension();
//let image_show = false; //corrected
let COLOR_WHITE = true;
let queryText = null;
let bearDbusService = null;
let micon = null;
let replyPopup,replyText,icon;
let corner = [];
var textr = " How to use Bear can be found in the webpage.";
let gicon=Gio.icon_new_for_string(Me.path + "/icons/5.png");
let gicon1=Gio.icon_new_for_string(Me.path + "/icons/6.png");
//let _imageBin = null;
let icon = null;

function colorChange() {
    if (COLOR_WHITE == true){
	micon.set_gicon(gicon1);
	COLOR_WHITE = false;
	
    }
    else{
	micon.set_gicon(gicon);
	COLOR_WHITE = true;
    }
}

function callBear(){
    
    if (COLOR_WHITE == true){
	queryText.text = "Listening.....     ";
	queryText.add_style_class_name('panels-text');
	Util.spawnCommandLine("Bear");
    }
    colorChange();
}

function _hidePopup() {
    
    Main.uiGroup.remove_actor(replyPopup);
    Main.uiGroup.remove_actor(icon);
    Main.uiGroup.remove_actor(opaque);
    
}

function toggleOverview( node ) {
    
	if ( true ) {
	    Tweener.addTween(node.ui, {
		opacity: 255,
		time: 3,
		//transition: 'easeOutQuad',
		onComplete: function () {
		    Tweener.addTween( node.ui, {
					opacity: 0,
			time: 3,
			//transition: 'easeOutQuad'
		    } );
		}
	    } );
	}
	
    _showPopup();    	
}
 

const queryInPanelIface = '<node> \
<interface name="com.bear.queryInPanel"> \
<method name="setText"> \
<arg type="s" direction="in" /> \
<arg type="i" direction="in" />\
<arg type="s" direction="in" /> \
</method> \
<method name="changeColor"> \
</method> \
</interface> \
</node>';

const queryInPanel = new Lang.Class({
    Name: 'queryInPanel',
    
    _init: function() {
	queryText.text = "Hello....   ";
	
        this._dbusImpl = Gio.DBusExportedObject.wrapJSObject(queryInPanelIface, this);
        this._dbusImpl.export(Gio.DBus.session, '/com/bear/queryInPanel');
    },

    setText: function(string,val,str) {
	// Display as pop up
	if(val == 0 ){
		textr = string;
		//image_show = false;
	}
	if (val == 1){
	// Display as panel notification
	    queryText.text = string;
	    queryText.add_style_class_name('panels-text');
	    //image_show = false;
	}
	// Displays as pop up. This part will be modified in future to include pictures
	// as part of notifications.
	if (val == -1){
        textr = string;
	image_show = true;
	}

    },
    changeColor: function() {
	colorChange();
    }
});


function _showPopup() {

   //setImage(sicon);
    let monitor = Main.layoutManager.primaryMonitor;
    //let height_ =  monitor.height;
    icon = new St.Icon({style_class: 'icon'});
    //textr = queryText.text;
    
    var replyText = textr.split("\n");
    
    let textlength = replyText.length -1;
    let size = 0.75;
    if(textlength > 5 && textlength <= 10)
    {
	size = 0.65;
    }
    else if(textlength >10 && textlength <= 15)
    {
	size = 0.45;
    }
    else if(textlength >15)
	size = 0.05;
   //replyText.slice(0,replyText.length).join("  \n  ")
    opaque =  new St.Label({ style_class:'opaque',
			     width:monitor.width ,
			     height:monitor.height});
    Main.uiGroup.add_actor(opaque);
	
    replyPopup = new St.Label({ style_class: "label",
				text: replyText.slice(0,replyText.length).join("  \n  "),
				width: monitor.width-250 , height: monitor.height });
    replyPopup.set_position(125,monitor.height);
    //icon.set_position(monitor.width-250,monitor.height-450);//
    Main.uiGroup.add_actor(replyPopup);
    Tweener.addTween(replyPopup,{y: monitor.height*size+37, time: 1,transition: "easeInBack"});
    
icon.set_position(monitor.width,monitor.height);
Main.uiGroup.add_actor(icon);
Tweener.addTween(icon,{y: monitor.height-100,x: monitor.width-125,time:1,transition: "easeInBack"});
}
function init() {
    queryText = new St.Label({ text:"0:0",
			       style_class:'panel-text'}); //"0:0"
    bearDbusService = new queryInPanel();
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });

    micon = new St.Icon({gicon:gicon});
    button.set_child(micon);
    button.connect('button-press-event',callBear);
   
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button,0);
    Main.panel._rightBox.insert_child_at_index(queryText, 0);    
    corner[0] = {};    
    corner[0].ui = new St.Bin( {
	style_class: 'corner',
	reactive: true,
	can_focus: true,
	x_fill: true,
	y_fill: false,
	track_hover: true
    } );
    
    Main.uiGroup.add_actor( corner[0].ui );
    let monitor = Main.layoutManager.primaryMonitor;
    corner[0].ui.opacity = 0;
    corner[0].ui.set_position(monitor.width - corner[0].ui.width + 10, - 10);
    corner[0].ui.connect( 'enter-event', function () { toggleOverview( corner[0] ); });
    corner[0].ui.connect( 'leave-event', function () { _hidePopup();
						       Main.uiGroup.remove_actor(opaque); });
}

function disable() {   
    Main.uiGroup.remove_actor( corner[0].ui );
    Main.panel._rightBox.remove_child(queryText);
    Main.panel._rightBox.remove_child(button);
}
