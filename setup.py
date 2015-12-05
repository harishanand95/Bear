#!/usr/bin/python
# DONT BE ROOT 
import subprocess
import platform

def nodejs_install():
    system = platform.linux_distribution()
    if system[0] == 'Fedora':
        #subprocess.call("curl --silent --location https://rpm.nodesource.com/setup | bash -",shell=True)
        subprocess.call("sudo yum -y install nodejs gcc-c++ make ",shell=True)
    else:
        subprocess.call("curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -",shell=True)
        subprocess.call("sudo apt-get install -y nodejs",shell=True)
        subprocess.call("sudo apt-get install -y build-essential",shell=True)


if __name__ == '__main__':
    system = platform.linux_distribution()
    if system[0] == 'Fedora':
        subprocess.call(["sudo", "yum","install","xclip","ffmpeg"])
        subprocess.call(["sudo", "yum","install","xdotool"])
        
    else :
        subprocess.call(["sudo", "apt-get","install","xclip","ffmpeg"])
        subprocess.call(["sudo", "apt-get","install","xdotool"])
    
    
    nodejs_install()
    
    home = subprocess.check_output("echo $HOME", shell=True)
    home = home[:-1]
    cmd = "cp -r ProjectBear@email.com/ " + str(home) + "/.local/share/gnome-shell/extensions/" 
    subprocess.call(["sudo", "chmod","+x","Bear"])
    subprocess.call(cmd.split())    
    permission_cmd = "sudo chmod 757 -R " + str(home) + "/.local/share/gnome-shell/extensions/ProjectBear@email.com/"
    subprocess.call(permission_cmd.split())    
    subprocess.call(["sudo", "cp","Bear","/usr/local/bin/"])
    cmd = "cp -r .Bear/ " + str(home) 
    subprocess.call(cmd.split()) 
