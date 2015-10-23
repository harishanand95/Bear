#!/usr/bin/python
# DONT BE ROOT 
import subprocess
import platform
try:
    import pip
except:
    print "pip package not found installing pip..."
    system = platform.linux_distribution()
    if system[0] == 'Fedora':
        subprocess.call(["sudo", "yum","install","python-pip"])
    else:
        subprocess.call(["sudo", "apt-get","install","python-pip"])
    import pip
    pass


def install(package):
    pip.main(['install', package])


if __name__ == '__main__':
    system = platform.linux_distribution()
    if system[0] == 'Fedora':
        subprocess.call(["sudo", "yum","install","xclip"])
        subprocess.call(["sudo", "yum","install","xdotool"])
        subprocess.call(["sudo", "yum","install","scipy"])
    else :
        subprocess.call(["sudo", "apt-get","install","xclip"])
        subprocess.call(["sudo", "apt-get","install","xdotool","scipy"])
    
    install('wikipedia')
    
    home = subprocess.check_output("echo $HOME", shell=True)
    home = home[:-1]
    cmd = "cp -r ProjectBear@email.com/ " + str(home) + "/.local/share/gnome-shell/extensions/" 
    
    subprocess.call(["sudo", "chmod","+x","Bear"])
    subprocess.call(["sudo", "chmod","+x","api_ai"])
    subprocess.call(["sudo", "chmod","+x","gstt"])
    subprocess.call(["sudo", "cp","gstt","/usr/local/bin/"])
    subprocess.call(cmd.split())
    
    permission_cmd = "sudo chmod 757 -R " + str(home) + "/.local/share/gnome-shell/extensions/ProjectBear@email.com/"
    subprocess.call(permission_cmd.split())
    subprocess.call(["sudo", "cp","api_ai","/usr/local/bin/"])
    subprocess.call(["sudo", "cp","Bear","/usr/local/bin/"])
    
