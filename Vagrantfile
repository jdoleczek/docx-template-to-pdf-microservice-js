# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

NAME = "docx-template-to-pdf"
IP = "192.168.0.201"


$once = <<-SCRIPT
sudo ln -sf /usr/share/zoneinfo/Poland /etc/localtime
sudo apt update
wget -qO- https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm i npm@latest -g
export DEBIAN_FRONTEND=noninteractive && sudo -E apt-get install -q -y --force-yes libreoffice zip unzip
cd /vagrant && npm i
SCRIPT

$always = <<-SCRIPT
sudo HOME=/tmp node /vagrant/server.js &
SCRIPT


Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "bento/debian-8"
    config.vm.hostname = NAME

    config.vm.provider "virtualbox" do |vb|
        vb.name = NAME
        vb.memory = "256"
        vb.customize ["modifyvm", :id, "--vram", "6"]
    end

    config.vm.network "private_network", ip: IP
    config.ssh.forward_agent = true
    config.vm.synced_folder ".", "/vagrant", type: "virtualbox"
    config.vm.provision "shell", inline: $once, privileged: true, run: 'once'
    config.vm.provision "shell", inline: $always, privileged: true, run: 'always'
end
