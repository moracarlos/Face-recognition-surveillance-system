Configurar ip estatica en la Raspberry Pi:
sudo nano /etc/dhcpcd.conf
#Al final del archivo

interface eth0

static ip_address=192.168.0.10/24
static routers=192.168.0.1
static domain_name_servers=192.168.0.1

#End

reboot

Para instalar dependencias:

opencv
sudo apt-get install build-essential
sudo apt-get install cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev
git clone https://github.com/Itseez/opencv.git
cd opencv
git checkout 2.4
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=Release -D CMAKE_INSTALL_PREFIX=/usr/local ..
make -j7
sudo make install

crossbar
sudo apt-get install python-pip
pip install crossbar

nodejs
DEBUG=admin:* npm start //Para correr el administrador con la plantilla generada por express