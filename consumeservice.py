# consumeservice.py
# consumes a method in a service on the dbus

import dbus
import sys
bus = dbus.SessionBus()
helloservice = bus.get_object('org.gnome.Shell', '/com/bear/queryInPanel')
hello = helloservice.get_dbus_method('setText', 'com.bear.queryInPanel')
print hello(str(" ".join(sys.argv[1:])))

